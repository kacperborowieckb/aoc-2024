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

function solve() {
  const [x, y] = getGuardIndex(gameMap);

  if (!x || !y) return;

  let distinctPositions = 1;
  let currX = x;
  let currY = y;

  let isInMap =
    currX > 0 &&
    currX < gameMap[0].length &&
    currY > 0 &&
    currY < gameMap.length;

  while (isInMap) {
    const currSymbol = gameMap[currX][currY];

    const { dir, toSymbol } = guardInstructions[currSymbol as KeySymbol];

    gameMap[currX][currY] = 'X';

    const newX = currX + dir[0];
    const newY = currY + dir[1];

    if (!gameMap?.[newX]?.[newY]) {
      break;
    }

    if (gameMap[newX][newY] === '#') {
      gameMap[currX][currY] = toSymbol;
    } else {
      currX = newX;
      currY = newY;

      if (gameMap[currX][currY] !== 'X') {
        distinctPositions++;
      }

      gameMap[currX][currY] = currSymbol;
    }
  }

  return distinctPositions;
}

console.log(solve());
