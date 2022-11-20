// export type xPERy<X, Y> =

/**
 * ProportionalityConstant is a type that represents a constant that is used to convert from one type to another
 *
 * Y ∝ X -> Y = λX >  =kX
 *
 * This type is the type of the constant k in the above equation, it can used with the multiplyWithK and divideWithK functions to convert between the two types
 *
 * @example type PixelPerSecond = ProportionalityConstant<Pixel, Seconds>
 *
 * const pixels: Pixels = multiplyWithK(PIXEL_PER_SECOND, 1 as Seconds)
 *
 * const seconds: Seconds = divideWithK(PIXEL_PER_SECOND, 1 as Pixels)
 *
 */
export type ProportionalityConstant<
  Y extends number,
  X extends number,
> = number & {
  readonly __X: X;
  readonly __Y: Y;
};

type multiplyWithKReturn<K> = K extends ProportionalityConstant<
  infer Y,
  infer _X
>
  ? Y
  : never;

type multiplyWithKInferX<K> = K extends ProportionalityConstant<
  infer _Y,
  infer X
>
  ? X
  : never;

type divideWithKReturn<K> = K extends ProportionalityConstant<infer _Y, infer X>
  ? X
  : never;

type divideWithKInferY<K> = K extends ProportionalityConstant<infer Y, infer _X>
  ? Y
  : never;

/**
 * A function to get the converted typed after multiplying with proportionality constant
 *
 * @param k - ProportionalityConstant<Y,X> -> Y ∝ X -> Y = λX -> Y = kX
 * @param x - Value of type X
 * @returns y - Value of type Y
 */
export const multiplyWithK = <K extends number>(
  k: K,
  x: multiplyWithKInferX<K>,
): multiplyWithKReturn<K> => (k * x) as multiplyWithKReturn<K>;

/**
 * A function to get the converted typed after dividing with proportionality constant
 *
 * @param k - ProportionalityConstant<Y,X> -> Y ∝ X -> X = Y/k
 * @param y - Value of type Y
 * @returns x - Value of type X
 */
export const divideWithK = <K extends ProportionalityConstant<any, any>>(
  k: K,
  y: divideWithKInferY<K>,
): divideWithKReturn<K> => (y / k) as divideWithKReturn<K>;
