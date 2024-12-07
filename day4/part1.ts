import { readContent } from '../utils/readContent';

const content = await readContent();

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1],
] as const;

const searchWord = ['X', 'M', 'A', 'S'] as const;

function solve() {
  const rows = content.split('\n');

  return rows.reduce((acc, row, rowIndex) => {
    let wordCount = 0;

    row.split('').forEach((letter, letterIndex) => {
      if (letter !== 'X') return;

      dirs.forEach(([x, y]) => {
        const containsXMAS = searchWord.every((keyLetter, i) => {
          const currLetter = rows?.[rowIndex + i * x]?.[letterIndex + i * y];

          return currLetter === keyLetter;
        });

        if (containsXMAS) wordCount++;
      });
    });

    return acc + wordCount;
  }, 0);
}

console.log(solve());
