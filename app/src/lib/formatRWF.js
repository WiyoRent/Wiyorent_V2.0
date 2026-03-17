const formatter = new Intl.NumberFormat('rw-RW');

/** "RWF 50,000" — for displaying prices with the currency prefix */
export function formatRWF(amount) {
  return `RWF ${formatter.format(amount)}`;
}

/** "50,000" — for slider labels that already show "RWF" as a separate unit */
export function formatRWFNumber(amount) {
  return formatter.format(amount);
}
