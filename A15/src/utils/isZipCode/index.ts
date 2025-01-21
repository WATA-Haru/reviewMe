export const isZipCode = (argv: unknown): boolean => {
  return typeof argv === 'string' ? /^\d{7}$/.test(argv) : false
}
