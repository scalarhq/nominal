import { Nominal, nominal } from '../src';

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