/* eslint-disable @typescript-eslint/no-explicit-any */
import { Effect } from "effector";

export type TGetRequestConfig<D = unknown> = {
  data?: D;
  url: string;
  headers?: {
    [key: string]: string;
  };
  method?: "get" | "put" | "post" | "patch" | "delete";
  query?: string | Record<string, string | number | boolean | undefined>;
};

export type TFFRequest<R = unknown, P = unknown> = Effect<
  TGetRequestConfig<P>,
  R,
  Error
>;

export type TChildren = JSX.Element | JSX.Element[];

export type RequestError = {
  code?: string;
  status: number;
  message: string;
  errors: {
    [key: string]: string | string[];
  };
};

export type TPagination = {
  count: number;
  total: number;
  per_page: number;
  total_pages: number;
  current_page: number;
};

export type TError = {
  status?: number;
  data?: {
    status?: string;
    message?: string;
  };
};

export type TLocaleParams = {
  params: {
    locale: string;
  };
};

export type TSearchParams = { [key: string]: string | string[] | undefined };

export type TPageParams = {
  searchParams: TSearchParams;
  params: Record<string, string | number>;
};

export type TCurrencies = "KZT" | "USD" | "EUR" | "AED";
export type TLangOptions = "ru" | "kz";
export type TLangSelector = {
  label: string;
  value: TLangOptions;
}[];
