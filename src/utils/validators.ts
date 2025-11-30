export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

export function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && value > 0;
}
