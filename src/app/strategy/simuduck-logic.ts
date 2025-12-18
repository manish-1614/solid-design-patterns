
// 1. Define the Strategy Interfaces
export interface FlyBehavior {
    fly(): string;
}

export interface QuackBehavior {
    quack(): string;
}

// 2. Implement Concrete Behaviors
export class FlyWithWings implements FlyBehavior {
    fly(): string {
        return "I'm flying!!";
    }
}

export class FlyNoWay implements FlyBehavior {
    fly(): string {
        return "I can't fly";
    }
}

export class Quack implements QuackBehavior {
    quack(): string {
        return "Quack";
    }
}

export class Squeak implements QuackBehavior {
    quack(): string {
        return "Squeak";
    }
}

export class MuteQuack implements QuackBehavior {
    quack(): string {
        return "<< Silence >>";
    }
}

// 3. Define the Abstract Client
export abstract class Duck {
    flyBehavior: FlyBehavior;
    quackBehavior: QuackBehavior;
    // For game simulation
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: string;

    constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior, type: string) {
        this.flyBehavior = flyBehavior;
        this.quackBehavior = quackBehavior;
        this.type = type;
        this.id = Math.random().toString(36).substr(2, 9);
        this.x = Math.random() * 80; // Start at random X (0-80%)
        this.y = Math.random() * 60; // Start at random Y (0-60%)
        // Initial velocity for smooth movement
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }

    abstract display(): string;

    performFly(): string {
        return this.flyBehavior.fly();
    }

    performQuack(): string {
        return this.quackBehavior.quack();
    }

    swim(): string {
        return "All ducks float, even decoys!";
    }

    // Dynamic behavior setting
    setFlyBehavior(fb: FlyBehavior) {
        this.flyBehavior = fb;
    }

    setQuackBehavior(qb: QuackBehavior) {
        this.quackBehavior = qb;
    }
}

// 4. Implement Concrete Clients
export class MallardDuck extends Duck {
    constructor() {
        super(new FlyWithWings(), new Quack(), 'Mallard');
    }

    display(): string {
        return "I'm a real Mallard Duck";
    }
}

export class RedheadDuck extends Duck {
    constructor() {
        super(new FlyWithWings(), new Quack(), 'Redhead');
    }

    display(): string {
        return "I'm a real Redhead Duck";
    }
}

export class RubberDuck extends Duck {
    constructor() {
        super(new FlyNoWay(), new Squeak(), 'Rubber');
    }

    display(): string {
        return "I'm a rubber duckie";
    }
}

export class DecoyDuck extends Duck {
    constructor() {
        super(new FlyNoWay(), new MuteQuack(), 'Decoy');
    }

    display(): string {
        return "I'm just a wooden decoy";
    }
}
