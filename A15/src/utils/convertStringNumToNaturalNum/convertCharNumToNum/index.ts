import { isFullWidthCharNum } from '@/utils/isFullWidthCharNum'
import { isHalfWidthCharNum } from '@/utils/isHalfWidthCharNum'

export const convertCharNumToNum = (value: string): number => {
  if (value.length !== 1) {
    throw Error('Value is not a single character')
  }
  if (!(isHalfWidthCharNum(value) || isFullWidthCharNum(value))) {
    throw new Error("value is not number('0'-'9' or '０'-'９')")
  }

  const base = isHalfWidthCharNum(value) ? '0'.charCodeAt(0) : '０'.charCodeAt(0)
  const valueUnicode = value.charCodeAt(0)
  return valueUnicode - base
}
