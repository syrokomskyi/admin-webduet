// Usage:
// ```
// const s = JSON.stringify(data, convertNumberToHex);
// ```
export function convertNumberToHex(key: string, value: any) {
  return typeof value === "number" ? value.toString(16) : value;
}
