import { describe, test, expect } from 'vitest'
import { isHalfWidthCharNum } from './index.ts'

describe('isHalfWidthCharNum', () => {
  const fullWidthNumList = ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９']
  const halfWidthNumList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  test('数字以外(a)を入れた場合falseを返すこと', () => {
    expect(isHalfWidthCharNum('a')).toBe(false)
  })
  test("複数の文字列('0123456789')を入れた場合例外を返すこと", () => {
    expect(() => isHalfWidthCharNum('0123456789')).toThrowError()
  })
  halfWidthNumList.forEach((halfWidthNum) => {
    test(`半角の${halfWidthNum}を入力した際にtrueを返すこと`, () => {
      expect(isHalfWidthCharNum(halfWidthNum)).toBe(true)
    })
  })
  fullWidthNumList.forEach((fullWidthNum) => {
    test(`全角の${fullWidthNum}を入力した際にfalseを返すこと`, () => {
      expect(isHalfWidthCharNum(fullWidthNum)).toBe(false)
    })
  })
})
