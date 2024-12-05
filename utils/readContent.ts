export async function readContent(): Promise<string> {
  const file = Bun.file('input.txt');

  return await file.text();
}
