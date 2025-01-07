import type { PostalCode } from '@/types/index.ts'
import { isPostalCode } from '@/utils/isPostalCode/index.ts'

export const createPostalCode = (argv: string): PostalCode | null => {
  return isPostalCode(argv) ? (argv as PostalCode) : null
}
