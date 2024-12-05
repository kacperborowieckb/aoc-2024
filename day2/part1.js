import { readContent } from '../utils/readContent';

const content = await readContent();

const games = content.split('\n').map((row) => row.split(' '));

function checkDecreasing(firstVal, secondVal) {
  return firstVal - secondVal > 0;
}

function checkStep(firstVal, secondVal) {
  const step = Math.abs(firstVal - secondVal);

  return step >= 1 && step <= 3;
}

function isSafe(game) {
  const decreasing = checkDecreasing(game[0], game[1]);

  return game.every((record, i) => {
    const [first, second] = [Number(record), Number(game[i + 1])];

    if (!second) return true;

    if (decreasing !== checkDecreasing(first, second)) return false;

    if (!checkStep(first, second)) return false;

    return true;
  });
}

function solve() {
  return games.reduce((validGames, game) => {
    const isValidGame = isSafe(game);

    return isValidGame ? validGames + 1 : validGames;
  }, 0);
}
console.log(solve());
