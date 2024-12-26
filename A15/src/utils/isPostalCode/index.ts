import type { PostalCode } from '@/types/index'

export const isPostalCode = (argv: unknown): argv is PostalCode => {
  return typeof argv === 'string' ? /^\d{3}-\d{4}$/.test(argv) : false
}
