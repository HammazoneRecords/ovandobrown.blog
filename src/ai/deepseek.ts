'use server';

const BASE_URL = process.env.ARK_BASE_URL ?? 'http://ark.local:11434/v1';
const API_KEY = process.env.DEEPSEEK_API_KEY ?? 'sk-no-key';
const MODEL = process.env.DEEPSEEK_MODEL ?? 'deepseek-chat';

export async function chatComplete(
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DeepSeek API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}
