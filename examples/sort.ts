import { Nominal } from '../src';

type SortedArray<T> = Nominal<'sortedArray', T[]>;

const sort = <T>(arr: T[]): SortedArray<T> => arr.sort() as SortedArray<T>;

const binarySearch = <T>(
  sorted: SortedArray<T>,
  search: T,
): number | undefined => {
  if (sorted.length !== 0) {
    const midPoint = sorted.length / 2;
    if (sorted[midPoint] === search) {
      return midPoint;
    }

    if (search > sorted[midPoint]) {
      return binarySearch(sorted.slice(midPoint) as SortedArray<T>, search);
    } else {
      return binarySearch(sorted.slice(0, midPoint) as SortedArray<T>, search);
    }
  } else {
    return undefined;
  }
};

const regularArray = [1, 7, 2, 3, 6, 9, 10, 4, 5];
// won't work
binarySearch(regularArray, 2);
// will work
binarySearch(sort(regularArray), 2);
