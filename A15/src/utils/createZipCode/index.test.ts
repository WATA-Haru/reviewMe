import { describe, test, expect } from 'vitest'
import { isZipCode } from '@/utils/isZipCode/index.ts'
import { createZipCode } from './index.ts'

describe('createZipCode', () => {
  test('引数がZipCodeのフォーマットに従っている場合(\"1234567\")、返り値がZipCode型になること', () => {
    const result = createZipCode('1234567')
    expect(result).toBe('1234567')
  })

  test('引数がZipCodeのフォーマットに従っていない場合(\"2\")、返り値がnullになること', () => {
    const result = createZipCode('2')
    expect(result).toBe(null)
  })
})
