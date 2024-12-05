import { readContent } from '../utils/readContent';

const content = await readContent();

function solve() {
  const operations = content.match(/mul\(\d{1,3},\d{1,3}\)/g);

  return operations.reduce((acc, operation) => {
    const [_, x, y] = operation.split(/\(|,|\)/);

    return acc + parseInt(x) * parseInt(y);
  }, 0);
}

console.log(solve());
