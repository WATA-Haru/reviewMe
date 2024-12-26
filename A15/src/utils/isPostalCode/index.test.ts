import { describe, test, expect } from 'vitest'
import { isPostalCode } from './index.ts'

describe('isPostalCode test', () => {
  test('引数がstringでない(ここではnull)のとき、falseを返すこと', () => {
    expect(isPostalCode(null)).toBe(false)
  })
  test('郵便番号が000-000ときisPostalCodeがtrueを返すこと', () => {
    expect(isPostalCode('000-0000')).toBe(true)
  })
  test('郵便番号が999-999ときisPostalCodeがtrueを返すこと', () => {
    expect(isPostalCode('999-9999')).toBe(true)
  })
  test('郵便番号の上が3桁より大きい1111-000のときisPostalCodeがfalseを返すこと', () => {
    expect(isPostalCode('0000-0000')).toBe(false)
  })
  test('郵便番号の上が3桁未満11-000のときisPostalCodeがfalseを返すこと', () => {
    expect(isPostalCode('11-000')).toBe(false)
  })
  test('郵便番号の下が4桁より大きい111-00000のときisPostalCodeがfalseを返すこと', () => {
    expect(isPostalCode('111-00000')).toBe(false)
  })
  test('郵便番号の下が4桁未満111-000のときisPostalCodeがfalseを返すこと', () => {
    expect(isPostalCode('111-000')).toBe(false)
  })
  test('郵便番号に数字以外の値があるとき、isPostalCodeがfalseを返すこと', () => {
    expect(isPostalCode('11a-000')).toBe(false)
  })
})
