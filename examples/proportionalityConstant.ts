import { Equal, Expect } from '@type-challenges/utils';

import {
  divideWithK,
  multiplyWithK,
  Nominal,
  ProportionalityConstant,
} from '../src';

export type Pixel = Nominal<'Pixel', number>;
export type Seconds = Nominal<'Seconds', number>;
export type PixelPerSecond = ProportionalityConstant<Pixel, Seconds>;

const PIXEL_PER_SECOND: PixelPerSecond = 1 as PixelPerSecond;

const pixels = 100 as Pixel;
const seconds = 1 as Seconds;

const a = multiplyWithK(PIXEL_PER_SECOND, seconds);
type A = typeof a;

// @ts-expect-error - should not be able to divide with seconds
const _b = divideWithK(PIXEL_PER_SECOND, seconds);

const c = divideWithK(PIXEL_PER_SECOND, pixels);
type C = typeof c;

type _cases = [Expect<Equal<A, Pixel>>, Expect<Equal<C, Seconds>>];
