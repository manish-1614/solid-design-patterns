'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface AddQuestionPanelProps {
    open: boolean;
    onClose: () => void;
    nextQuestionNumber: number;
}

export default function AddQuestionPanel({ open, onClose, nextQuestionNumber }: AddQuestionPanelProps) {
    const router = useRouter();

    const [question, setQuestion] = useState('');
    const [goldenKeywords, setGoldenKeywords] = useState('');
    const [description, setDescription] = useState('');
    const [codeFileName, setCodeFileName] = useState('');

    const [validCodeFiles, setValidCodeFiles] = useState<string[]>([]);
    const [codeFileError, setCodeFileError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const panelRef = useRef<HTMLDivElement>(null);

    // Fetch valid code files when the panel opens
    useEffect(() => {
        if (!open) return;
        fetch('/api/interviews/code-files')
            .then((res) => res.json())
            .then((data: { files: string[] }) => setValidCodeFiles(data.files))
            .catch(() => setValidCodeFiles([]));
    }, [open]);

    // Close on Escape
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose],
    );

    useEffect(() => {
        if (!open) return;
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, handleKeyDown]);

    // Validate code file name on change
    useEffect(() => {
        if (!codeFileName.trim()) {
            setCodeFileError('');
            return;
        }
        if (validCodeFiles.length > 0 && !validCodeFiles.includes(codeFileName.trim())) {
            setCodeFileError(
                `File not found. Available: ${validCodeFiles.join(', ')}`,
            );
        } else {
            setCodeFileError('');
        }
    }, [codeFileName, validCodeFiles]);

    const resetForm = () => {
        setQuestion('');
        setGoldenKeywords('');
        setDescription('');
        setCodeFileName('');
        setCodeFileError('');
        setSubmitError('');
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!question.trim() || !goldenKeywords.trim() || !description.trim()) {
            setSubmitError('Please fill in all required fields.');
            return;
        }

        if (codeFileError) {
            setSubmitError('Please fix the code file name error before submitting.');
            return;
        }

        setSubmitting(true);
        setSubmitError('');

        const codeUrl = codeFileName.trim()
            ? `src/data/interviews/code/${codeFileName.trim()}`
            : null;

        try {
            const res = await fetch('/api/interviews/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    questionNumber: nextQuestionNumber,
                    question: question.trim(),
                    answer: {
                        goldenKeywords: goldenKeywords.trim(),
                        description: description.trim(),
                        codeUrl,
                    },
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to add question');
            }

            resetForm();
            onClose();
            router.refresh();
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const isFormValid =
        question.trim() && goldenKeywords.trim() && description.trim() && !codeFileError;

    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
                    onClick={handleClose}
                />
            )}

            {/* Side panel */}
            <div
                ref={panelRef}
                className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[480px] md:w-[540px] bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-700 shadow-2xl transform transition-transform duration-300 ease-in-out ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Panel header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-700">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                            Add New Question
                        </h3>
                        <button
                            onClick={handleClose}
                            aria-label="Close panel"
                            className="flex items-center justify-center w-8 h-8 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 scrollbar-hide">
                            {/* Question number (read-only) */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                    Question Number
                                </label>
                                <div className="px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm">
                                    Q{nextQuestionNumber} (auto-assigned)
                                </div>
                            </div>

                            {/* Question */}
                            <div>
                                <label htmlFor="add-question" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                    Question <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="add-question"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Enter your interview question..."
                                    rows={3}
                                    className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm resize-none"
                                />
                            </div>

                            {/* Golden Keywords */}
                            <div>
                                <label htmlFor="add-keywords" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                    Golden Keywords <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="add-keywords"
                                    type="text"
                                    value={goldenKeywords}
                                    onChange={(e) => setGoldenKeywords(e.target.value)}
                                    placeholder="Key phrases to remember..."
                                    className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="add-description" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="add-description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Detailed explanation of the answer..."
                                    rows={5}
                                    className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm resize-none"
                                />
                            </div>

                            {/* Code File Name */}
                            <div>
                                <label htmlFor="add-code-file" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                    Code File Name <span className="text-zinc-400 dark:text-zinc-500 normal-case font-normal">(optional)</span>
                                </label>
                                <input
                                    id="add-code-file"
                                    type="text"
                                    value={codeFileName}
                                    onChange={(e) => setCodeFileName(e.target.value)}
                                    placeholder="e.g. HashMapImpl.java"
                                    className={`w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm ${
                                        codeFileError
                                            ? 'border-red-400 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-400'
                                            : 'border-zinc-200 dark:border-zinc-700 focus:ring-blue-500 dark:focus:ring-blue-400'
                                    }`}
                                />
                                {codeFileError && (
                                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                                        {codeFileError}
                                    </p>
                                )}
                                {!codeFileError && codeFileName.trim() && validCodeFiles.includes(codeFileName.trim()) && (
                                    <p className="mt-1.5 text-xs text-green-600 dark:text-green-400">
                                        File found
                                    </p>
                                )}
                                <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                                    File must exist in <code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">src/data/interviews/code/</code>
                                </p>
                            </div>
                        </div>

                        {/* Footer with submit */}
                        <div className="px-5 py-4 border-t border-zinc-200 dark:border-zinc-700">
                            {submitError && (
                                <p className="mb-3 text-sm text-red-600 dark:text-red-400">
                                    {submitError}
                                </p>
                            )}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isFormValid || submitting}
                                    className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {submitting ? 'Adding...' : 'Add Question'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
