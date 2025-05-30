import { FC } from "react";

import { BaseInput } from "./base-input";
import { TProps } from "./types";

export const Input: FC<TProps> = ({ ...props }) => {
  return <BaseInput {...props} />;
};
