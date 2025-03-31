import { currencies } from "../constants";
export const getCurrencySymbol = (currencyCode: string): string | undefined => {
  const currencyString = currencies[currencyCode];
  if (currencyString) {
    const match = currencyString.match(/\(([^)]+)\)/);
    if (match) {
      return match[1];
    }
  }
  return undefined;
};