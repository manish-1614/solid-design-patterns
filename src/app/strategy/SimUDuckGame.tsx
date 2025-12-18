'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Duck,
    MallardDuck,
    RedheadDuck,
    RubberDuck,
    DecoyDuck
} from './simuduck-logic';

export default function SimUDuckGame() {
    const [ducks, setDucks] = useState<Duck[]>([]);
    const [score, setScore] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    // Game loop reference
    const requestRef = useRef<number | null>(null);
    const ducksRef = useRef<Duck[]>([]);

    const addLog = (msg: string) => {
        setLogs(prev => [msg, ...prev].slice(0, 5));
    };

    const spawnDuck = useCallback(() => {
        const rand = Math.random();
        let newDuck: Duck;

        if (rand < 0.4) newDuck = new MallardDuck();
        else if (rand < 0.7) newDuck = new RedheadDuck(); // 30% Redhead
        else if (rand < 0.9) newDuck = new RubberDuck(); // 20% Rubber
        else newDuck = new DecoyDuck(); // 10% Decoy

        // Randomize initial position slightly more
        newDuck.x = Math.random() * 80;
        newDuck.y = Math.random() * 60;

        ducksRef.current = [...ducksRef.current, newDuck];
        setDucks([...ducksRef.current]);
        addLog(`A wild ${newDuck.type} appeared!`);
    }, []);

    const updateGame = () => {
        ducksRef.current = ducksRef.current.map(duck => {
            const flightStatus = duck.performFly();
            const isFlying = flightStatus === "I'm flying!!";

            // Movement speed based on status
            const speedMultiplier = isFlying ? 1.0 : 0.3;

            // Update position
            duck.x += duck.vx * speedMultiplier;
            duck.y += duck.vy * speedMultiplier;

            // Add a tiny bit of random jitter to flying ducks to make it feel less linear
            if (isFlying) {
                duck.x += (Math.random() - 0.5) * 0.1;
                duck.y += (Math.random() - 0.5) * 0.1;
            }

            // Boundary logic: Bounce off the edges
            if (duck.x >= 100 || duck.x <= 0) {
                duck.vx *= -1; // Reverse horizontal direction
                duck.x = Math.max(0, Math.min(100, duck.x)); // Clamp
            }
            if (duck.y >= 100 || duck.y <= 0) {
                duck.vy *= -1; // Reverse vertical direction
                duck.y = Math.max(0, Math.min(100, duck.y)); // Clamp
            }

            return duck;
        });

        setDucks([...ducksRef.current]);
        requestRef.current = requestAnimationFrame(updateGame);
    };

    useEffect(() => {
        // Initial spawn
        spawnDuck();
        spawnDuck();
        spawnDuck();

        // Start loop
        requestRef.current = requestAnimationFrame(updateGame);

        // Spawn timer
        const interval = setInterval(() => {
            if (ducksRef.current.length < 10) {
                spawnDuck();
            }
        }, 3000);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            clearInterval(interval);
        };
    }, [spawnDuck]);

    const handleDuckClick = (duck: Duck) => {
        const flightMsg = duck.performFly();
        const quackMsg = duck.performQuack();

        addLog(`${duck.type}: ${quackMsg} | ${flightMsg}`);

        if (duck instanceof DecoyDuck) {
            setScore(s => s - 5);
            addLog("Ouch! You hit a decoy! -5 pts");
        } else if (duck instanceof RubberDuck) {
            setScore(s => s + 2); // Small points/penalty? Let's say small points
            addLog("Squeak! +2 pts");
        } else {
            setScore(s => s + 10);
            addLog("Got a real one! +10 pts");
        }

        // Remove duck
        ducksRef.current = ducksRef.current.filter(d => d.id !== duck.id);
        setDucks([...ducksRef.current]);
    };

    return (
        <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-xl bg-slate-50 min-h-[600px]">
            <div className="flex justify-between items-center text-xl font-bold p-4 bg-slate-400 rounded shadow">
                <div>Score: {score}</div>
                <div className="text-sm font-normal">Click ducks to verify behavior!</div>
            </div>

            <div className="relative grow bg-blue-100 rounded-lg overflow-hidden border-2 border-blue-200" style={{ height: '400px' }}>
                {ducks.map(duck => (
                    <div
                        key={duck.id}
                        onClick={() => handleDuckClick(duck)}
                        className="absolute cursor-pointer transition-transform hover:scale-110 select-none text-4xl"
                        style={{
                            left: `${duck.x}%`,
                            top: `${duck.y}%`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10
                        }}
                    >
                        {getDuckIcon(duck.type)}
                    </div>
                ))}
            </div>

            <div className="bg-gray-800 text-green-400 p-2 rounded h-32 overflow-y-auto font-mono text-sm">
                <div> System Ready...</div>
                {logs.map((log, i) => (
                    <div key={i}>&gt; {log}</div>
                ))}
            </div>
        </div>
    );
}

function getDuckIcon(type: string) {
    switch (type) {
        case 'Mallard': return '🦆';
        case 'Redhead': return '🪿'; // Using Goose for visual distinction or Red bird if available
        case 'Rubber': return '🐤';
        case 'Decoy': return '🪵';
        default: return '❓';
    }
}
