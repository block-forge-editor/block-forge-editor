/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { attach, createEffect } from "effector";

import { httpClient } from "./httpclient";

import { $language } from "@/app/model";

import { shouldSendAsFormdata } from "@/shared/lib/helpers";
import { isObject } from "@/shared/lib/helpers/type-guards";
import { TGetRequestConfig } from "@/shared/types/common";

const baseRequest = async <D = any>({
  query,
  url,
  data,
  method,
  headers,
}: TGetRequestConfig) => {
  const defaultMethod = method ?? "get";
  const defaultQuery = query ?? "";
  const defaultHeaders = headers ?? {};

  try {
    switch (defaultMethod) {
      case "post":
        if (shouldSendAsFormdata(data) && isObject(data)) {
          let payload = { ...data };

          // TODO: temp?
          // this changes key of object with array value (e.g. key: value[]) to formdata specific object (e.g. key[]: value)
          Object.entries(payload).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              delete payload[key];
              payload = { ...payload, [key + "[]"]: value };
            }
          });

          return (await httpClient
            .url(url)
            .headers(defaultHeaders)
            .query(defaultQuery)
            .formData(payload)
            .post()) as D;
        } else {
          return (await httpClient
            .url(url)
            .headers(defaultHeaders)
            .query(defaultQuery)
            .post(data)) as D;
        }
      case "get":
        return (await httpClient
          .url(url)
          .headers(defaultHeaders)
          .query(defaultQuery)
          .get()) as D;
      case "put":
        return (await httpClient
          .url(url)
          .headers(defaultHeaders)
          .query(defaultQuery)
          .put(data)) as D;
      case "delete":
        return (await httpClient
          .url(url)
          .headers(defaultHeaders)
          .query(defaultQuery)
          .delete()) as D;
      case "patch":
        return (await httpClient
          .url(url)
          .headers(defaultHeaders)
          .query(defaultQuery)
          .patch(data)) as D;
      default:
        throw {
          message: "Неизвестный метод",
        };
    }
  } catch (error) {
    throw error;
  }
};

const baseEffectFx = createEffect<TGetRequestConfig, any>();

export const requestFx = attach({
  source: { language: $language },
  effect: baseEffectFx,
  mapParams: (config: TGetRequestConfig, { language }) => ({
    ...config,
    headers: {
      "Accept-Language": language === "kz" ? "kz" : "ru",
    },
  }),
});

baseEffectFx.use(baseRequest);
