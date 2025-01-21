import type { ZipCode } from '@/types/ZipCode'
import { isZipCode } from '@/utils/isZipCode'

export const createZipCode = (argv: string): ZipCode | null => {
  return isZipCode(argv) ? (argv as ZipCode) : null
}
