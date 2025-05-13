import { isFile } from "./type-guards";

import { TCurrencies } from "@/shared/types/common";

export const priceFormatter = new Intl.NumberFormat("ru-KZ", {
  style: "currency",
  currency: "KZT",
  maximumSignificantDigits: 10,
});

export const getPriceWithCurrency = (
  price: string | number,
  currency: TCurrencies,
): string => {
  const currencies: Record<TCurrencies, string> = {
    KZT: "₸",
    USD: "$",
    EUR: "€",
    AED: "AED",
  };

  const formattedPrice = Number(price).toLocaleString("ru-RU");

  return `${formattedPrice} ${currencies[currency] || ""}`;
};

export const phoneNumberFormatter = ({
  phone,
  withDash,
}: {
  phone: string;
  withDash?: boolean;
}) => {
  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    const intlCode = match[1] ? "+7 " : "";

    if (withDash) {
      return [
        intlCode,
        "",
        match[2],
        " ",
        match[3],
        "-",
        match[4],
        "-",
        match[5],
      ].join("");
    }

    return [
      intlCode,
      "(",
      match[2],
      ") ",
      match[3],
      " ",
      match[4],
      " ",
      match[5],
    ].join("");
  }

  return phone;
};

export const generateFormDataFromObject = (record: Record<string, unknown>) => {
  const formData = new FormData();

  Object.entries(record).forEach(([key, value]) => {
    if (value) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      formData.append(key, value);
    }
  });

  return formData;
};

export const shouldSendAsFormdata = (data: unknown): boolean =>
  Object.values(data ?? {}).some(
    (value) => isFile(value) || (Array.isArray(value) && value.some(isFile)),
  );

export const splitter = (str = "") => {
  return "https" + str.split("http")[1];
};

export const smoothScroll = (id: string) => {
  document.querySelector(id)?.scrollIntoView({
    behavior: "smooth",
  });
};
