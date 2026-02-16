'use client';

import { useState, useEffect, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface QuestionCardProps {
    questionNumber: number;
    question: string;
    goldenKeywords: string;
    description: string;
    codeContent: string | null;
    codeFileName: string | null;
}

export default function QuestionCard({
    questionNumber,
    question,
    goldenKeywords,
    description,
    codeContent,
    codeFileName,
}: QuestionCardProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const closeModal = useCallback(() => setModalOpen(false), []);

    useEffect(() => {
        if (!modalOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [modalOpen, closeModal]);

    useEffect(() => {
        const root = document.documentElement;
        setIsDark(root.classList.contains('dark'));

        const observer = new MutationObserver(() => {
            setIsDark(root.classList.contains('dark'));
        });
        observer.observe(root, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="group relative overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
                {/* Top row: badge + code icon */}
                <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        Q{questionNumber}
                    </span>

                    {codeContent && (
                        <button
                            onClick={() => setModalOpen(true)}
                            aria-label="View code"
                            className="flex items-center justify-center w-8 h-8 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Question */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 sm:mb-4">
                    {question}
                </h3>

                {/* Golden Keywords */}
                <div className="mb-3 sm:mb-4 p-3 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                        Golden Keywords
                    </p>
                    <p className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-200">
                        {goldenKeywords}
                    </p>
                </div>

                {/* Description */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                        Explanation
                    </p>
                    <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Code Modal */}
            {modalOpen && codeContent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal panel */}
                    <div
                        className="relative w-full max-w-2xl max-h-[80vh] flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-700">
                            <div className="flex items-center gap-3 min-w-0">
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                                    {codeFileName}
                                </span>
                            </div>
                            <button
                                onClick={closeModal}
                                aria-label="Close modal"
                                className="flex items-center justify-center w-8 h-8 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Code content */}
                        <div className="overflow-auto scrollbar-hide">
                            <SyntaxHighlighter
                                language="java"
                                style={isDark ? oneDark : oneLight}
                                showLineNumbers
                                customStyle={{ margin: 0, borderRadius: 0 }}
                            >
                                {codeContent}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
