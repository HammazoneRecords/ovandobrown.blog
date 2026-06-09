'use server';

// TTS handled client-side via browser Web Speech API.
export type TextToSpeechInput = string;
export type TextToSpeechOutput = { media: string };

export async function textToSpeech(_input: TextToSpeechInput): Promise<TextToSpeechOutput> {
  return { media: '' };
}
