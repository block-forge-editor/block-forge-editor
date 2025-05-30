import { FC, ReactNode } from "react";

import { Loader2 } from "lucide-react";

import {
  ButtonProps,
  DropdownMenuItem,
  Button as ShaButton,
} from "../../shadcn";

type TProps = {
  loading?: boolean;
  children: ReactNode;
} & ButtonProps;

export const Button: FC<TProps> = ({
  loading,
  disabled,
  children,
  ...props
}) => {
  return (
    <ShaButton disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="bf-mr-2 bf-h-4 bf-w-4 bf-animate-spin" />}
      {children}
    </ShaButton>
  );
};

export const TableActionButton: FC<TProps> = (props) => {
  return (
    <DropdownMenuItem className="bf-p-0">
      <Button
        {...props}
        variant="ghost"
        className="bf-px-5 bf-py-3 bf-h-full bf-w-full"
      />
    </DropdownMenuItem>
  );
};
