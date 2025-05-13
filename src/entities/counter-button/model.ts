import { sample, createEvent, createStore } from "effector";

export const buttonClicked = createEvent();

export const $clicksCount = createStore(0);

sample({
  clock: buttonClicked,
  source: $clicksCount,
  filter: (count) => count < 100,
  fn: (count) => count + 1,
  target: $clicksCount,
});

export const $$counterModel = {
  buttonClicked,
  $clicksCount,
};
