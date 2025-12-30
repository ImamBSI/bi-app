/**
 * Format number dengan Indonesian locale (titik untuk ribuan, koma untuk desimal)
 * Contoh: 1234567.89 → 1.234.567,89
 */
export function formatNumberID(value: number, decimals: number = 2): string {
  if (value === null || value === undefined || isNaN(value)) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format number tanpa desimal
 * Contoh: 1234567 → 1.234.567
 */
export function formatNumberIDNoDecimal(value: number): string {
  if (value === null || value === undefined || isNaN(value)) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
