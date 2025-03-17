import { convertStringNumToNaturalNum } from '@/utils/convertStringNumToNaturalNum/index.ts'
import { isStringNaturalNum } from '@/utils/isStringNaturalNum/index.ts'

/**
 * @param value string
 * @return string
 * @description - 全角の数字を半角の数字にして返す関数、String(number)で直接変換すると先頭の０が消えるため作成(ex. '012'が'12'になってしまう)
 */
export const makeFullWidthNumToHalfWidthNum = (value: string) => {
  let s = ''

  for (const c of value) {
    if (isStringNaturalNum(c)) {
      s += String(convertStringNumToNaturalNum(c))
    } else {
      s += c
    }
  }
  return s
}
