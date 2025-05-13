const formatter = new Intl.NumberFormat("ru-RU", {
  currency: "USD",
  style: "currency",
  maximumFractionDigits: 0,
});

export function formatUSD(number?: null | number) {
  if (number === undefined || number === null) {
    return number;
  }

  return formatter.format(number);
}
