import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get('ob_session')?.value;
  return token === process.env.ADMIN_SESSION_TOKEN;
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: 'File type not allowed' }, { status: 400 });
  }

  const name = `${randomBytes(8).toString('hex')}.${ext}`;
  const bytes = await file.arrayBuffer();
  const uploadsDir = join(process.cwd(), 'public', 'uploads');

  const { mkdir } = await import('fs/promises');
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(join(uploadsDir, name), Buffer.from(bytes));

  return NextResponse.json({ url: `/uploads/${name}` });
}
