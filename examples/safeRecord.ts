import { Nominal } from "../src";

type SafeRecord<V, R extends string = ""> = Nominal<
  "safeRecordSymbol",
  Record<R, V>
>;

const newRecord = <Value extends any, Record extends string>(
  record: Record,
  value: Value,
): SafeRecord<
  Value,
  Record
> => ({ [record]: value } as SafeRecord<Value, Record>);

const add = <V, R extends string, R2 extends string>(
  record: SafeRecord<V, R>,
  key: R2,
  value: V,
): SafeRecord<V, R | R2> => {
  Object.assign(record, { [key]: value });

  return record as SafeRecord<V, R | R2>;
};

const safeRecord = newRecord("a", "b");

const x = safeRecord["random"]; // any

const lmao = add(safeRecord, "lmao", "nice");

lmao.a // string
lmao.lmao // string
lmao["random"] // any -  Untyped