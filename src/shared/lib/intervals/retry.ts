import { sleep } from "./sleep";

type Options<T> = {
  delay?: number;
  interval?: number;
  maxAttempts?: number;
  action: () => T | Promise<T>;
};

export async function retry<T>({
  action,
  delay = 0,
  interval = 2000,
  maxAttempts = 12,
}: Options<T>): Promise<T> {
  let lastError: unknown;

  await sleep(delay);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (attempt !== 1) {
      await sleep(interval);
    }

    try {
      return await action();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}
