// After Nominal
import { Nominal } from '../src';
import { Equal, Expect } from '@type-challenges/utils';

type Minutes = Nominal<'Minutes', number>;
type Seconds = Nominal<'Seconds', number>;

const minutesToSeconds = (minutes: Minutes): Seconds =>
  (minutes * 60) as Seconds;

// You can directly type cast or use nominal.make
const seconds = 420 as Seconds;
const minutes = 1337 as Minutes;

// @ts-expect-error - doesn't work, yay type safety
minutesToSeconds(seconds);

// does work!
minutesToSeconds(minutes);

// @ts-expect-error -  won't work, yay!
minutesToSeconds(minutesToSeconds(minutes));
