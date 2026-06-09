'use server';
// Firebase Storage removed. File uploads handled via Sanity assets.
export async function uploadFile(_file: File, _path: string): Promise<string> {
  throw new Error('uploadFile: not implemented — use Sanity asset upload instead');
}
