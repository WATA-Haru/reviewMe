import { describe, test, expect } from 'vitest'
import { isPostalCode } from '@/utils/isPostalCode/index.ts'
import { createPostalCode } from './index.ts'

describe('createPostalCode', () => {
  test('引数がPostalCodeのフォーマットに従っている場合(\"111-0000\")、返り値がPostalCode型になること', () => {
    const a = createPostalCode('111-0000')
    expect(isPostalCode(a)).toBe(true)
  })

  test('引数がPostalCodeのフォーマットに従っていない場合(\"2\")、返り値がnullになること', () => {
    const a = createPostalCode('2')
    expect(a).toBe(null)
  })
})
