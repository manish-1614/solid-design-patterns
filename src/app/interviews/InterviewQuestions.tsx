import fs from 'fs';
import path from 'path';
import questionBank from '@/data/interviews/question-bank.json';
import InterviewQuestionsClient from './InterviewQuestionsClient';

interface Answer {
    goldenKeywords: string;
    description: string;
    codeUrl: string | null;
}

interface Question {
    questionNumber: number;
    question: string;
    answer: Answer;
}

const questions: Question[] = questionBank.questions;

function readCodeFile(codeUrl: string | null): { content: string | null; fileName: string | null } {
    if (!codeUrl) return { content: null, fileName: null };
    try {
        const filePath = path.join(process.cwd(), codeUrl);
        const content = fs.readFileSync(filePath, 'utf-8');
        const fileName = path.basename(codeUrl);
        return { content, fileName };
    } catch {
        return { content: null, fileName: null };
    }
}

export interface PreparedQuestion {
    questionNumber: number;
    question: string;
    goldenKeywords: string;
    description: string;
    codeContent: string | null;
    codeFileName: string | null;
}

export default function InterviewQuestions() {
    const prepared: PreparedQuestion[] = questions.map((q) => {
        const { content, fileName } = readCodeFile(q.answer.codeUrl);
        return {
            questionNumber: q.questionNumber,
            question: q.question,
            goldenKeywords: q.answer.goldenKeywords,
            description: q.answer.description,
            codeContent: content,
            codeFileName: fileName,
        };
    });

    return <InterviewQuestionsClient questions={prepared} />;
}
