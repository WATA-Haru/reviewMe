import { isFullWidthCharNum } from '@/utils/isFullWidthCharNum'
import { isHalfWidthCharNum } from '@/utils/isHalfWidthCharNum'

export const isStringNaturalNum = (value: string): boolean => {
  for (const char of value) {
    if (!(isFullWidthCharNum(char) || isHalfWidthCharNum(char))) {
      return false
    }
  }
  return true
}
