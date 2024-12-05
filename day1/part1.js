import { readContent } from '../utils/readContent';

const content = await readContent();

const rows = content.split('\n');

const left = [];
const right = [];

rows.forEach((row) => {
  const [firstEl, secondEl] = row.split(' ').filter(Boolean);

  left.push(Number(firstEl));
  right.push(Number(secondEl));
});

const sortedLeft = left.sort();
const sortedRight = right.sort();

const result = sortedLeft.reduce((acc, el, i) => {
  return acc + Math.abs(el - sortedRight[i]);
}, 0);

console.log(result);
