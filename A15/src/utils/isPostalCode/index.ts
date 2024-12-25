import type { PostalCode } from '@/types/index'

export const isPostalCode = (argv: string): argv is PostalCode => {
  return /^\d{3}-\d{4}$/.test(argv)
}
