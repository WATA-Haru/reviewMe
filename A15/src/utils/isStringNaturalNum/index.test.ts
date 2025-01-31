import { describe, test, expect } from 'vitest'
import { isStringNaturalNum } from './index.ts'

describe('isStringNaturalNum', () => {
  test('数字以外の文字(０１２a)を入れた場合falseを返すこと', () => {
    expect(isStringNaturalNum('０１２a')).toBe(false)
  })
  test("複数の文字列('0123456789０１２３４５６７８９')を入れた場合trueを返すこと", () => {
    expect(isStringNaturalNum('0123456789')).toBe(true)
  })
  test('一つの数字(０)を入れた場合trueを返すこと', () => {
    expect(isStringNaturalNum('０')).toBe(true)
  })
})
