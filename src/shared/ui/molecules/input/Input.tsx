import { FC } from "react";

import { BaseInput } from "./base-input";
import { MaskedInput } from "./masked-input";
import { ReadOnlyInput } from "./readonly-input";
import { TProps } from "./types";

export const Input: FC<TProps> = ({ ...props }) => {
  if (props.readonly) {
    return <ReadOnlyInput {...props} />;
  }

  if (props.mask) {
    return <MaskedInput mask={props.mask} {...props} />;
  }

  return <BaseInput {...props} />;
};
