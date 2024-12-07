import { readContent } from '../utils/readContent';

const content = await readContent();

const dirs = {
  left: [
    [-1, 1],
    [-1, -1],
  ],
  right: [
    [1, 1],
    [1, -1],
  ],
} as const;

// :/ I thought it can be only 'SSMM' or 'MMSS' :/
const correctAnswers = ['SSMM', 'MMSS', 'SMSM', 'MSMS'];

function getValueFromDirs(rows: string[], rowIndex: number, charIndex: number) {
  const left = dirs.left.map(([x, y]) => rows?.[rowIndex + x]?.[charIndex + y]);
  const right = dirs.right.map(
    ([x, y]) => rows?.[rowIndex + x]?.[charIndex + y]
  );

  return (left.toString() + right.toString()).replace(/,/g, '');
}

function solve() {
  const rows = content.split('\n');

  return rows.reduce((acc, row, rowIndex) => {
    let count = 0;

    row.split('').forEach((char, charIndex) => {
      if (char !== 'A') return;

      const value = getValueFromDirs(rows, rowIndex, charIndex);

      const isCorrectValue = correctAnswers.includes(value);

      if (isCorrectValue) count++;
    });

    return acc + count;
  }, 0);
}

console.log(solve());
