import { describe, test, expect } from 'vitest'
import { convertStringNumToNaturalNum } from './index.ts'

describe('convertStringNumToNaturalNum', () => {
  test('数字以外(０１２a)を入れた場合に例外を返すこと', () => {
    expect(() => convertStringNumToNaturalNum('０１２a')).toThrowError()
  })
  test("複数の数字の文字列('0123456789')を入れた場合数値(123456789)に変換して返すこと", () => {
    expect(convertStringNumToNaturalNum('0123456789')).toBe(123456789)
  })
  test("単一の数字の文字('０')を入れた場合数値(0)に変換して返すこと", () => {
    expect(convertStringNumToNaturalNum('０')).toBe(0)
  })
})
