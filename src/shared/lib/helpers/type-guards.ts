export const isFile = (v: unknown): v is File => v instanceof File;

export const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

export const isArray = (v: unknown): v is unknown[] => Array.isArray(v);

export const isArrayOfStrings = (v: unknown): v is string[] =>
  isArray(v) && v.every((item) => typeof item === "string");

export const isArrayOfNumbers = (v: unknown): v is number[] =>
  isArray(v) && v.every((item) => typeof item === "number");

export const isBooleanTrue = (v: unknown): v is true => Boolean(v);

export const isNumber = (v: unknown): v is number => typeof v === "number";

export const isString = (v: unknown): v is string => typeof v === "string";
