import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface NewQuestionBody {
    questionNumber: number;
    question: string;
    answer: {
        goldenKeywords: string;
        description: string;
        codeUrl: string | null;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body: NewQuestionBody = await request.json();

        if (!body.question || !body.answer?.goldenKeywords || !body.answer?.description) {
            return NextResponse.json(
                { error: 'Missing required fields: question, goldenKeywords, description' },
                { status: 400 },
            );
        }

        if (body.answer.codeUrl) {
            const codePath = path.join(process.cwd(), body.answer.codeUrl);
            if (!fs.existsSync(codePath)) {
                return NextResponse.json(
                    { error: `Code file not found: ${body.answer.codeUrl}` },
                    { status: 400 },
                );
            }
        }

        const jsonPath = path.join(process.cwd(), 'src', 'data', 'interviews', 'question-bank.json');
        const raw = fs.readFileSync(jsonPath, 'utf-8');
        const data = JSON.parse(raw) as { questions: NewQuestionBody[] };

        const newQuestion: NewQuestionBody = {
            questionNumber: body.questionNumber,
            question: body.question.trim(),
            answer: {
                goldenKeywords: body.answer.goldenKeywords.trim(),
                description: body.answer.description.trim(),
                codeUrl: body.answer.codeUrl || null,
            },
        };

        data.questions.push(newQuestion);
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');

        return NextResponse.json({ success: true, question: newQuestion }, { status: 201 });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
