const fs = require('fs');

const content = fs.readFileSync('input.txt').toString();

const rows = content.split('\n');

const left = [];
const hist = {};

rows.forEach((row) => {
  const [firstEl, secondEl] = row.split(' ').filter(Boolean);

  left.push(Number(firstEl));

  if (!hist.hasOwnProperty(secondEl)) {
    hist[secondEl] = 0;
  }

  hist[secondEl]++;
});

const result = left.reduce((acc, val) => {
  return acc + Number(val) * (hist[val] ?? 0);
}, 0);

console.log(result);
