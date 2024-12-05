import { readContent } from '../utils/readContent';

type OperationType = ['mul', string, string] | ["don't" | 'do', null, null];

const content = await readContent();

function solve() {
  const operations = content.match(
    /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\))/g
  );

  if (!operations) return;

  let shouldApply = true;

  return operations.reduce((acc, operation) => {
    const [operationType, x, y] = operation.split(/\(|,|\)/) as OperationType;

    if (operationType === 'do') shouldApply = true;
    if (operationType === "don't") shouldApply = false;

    const shouldAdd = shouldApply && operationType === 'mul';

    return shouldAdd ? acc + parseInt(x) * parseInt(y) : acc;
  }, 0);
}

console.log(solve());
