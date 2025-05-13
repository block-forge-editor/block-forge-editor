/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query, Mutation } from "@farfetched/core";
import { createFactory } from "@withease/factories";
import { sample, createEvent, createEffect } from "effector";
import { condition } from "patronum";

import { NetworkException } from "@/shared/api";
import { $user } from "@/shared/store/user";
import { NetworkExceptionType } from "@/shared/types/exceptions";
import { openFailureToast } from "@/shared/ui/atoms";

export type ErrorHandlers = {
  [Type in NetworkExceptionType]?: string;
};

type AnalyticsErrorPayload = {
  error: Error;
  requestName: string;
  params: Record<string, string>;
};

const sendErrorToAnalyticsFx = createEffect(
  (payload: AnalyticsErrorPayload) => {
    console.error("Error sent to analytics", payload);
  },
);

const DEFAULT_HANDLERS: Required<ErrorHandlers> = {
  Unknown: "Произошла неизвестная ошибка, свяжитесь с поддержкой",
  NotFound: "Данные не найдены на сервере, свяжитесь с поддержкой",
  Unauthorized: "Вы не авторизованы, пожалуйста, войдите в систему",
  TooManyRequests: "Вы делаете запросы слишком часто, повторите попытку позже",
};

export type ErrorsHandleAllParams = {
  handlers?: ErrorHandlers;
  query?: Query<any, any, any>;
  mutation?: Mutation<any, any, any>;
};

export const handleAll = createFactory((params: ErrorsHandleAllParams) => {
  const { query, mutation, handlers = {} } = params;
  const queryOrMutation = query || mutation;

  if (!queryOrMutation) {
    throw new TypeError("You should provide either Query or Mutation");
  }

  const finalHandlers = { ...DEFAULT_HANDLERS, ...handlers };

  const networkExceptionOccured = createEvent<NetworkException>();

  const gotRequestError = queryOrMutation.finished.failure.map<Error>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    ({ error }) => error,
  );

  condition({
    source: gotRequestError,
    then: networkExceptionOccured,
    if: (error) => error instanceof NetworkException,
    else: networkExceptionOccured.prepend((error: any) => {
      if (typeof error.message === "string") {
        return new NetworkException(error.message);
      }

      return new NetworkException("Unknown");
    }),
  });

  sample({
    clock: networkExceptionOccured,
    filter: (exception) => exception.type === "Unauthorized",
    fn: () => null,
    target: $user,
  });

  sample({
    clock: networkExceptionOccured,
    fn: (exception) => finalHandlers[exception.type] ?? exception.type,
    target: openFailureToast,
  });

  sample({
    source: queryOrMutation.finished.failure,
    filter: ({ error }) => {
      const isNetwork = error instanceof NetworkException;
      const isLimit = isNetwork && error.type === "TooManyRequests";
      return !isLimit;
    },
    fn: ({ error, params }) => ({
      error,
      params,
      requestName: queryOrMutation.__.meta.name,
    }),
    target: sendErrorToAnalyticsFx,
  });
});
