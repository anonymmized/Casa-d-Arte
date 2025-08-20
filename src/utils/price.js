export const RUB_PER_USD = 95;

export function formatPriceFromRub(rubAmount, lang) {
  const isEN = lang === "en";
  const currency = isEN ? "USD" : "RUB";
  const amount = isEN ? rubAmount / RUB_PER_USD : rubAmount;

  return new Intl.NumberFormat(isEN ? "en-US" : "ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: isEN ? 2 : 0,
  }).format(amount);
}