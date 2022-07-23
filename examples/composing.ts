import { Nominal } from "../src";

type SortedArray<T> = Nominal<"sortedArray", Array<T>>;

const sort = <T>(arr: Array<T>): SortedArray<T> => arr.sort() as SortedArray<T>;

const nonEmpty = <K, T extends Array<K>>(arr: T): NonEmptyArray<K, T> => {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }
  return arr as NonEmptyArray<K, T>;
};

type NonEmptyArray<K, T extends Array<K>> = Nominal<"nonEmptyArray", T>;
type NonEmptySorted<T> = NonEmptyArray<T, SortedArray<T>>;

const binarySearch = <T>(sorted: NonEmptySorted<T>): T => {
  let foo = sorted[0];
  return foo;
};

const regularArray = [1, 2, 3];

// won't work
binarySearch(regularArray);
// still won't work
binarySearch(sort(regularArray));
// will work
binarySearch(nonEmpty(sort(regularArray)));
