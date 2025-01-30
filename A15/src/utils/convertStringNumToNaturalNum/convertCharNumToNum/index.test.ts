import { describe, test, expect } from 'vitest'
import { convertCharNumToNum } from './index.ts'

describe('convertCharNumToNum', () => {
  const fullWidthNumList = ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９']
  const halfWidthNumList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  interface TestData {
    fullWidthNum: string
    halfWidthNum: string
    num: number
  }
  const testData: TestData[] = fullWidthNumList.map((fullWidthNum, i) => ({
    fullWidthNum,
    halfWidthNum: halfWidthNumList[i],
    num: numList[i],
  }))

  test('数字以外(a)を入れた場合に例外を返すこと', () => {
    expect(() => convertCharNumToNum('a')).toThrowError("value is not number('0'-'9' or '０'-'９')")
  })
  test("複数の文字列('0123456789')を入れた場合例外を返すこと", () => {
    expect(() => convertCharNumToNum('0123456789')).toThrowError('Value is not a single character')
  })

  testData.forEach(({ fullWidthNum, halfWidthNum, num }) => {
    test(`半角の${halfWidthNum}を入力した際にnumber型の${num}を返すこと`, () => {
      expect(convertCharNumToNum(halfWidthNum)).toBe(num)
    })

    test(`全角の${fullWidthNum}を入力した際にnumber型の${num}返すこと`, () => {
      expect(convertCharNumToNum(fullWidthNum)).toBe(num)
    })
  })
})
