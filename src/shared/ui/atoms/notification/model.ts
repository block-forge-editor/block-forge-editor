import toast, { ToastType } from "react-hot-toast";

import { sample, createEvent, createEffect } from "effector";

import { createNotificationComponent } from "./notification";

type Options = {
  type: ToastType;
  message: string;
};

const notifyFx = createEffect((options: Options) => {
  const { type, message } = options;
  const Component = createNotificationComponent(type, message);
  toast.custom(Component, { position: "top-center" });
});

export const success = createEvent<string>();
export const failure = createEvent<string>();
export const loading = createEvent<string>();

sample({
  clock: success,
  fn: (message) => ({ message, type: "success" as ToastType }),
  target: notifyFx,
});

sample({
  clock: failure,
  fn: (message) => ({ message, type: "error" as ToastType }),
  target: notifyFx,
});

sample({
  clock: loading,
  fn: (message) => ({ message, type: "loading" as ToastType }),
  target: notifyFx,
});
