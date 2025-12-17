import Link from 'next/link';
import React from 'react';

interface Pattern {
    name: string;
    category: 'Creational' | 'Structural' | 'Behavioral';
    description: string;
    link?: string;
    icon: string;
}

const patterns: Pattern[] = [
    // Creational Patterns
    {
        name: 'Singleton',
        category: 'Creational',
        description: 'Ensures a class has only one instance and provides a global point of access to it.',
        icon: '🔒'
    },
    {
        name: 'Factory Method',
        category: 'Creational',
        description: 'Defines an interface for creating objects, but lets subclasses decide which class to instantiate.',
        icon: '🏭'
    },
    {
        name: 'Abstract Factory',
        category: 'Creational',
        description: 'Provides an interface for creating families of related objects without specifying their concrete classes.',
        icon: '🏗️'
    },
    {
        name: 'Builder',
        category: 'Creational',
        description: 'Separates the construction of a complex object from its representation.',
        icon: '🔨'
    },
    {
        name: 'Prototype',
        category: 'Creational',
        description: 'Creates new objects by copying an existing object, known as the prototype.',
        icon: '📋'
    },

    // Structural Patterns
    {
        name: 'Adapter',
        category: 'Structural',
        description: 'Allows incompatible interfaces to work together by wrapping an object with an adapter.',
        icon: '🔌'
    },
    {
        name: 'Bridge',
        category: 'Structural',
        description: 'Separates an abstraction from its implementation so the two can vary independently.',
        icon: '🌉'
    },
    {
        name: 'Composite',
        category: 'Structural',
        description: 'Composes objects into tree structures to represent part-whole hierarchies.',
        icon: '🌳'
    },
    {
        name: 'Decorator',
        category: 'Structural',
        description: 'Adds new functionality to an object dynamically without altering its structure.',
        icon: '🎨'
    },
    {
        name: 'Facade',
        category: 'Structural',
        description: 'Provides a simplified interface to a complex subsystem.',
        icon: '🎭'
    },

    // Behavioral Patterns
    {
        name: 'Observer',
        category: 'Behavioral',
        description: 'Defines a one-to-many dependency so that when one object changes state, all dependents are notified.',
        icon: '👁️'
    },
    {
        name: 'Strategy',
        category: 'Behavioral',
        link: '/strategy',
        description: 'Defines a family of algorithms, encapsulates each one, and makes them interchangeable.',
        icon: '♟️'
    },
    {
        name: 'Command',
        category: 'Behavioral',
        description: 'Encapsulates a request as an object, allowing parameterization and queuing of requests.',
        icon: '⚡'
    },
    {
        name: 'Iterator',
        category: 'Behavioral',
        description: 'Provides a way to access elements of a collection sequentially without exposing its representation.',
        icon: '🔄'
    },
    {
        name: 'State',
        category: 'Behavioral',
        description: 'Allows an object to alter its behavior when its internal state changes.',
        icon: '🎯'
    }
];

const categoryColors = {
    Creational: 'from-blue-500 to-cyan-500',
    Structural: 'from-purple-500 to-pink-500',
    Behavioral: 'from-green-500 to-emerald-500'
};

const categoryBadgeColors = {
    Creational: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    Structural: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    Behavioral: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
};

export default function DesignPatterns() {
    const categories: Array<'Creational' | 'Structural' | 'Behavioral'> = ['Creational', 'Structural', 'Behavioral'];

    return (
        <div className="w-full max-w-full overflow-x-hidden">
            <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 sm:mb-3">
                    Design Patterns
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400">
                    Reusable solutions to common software design problems
                </p>
            </div>

            {categories.map((category) => (
                <div key={category} className="mb-8 sm:mb-10 md:mb-12 w-full">
                    <div className="mb-3 sm:mb-4 md:mb-6">
                        <h3 className={`text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r ${categoryColors[category]} bg-clip-text text-transparent inline-block`}>
                            {category} Patterns
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full">
                        {patterns
                            .filter((pattern) => pattern.category === category)
                            .map((pattern) => (
                                <div
                                    key={pattern.name}
                                    className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 md:p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer w-full max-w-full"
                                >
                                    {pattern.link ? (
                                        <Link href={pattern.link} className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3 w-full">
                                            <div className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">{pattern.icon}</div>
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-1 break-words overflow-wrap-anywhere">
                                                    {pattern.name}
                                                </h4>
                                                <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${categoryBadgeColors[category]}`}>
                                                    {category}
                                                </span>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3 w-full">
                                            <div className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">{pattern.icon}</div>
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-1 break-words overflow-wrap-anywhere">
                                                    {pattern.name}
                                                </h4>
                                                <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${categoryBadgeColors[category]}`}>
                                                    {category}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed break-words overflow-wrap-anywhere">
                                        {pattern.description}
                                    </p>

                                    {/* Hover effect gradient overlay */}
                                    < div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category]} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                                </div>
                            ))}
                    </div>
                </div>
            ))
            }
        </div >
    );
}
