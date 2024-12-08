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

function swap(arr: string[], firstIndex: number, secondIndex: number) {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;

  return arr;
}

function solve() {
  const result = changes.reduce((acc, changePagesArr) => {
    const changePages = changePagesArr.split(',');
    let shouldConsider = false;

    changePages.forEach((currPage, currPageIndex) => {
      changePages.slice(0, currPageIndex).forEach((page, invalidRuleIndex) => {
        const isValidRule = !rules[currPage]?.includes(page);

        if (!isValidRule) {
          shouldConsider = true;
          swap(changePages, currPageIndex, invalidRuleIndex);
        }
      });
    });

    return shouldConsider ? acc + parseInt(getMiddleItem(changePages)) : acc;
  }, 0);

  return result;
}

console.log(solve());
