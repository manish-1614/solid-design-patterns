import React from 'react';
import SimUDuckGame from './SimUDuckGame';

const StrategyPattern = () => {
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">SimUDuck - Strategy Pattern</h1>

            <section className="mb-8 prose lg:prose-xl">
                <p>
                    This is a TypeScript/React recreation of the famous SimUDuck app from
                    <em> Head First Design Patterns</em>.
                </p>
                <div className="bg-slate-500 p-4 rounded-lg border-l-4 border-yellow-500 mb-4 text-sm">
                    <strong>Strategy Pattern Breakdown:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Context</strong>: The <code>Duck</code> abstract class.</li>
                        <li><strong>Strategy Interfaces</strong>: <code>FlyBehavior</code> and <code>QuackBehavior</code>.</li>
                        <li><strong>Concrete Strategies</strong>:
                            <code>FlyWithWings</code>, <code>FlyNoWay</code>, <code>Quack</code>, <code>Squeak</code>, etc.
                        </li>
                    </ul>
                </div>
                <p className="text-gray-600 mb-4">
                    <strong>How to play:</strong> Click on the ducks! <br />
                    🦆 Real Ducks give +10 points.<br />
                    🐤 Rubber Ducks give +2 points.<br />
                    🪵 Decoys are traps! -5 points.
                </p>
            </section>

            <SimUDuckGame />
        </div>
    )
}

export default StrategyPattern;