# Nominal
Bringing [nominal types](https://en.wikipedia.org/wiki/Nominal_type_system) to Typescript.

## Installation

```
npm install nominal-types
yarn install nominal-types
pnpm install nominal-types
```

# Usage

## Basic
The most immediate benefit of nominal types is preventing confusion between two types. In regular Typescript 
you run into this problem:
```ts
type Minutes = number
type Seconds = number
const minutesToSeconds = (minutes: Minutes) => minutes * 60

const seconds: Seconds = 420
// uh-oh, we can use Minutes and Seconds interchangeably
minutesToSeconds(seconds)
```

Nominal types solve this problem
```ts
import { Nominal, nominal } from 'nominal-types';

type Minutes = Nominal<'Minutes', number>;
type Seconds = Nominal<'Seconds', number>;

const minutesToSeconds = (minutes: Minutes) => minutes * 60

// You can directly type cast or use nominal.make
const seconds = nominal.make<Seconds>(420)
const minutes = 1337 as Minutes

// doesn't work, yay type safety
minutesToSeconds(seconds)
// does work!
minutesToSeconds(minutes)
```

## Another example
You can use nominal types to give your code even better type-safety guarantees. 

This goes **beyond just type-safety**, it's a performance optimization: once you know the array is sorted, you never have to sort it again. This is enforcing that at a type level.


```typescript
type SortedArray<T> = Nominal<'sortedArray', Array<T>>

const sort = <T>(arr: Array<T>): SortedArray<T> => arr.sort()

const binarySearch = <T>(sorted: SortedArray<T>): T | undefined => {
    /* ... */
}

const regularArray = [1, 2, 3]
// won't work
binarySearch(regularArray)
// will work
binarySearch(sort(regularArray))
```

This is also known as [Refinement types](https://en.wikipedia.org/wiki/Refinement_type)



## Composing types

We can actually make this a bit crazier, we can compose nominal types

```ts

type SortedArray<T> = Nominal<'sortedArray', Array<T>>

const sort = <T>(arr: Array<T>): SortedArray<T> => arr.sort() as SortedArray<T>

const nonEmpty = <T>(arr:Array<T>):NonEmptyArray<T> => arr.filter(Boolean) as NonEmptyArray<T>

type NonEmptyArray<K, T extends Array<K>> = Nominal<'nonEmptyArray', T>;
type NonEmptySorted<T> = NonEmptyArray<T, SortedArray<T>>;

const binarySearch = <T>(sorted: NonEmptySorted<T>): T => {
  let foo = sorted[0]
  return foo
}

// won't work
binarySearch(regularArray)
// still won't work
binarySearch(sort(regularArray))

binarySearch(nonEmpty(sort(regularArray)))

```

## Examples

More examples in [examples folder](./examples), you can also see them typed on replit.

| Example     | Link                                                      |
|-------------|-----------------------------------------------------------|
| basic       |    https://replit.com/@CryogenicPlanet/Nominal#basic.ts   |
| sorting     |    https://replit.com/@CryogenicPlanet/Nominal#sort.ts    |
| composing   | https://replit.com/@CryogenicPlanet/Nominal#composing.ts  |
| safeRecords | https://replit.com/@CryogenicPlanet/Nominal#safeRecord.ts |

## Credits

You can read more about this https://zackoverflow.dev/writing/nominal-types-typescript

Inspiration from [Ghosts of Departed Proofs (Functional Pearl)](https://kataskeue.com/gdp.pdf)