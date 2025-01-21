import { describe, test, expect } from 'vitest'
import { isZipCode } from './index.ts'

describe('isZipCode 正常系', () => {
  test('郵便番号が7桁のstring(1234567)のときisZipCodeがtrueを返すこと', () => {
    expect(isZipCode('1234567')).toBe(true)
  })
})
describe('isZipCode 異常系', () => {
  test('引数がstringでない(ここではnull)のとき、falseを返すこと', () => {
    expect(isZipCode(null)).toBe(false)
  })
  test('郵便番号が7桁より大きいstring(12345678)のときisZipCodeがfalseを返すこと', () => {
    expect(isZipCode('12345678')).toBe(false)
  })
  test('郵便番号が6桁のstring(123456)のときisZipCodeがfalseを返すこと', () => {
    expect(isZipCode('123456')).toBe(false)
  })
  test('郵便番号がstringで7桁だが、数字以外の値がある(11a0000)とき、isZipCodeがfalseを返すこと', () => {
    expect(isZipCode('11a0000')).toBe(false)
  })
})
