const formatter = new Intl.NumberFormat("ru-RU", {
  currency: "KZT",
  style: "currency",
  maximumFractionDigits: 0,
});

export function formatKZT(number?: null | number) {
  if (number === undefined || number === null) {
    return number;
  }

  return formatter.format(number);
}
