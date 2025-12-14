import React from 'react';

interface Principle {
    letter: string;
    name: string;
    description: string;
    color: string;
}

const principles: Principle[] = [
    {
        letter: 'S',
        name: 'Single Responsibility Principle',
        description: 'A class should have only one reason to change, meaning it should have only one job or responsibility.',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        letter: 'O',
        name: 'Open/Closed Principle',
        description: 'Software entities should be open for extension but closed for modification.',
        color: 'from-purple-500 to-pink-500'
    },
    {
        letter: 'L',
        name: 'Liskov Substitution Principle',
        description: 'Objects of a superclass should be replaceable with objects of a subclass without breaking the application.',
        color: 'from-green-500 to-emerald-500'
    },
    {
        letter: 'I',
        name: 'Interface Segregation Principle',
        description: 'No client should be forced to depend on methods it does not use. Split large interfaces into smaller ones.',
        color: 'from-orange-500 to-red-500'
    },
    {
        letter: 'D',
        name: 'Dependency Inversion Principle',
        description: 'High-level modules should not depend on low-level modules. Both should depend on abstractions.',
        color: 'from-indigo-500 to-violet-500'
    }
];

export default function SolidPrinciples() {
    return (
        <div className="w-full max-w-full overflow-x-hidden">
            <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 sm:mb-3">
                    SOLID Principles
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400">
                    Five fundamental principles of object-oriented programming and design
                </p>
            </div>

            <div className="grid gap-3 sm:gap-4 md:gap-6 w-full">
                {principles.map((principle) => (
                    <div
                        key={principle.letter}
                        className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 md:p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer w-full max-w-full"
                    >
                        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 w-full">
                            <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${principle.color} flex items-center justify-center shadow-lg`}>
                                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                    {principle.letter}
                                </span>
                            </div>

                            <div className="flex-1 min-w-0 overflow-hidden">
                                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-600 dark:group-hover:from-zinc-50 dark:group-hover:to-zinc-400 transition-all break-words overflow-wrap-anywhere">
                                    {principle.name}
                                </h3>
                                <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed break-words overflow-wrap-anywhere">
                                    {principle.description}
                                </p>
                            </div>
                        </div>
                        {/* Hover effect gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${principle.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
