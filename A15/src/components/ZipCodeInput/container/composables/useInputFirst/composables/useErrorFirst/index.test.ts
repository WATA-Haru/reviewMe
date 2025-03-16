import { describe, test, expect } from 'vitest'
import { useErrorFirst } from './index.ts'

describe('useErrorFirst', () => {
  test('errorRefFirstのプロパティの初期値がfalseであること', () => {
    const { errorRefFirst } = useErrorFirst()
    expect(errorRefFirst.value.tooShort).toBe(false)
    expect(errorRefFirst.value.invalid).toBe(false)
  })
  test('markShortを実行することでerrorRefFirst.value.tooShortがtrueになること', () => {
    const { errorRefFirst, markShort } = useErrorFirst()
    markShort()
    expect(errorRefFirst.value.tooShort).toBe(true)
  })
  test('unmarkShortを実行することでerrorRefFirst.value.tooShortがfalseになること', () => {
    const { errorRefFirst, unmarkShort } = useErrorFirst()
    unmarkShort()
    expect(errorRefFirst.value.tooShort).toBe(false)
  })
  test('markInvalidを実行することでerrorRefFirst.value.invalidがtrueになること', () => {
    const { errorRefFirst, markInvalid } = useErrorFirst()
    markInvalid()
    expect(errorRefFirst.value.invalid).toBe(true)
  })
  test('unmarkInvalidを実行することでerrorRefFirst.value.invalidがfalseになること', () => {
    const { errorRefFirst, unmarkInvalid } = useErrorFirst()
    unmarkInvalid()
    expect(errorRefFirst.value.invalid).toBe(false)
  })
})
