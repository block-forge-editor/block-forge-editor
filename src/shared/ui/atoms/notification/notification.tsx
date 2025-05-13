import toast, {
  Toast,
  ToastType,
  Renderable,
  ValueFunction,
} from "react-hot-toast";

import { X, Ban, Loader2, CircleCheck } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn";

const getToastProps = (type: ToastType) => {
  switch (type) {
    case "success":
      return {
        color: "green-500",
        icon: <CircleCheck className="w-4 h-4" />,
      };
    case "error":
      return {
        color: "red-500",
        icon: <Ban className="w-4 h-4" />,
      };
    default:
      return {
        color: "blue-500",
        icon: <Loader2 className="w-4 h-4 animate-spin" />,
      };
  }
};

export const createNotificationComponent = (
  _type: ToastType,
  message: string,
): ValueFunction<Renderable, Toast> =>
  function ({ id, visible }) {
    const { icon, color } = getToastProps(_type);

    return (
      <div
        role="button"
        tabIndex={-1}
        data-visible={visible}
        className={cn(
          "flex items-center justify-between py-2 px-3 text-white rounded-md gap-x-2 cursor-default",
          `border border-${color} text-${color} bg-white`,
        )}
      >
        {icon}
        <p className="text-sm ml-1">{message}</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => toast.dismiss(id)}
          className="w-6 h-6 hover:opacity-70 hover:bg-transparent hover:text-unset"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  };
