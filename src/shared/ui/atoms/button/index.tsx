import { FC } from "react";

import { Loader2 } from "lucide-react";

import {
  ButtonProps,
  DropdownMenuItem,
  Button as ShaButton,
} from "../../shadcn";

type TProps = {
  loading?: boolean;
} & ButtonProps;

export const Button: FC<TProps> = ({
  loading,
  disabled,
  children,
  ...props
}) => {
  return (
    <ShaButton disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </ShaButton>
  );
};

export const TableActionButton: FC<TProps> = (props) => {
  return (
    <DropdownMenuItem className="p-0">
      <Button {...props} variant="ghost" className="px-5 py-3 h-full w-full" />
    </DropdownMenuItem>
  );
};
