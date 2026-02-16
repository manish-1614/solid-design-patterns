'use client';

import { useState } from 'react';
import QuestionCard from './QuestionCard';
import AddQuestionPanel from './AddQuestionPanel';
import type { PreparedQuestion } from './InterviewQuestions';

interface InterviewQuestionsClientProps {
    questions: PreparedQuestion[];
}

export default function InterviewQuestionsClient({ questions }: InterviewQuestionsClientProps) {
    const [search, setSearch] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);

    const filtered = search.trim()
        ? questions.filter((q) =>
              q.question.toLowerCase().includes(search.trim().toLowerCase()),
          )
        : questions;

    return (
        <div className="w-full max-w-full overflow-x-hidden">
            {/* Header row */}
            <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                        Interview Questions
                    </h2>
                    <button
                        onClick={() => setPanelOpen(true)}
                        aria-label="Add new question"
                        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400">
                    Questions to help you prepare for interviews
                </p>
            </div>

            {/* Search bar */}
            <div className="mb-4 sm:mb-6">
                <div className="relative">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                        />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search questions..."
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer"
                            aria-label="Clear search"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                {search.trim() && (
                    <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                        {filtered.length} {filtered.length === 1 ? 'result' : 'results'} found
                    </p>
                )}
            </div>

            {/* Question grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full">
                {filtered.map((q) => (
                    <QuestionCard
                        key={q.questionNumber}
                        questionNumber={q.questionNumber}
                        question={q.question}
                        goldenKeywords={q.goldenKeywords}
                        description={q.description}
                        codeContent={q.codeContent}
                        codeFileName={q.codeFileName}
                    />
                ))}
            </div>

            {filtered.length === 0 && search.trim() && (
                <div className="text-center py-12">
                    <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg">
                        No questions match your search.
                    </p>
                </div>
            )}

            {/* Add question side panel */}
            <AddQuestionPanel
                open={panelOpen}
                onClose={() => setPanelOpen(false)}
                nextQuestionNumber={questions.length > 0 ? Math.max(...questions.map((q) => q.questionNumber)) + 1 : 1}
            />
        </div>
    );
}
