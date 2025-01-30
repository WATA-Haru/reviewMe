import { isStringNaturalNum } from '@/utils/isStringNaturalNum'
import { convertCharNumToNum } from '@/utils/convertCharNumToNum'

export const convertStringNumToNaturalNum = (value: string): number => {
  if (!isStringNaturalNum(value)) {
    throw Error('Value is not String number(0-9 or ０-９)')
  }

  let num = 0
  for (const char of value) {
    num *= 10
    num += convertCharNumToNum(char)
  }
  return num
}
