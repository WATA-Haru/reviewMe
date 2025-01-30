import { describe, test, expect } from 'vitest'
import { isFullWidthCharNum } from './index.ts'

describe('isFullWidthCharNum', () => {
  const fullWidthNumList = ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９']
  const halfWidthNumList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  test("複数の文字列('０１２３４５６７８９')を入れたとき、falseを返すこと", () => {
    expect(isFullWidthCharNum('０１２３４５６７８９')).toBe(false)
  })
  fullWidthNumList.forEach((fullWidthNum) => {
    test(`全角の${fullWidthNum}を入力した際にtrueを返すこと`, () => {
      expect(isFullWidthCharNum(fullWidthNum)).toBe(true)
    })
  })
  halfWidthNumList.forEach((halfWidthNum) => {
    test(`半角の${halfWidthNum}を入力した際にfalseを返すこと`, () => {
      expect(isFullWidthCharNum(halfWidthNum)).toBe(false)
    })
  })
})
