import { Nominal } from '../src'

type SortedArray<T> = Nominal<'sortedArray', Array<T>>

const sort = <T>(arr: Array<T>): SortedArray<T> => arr.sort() as SortedArray<T>

const binarySearch = <T>(sorted: SortedArray<T>): T | undefined => {
    /* ... */
}

const regularArray = [1, 2, 3]
// won't work
binarySearch(regularArray)
// will work
binarySearch(sort(regularArray))