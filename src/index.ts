const M = Symbol();

export type Nominal<Name extends string, Type> = Type & {
  readonly [M]: [Name];
};

export * from './standardLib';
export * from './proportionalityConstant';
