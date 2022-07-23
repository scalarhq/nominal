// After Nominal
import { Nominal, nominal } from '../src';

type Minutes = Nominal<'Minutes', number>;
type Seconds = Nominal<'Seconds', number>;

const minutesToSeconds = (minutes: Minutes): Seconds => (minutes * 60) as Seconds

// You can directly type cast or use nominal.make
const seconds = nominal.make<Seconds>(420)
const minutes = 1337 as Minutes

// doesn't work, yay type safety
minutesToSeconds(seconds)
// does work!
minutesToSeconds(minutes)
// won't work, yay!
minutesToSeconds(minutesToSeconds(minutes))