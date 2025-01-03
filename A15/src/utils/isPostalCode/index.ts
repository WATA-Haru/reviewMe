export const isPostalCode = (argv: unknown): boolean => {
  return typeof argv === 'string' ? /^\d{3}-\d{4}$/.test(argv) : false
}
