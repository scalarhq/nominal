import { Nominal } from './index';

/***
 * This is a replacement for Object.keys which actually types the keys correctly
 *
 * In javascript Object.keys makes the keys strings, so this can only be used with the record is using string keys
 */
export const keys = <T extends string>(obj: Record<T, any>): T[] =>
  Object.keys(obj) as T[];

/**
 * Add values of the same type, a way to add values of some nominal of number can get the sum of the values typed correctly
 */
export const plus = <T extends number>(...arg: T[]): T => {
  const sum = arg.reduce((acc, cur) => acc + cur, 0);
  return sum as T;
};

/**
 * Subtract values of the same type, a way to subtract values of some nominal of number can get the difference of the values typed correctly
 */
export const minus = <T extends number>(a: T, b: T): T => {
  return (a - b) as T;
};

/**
 * Decorate number as negative value
 */
export type Negative<T extends number> = Nominal<'Negative', T>;
/**
 * Create a number decorated as negative, will throw an error if the number is not negative
 */
export const Negative = <T extends number>(value: T): Negative<T> => {
  if (value > 0) {
    throw new Error('Value must be negative');
  }
  return value as Negative<T>;
};

/**
 * Decorate number as zero
 */
export type Zero<T extends number> = Nominal<'Zero', T>;

/**
 * Decorate number as negative or zero
 */
export type NegativeOrZero<T extends number> = Negative<T> | Zero<T>;
/**
 * Decorate number as negative or zero
 *
 * Will throw an error if the number is positive
 */
export const NegativeOrZero = <T extends number>(
  value: T,
): NegativeOrZero<T> => {
  if (value > 0) {
    throw new Error('Value must be negative or zero');
  }
  return value as NegativeOrZero<T>;
};
