import { describe, test, expect } from 'vitest'
import { isPostalCode } from '@/utils/isPostalCode/index.ts'
import { createPostalCode } from './index.ts'

describe('createPostalCode', () => {
  test('createPostalCodeが\"111-0000\"を受け取る時にPostalCode型が返ること', () => {
    const a = createPostalCode('111-0000')
    expect(isPostalCode(a)).toBe(true)
  })

  test("createPostalCodeが'2'のときnullが返ること", () => {
    const a = createPostalCode('2')
    expect(a).toBe(null)
  })
})
