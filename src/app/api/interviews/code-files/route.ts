import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const codeDir = path.join(process.cwd(), 'src', 'data', 'interviews', 'code');
        const files = fs.readdirSync(codeDir).filter((f) => !f.startsWith('.'));
        return NextResponse.json({ files });
    } catch {
        return NextResponse.json({ files: [] });
    }
}
