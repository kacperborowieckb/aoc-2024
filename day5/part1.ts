import { readContent } from '../utils/readContent';

const content = await readContent();

const rows = content.split('\n');

const separatorIndex = rows.indexOf('');

const rules = rows.slice(0, separatorIndex).reduce((acc, rule) => {
  const [num, before] = rule.split('|');

  return { ...acc, [num]: [...(acc[num] ?? []), before] };
}, {} as Record<string, string[]>);

const changes = rows.slice(separatorIndex + 1);

function getMiddleItem(arr: string[]) {
  return arr[Math.floor(arr.length / 2)];
}

function solve() {
  const result = changes.reduce((acc, changePagesArr) => {
    const changePages = changePagesArr.split(',');

    const isCorrect = changePages.every((currPage, currPageIndex) => {
      const isInCorrectPlace = changePages
        .slice(0, currPageIndex)
        .every((page) => {
          return !rules[currPage]?.includes(page);
        });
      //   console.log(changePages, currPage, isInCorrectPlace);

      return isInCorrectPlace;
    });

    return isCorrect ? acc + parseInt(getMiddleItem(changePages)) : acc;
  }, 0);

  return result;
}

console.log(solve());
