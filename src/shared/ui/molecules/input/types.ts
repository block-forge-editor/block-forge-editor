import { InputProps } from "../../shadcn";

export type TProps = {
  isError?: boolean;
  readonly?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  label?: string | number;

  maskChar?: null | string;
  alwaysShowMask?: boolean;
  mask?: string | Array<string | RegExp>;
} & InputProps;
