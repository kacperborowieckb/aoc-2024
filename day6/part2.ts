import { readContent } from '../utils/readContent';

const content = await readContent();

const gameMap: string[][] = content.split('\n').map((row) => row.split(''));

const guardInstructions = {
  '>': { toSymbol: 'v', dir: [0, 1] },
  '<': { toSymbol: '^', dir: [0, -1] },
  '^': { toSymbol: '>', dir: [-1, 0] },
  v: { toSymbol: '<', dir: [1, 0] },
};

type KeySymbol = keyof typeof guardInstructions;

function getGuardIndex(gameMap: string[][]) {
  let x, y;

  x = gameMap.findIndex((row) => {
    const index = row.findIndex((field) => {
      return Object.keys(guardInstructions).includes(field);
    });

    if (index !== -1) {
      y = index;

      return true;
    }

    return false;
  });

  return [x, y];
}

function checkPath(x?: number, y?: number) {
  const gameMapCopy = JSON.parse(JSON.stringify(gameMap));

  if (!x || !y) return;

  let currX = x;
  let currY = y;

  const visited = new Set();

  let isInMap =
    currX > 0 &&
    currX < gameMapCopy[0].length &&
    currY > 0 &&
    currY < gameMapCopy.length;

  while (isInMap) {
    const currSymbol = gameMapCopy[currX][currY];

    const { dir, toSymbol } = guardInstructions[currSymbol as KeySymbol];

    const newX = currX + dir[0];
    const newY = currY + dir[1];

    if (!gameMapCopy?.[newX]?.[newY]) {
      break;
    }

    if (gameMapCopy[newX][newY] === '#') {
      gameMapCopy[currX][currY] = toSymbol;
    } else {
      if (visited.has(`${newX},${newY},${currSymbol}`)) {
        return false;
      }
      gameMapCopy[currX][currY] = '.';

      currX = newX;
      currY = newY;

      visited.add(`${currX},${currY},${currSymbol}`);

      gameMapCopy[currX][currY] = currSymbol;
    }
  }

  return true;
}

function solve() {
  const [x, y] = getGuardIndex(gameMap);

  let possibleLoops = 0;

  gameMap.forEach((row, rowIndex) => {
    row.forEach((field, fieldIndex) => {
      if (field === '.') {
        gameMap[rowIndex][fieldIndex] = '#';

        const isValid = checkPath(x, y);

        !isValid && possibleLoops++;

        gameMap[rowIndex][fieldIndex] = '.';
      }
    });
  });

  return possibleLoops;
}

console.log(solve());
