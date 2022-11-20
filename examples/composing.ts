import { Nominal } from '../src';

type SortedArray<T> = Nominal<'sortedArray', T[]>;

const sort = <T>(arr: T[]): SortedArray<T> => arr.sort() as SortedArray<T>;

const nonEmpty = <K, T extends K[]>(arr: T): NonEmptyArray<K, T> => {
  if (arr.length === 0) {
    throw new Error('Array is empty');
  }
  return arr as NonEmptyArray<K, T>;
};

type NonEmptyArray<K, T extends K[]> = Nominal<'nonEmptyArray', T>;
type NonEmptySorted<T> = NonEmptyArray<T, SortedArray<T>>;

// Not implemented
const binarySearch = <T>(sorted: NonEmptySorted<T>): T => {
  let foo = sorted[0];
  // @ts-ignore
  return foo;
};

const regularArray = [1, 2, 3];

// @ts-expect-error - won't work
binarySearch(regularArray);
// @ts-expect-error - still won't work
binarySearch(sort(regularArray));

// will work
binarySearch(nonEmpty(sort(regularArray)));
