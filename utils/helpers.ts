export function currencyFormat(num: number | string) {
  if (!num) return "0.00";
  const numericValue = Number(num);
  if (isNaN(numericValue)) {
    return 0;
  } else {
    return numericValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}
