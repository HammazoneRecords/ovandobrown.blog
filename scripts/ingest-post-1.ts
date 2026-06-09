
import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from both files
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

// Load env vars manually since this script runs outside of Next.js context
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN; // Need a write token for this

if (!token) {
    console.error('Error: SANITY_API_WRITE_TOKEN is required in .env.local');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2023-05-03',
});

console.log('--- Config Check ---');
console.log('Project ID:', projectId);
console.log('Dataset:', dataset);
console.log('Token (first 4 chars):', token ? token.substring(0, 4) : 'MISSING');
console.log('--------------------');

// Simple parser to convert text to Portable Text blocks
function parseToPortableText(text: string) {
    const lines = text.split('\n');
    const blocks = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Header detection (simple heuristic)
        if (line.length < 50 && !line.endsWith('.') && !line.includes('  ')) {
            blocks.push({
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: line }],
            });
        } else if (line.startsWith('·') || line.startsWith('●')) {
            blocks.push({
                _type: 'block',
                style: 'normal',
                listItem: 'bullet',
                children: [{ _type: 'span', text: line.replace(/^[·●]\s*/, '') }],
            });
        } else {
            blocks.push({
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: line }],
            });
        }
    }
    return blocks;
}

async function ingestPost() {
    const rawText = fs.readFileSync(path.join(process.cwd(), 'docs', 'Post 1'), 'utf8');

    // Hardcoded metadata from valid analysis
    const title = "What Nebulae, GTA, and My Son Taught Me About Thought";
    const slug = "what-nebulae-gta-and-my-son-taught-me";
    const author = "Ovando Brown";
    const publishedAt = new Date("2025-12-10").toISOString();

    // Remove the first few lines of metadata from the raw text body before parsing
    const bodyText = rawText.split('\n').slice(10).join('\n');

    const document = {
        _type: 'post',
        title,
        slug: { _type: 'slug', current: slug },
        author,
        category: 'Philosophy', // Inferred
        publishedAt,
        readingTime: 10,
        listeningTime: 8,
        content: parseToPortableText(bodyText),
        excerpt: "You are not the voice in your head. The voice is just a stream of thoughts, a signal, a pattern, a suggestion."
    };

    try {
        console.log('Testing token permissions (Read check)...');
        await client.fetch('*[_type == "post"][0]');
        console.log('Read verification successful.');

        console.log('Creating post...');
        const res = await client.create(document);
        console.log(`Post created with ID: ${res._id}`);
    } catch (err) {
        console.error('Operation failed:', err);
    }
}

ingestPost();
