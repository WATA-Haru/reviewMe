import { useErrorSecond } from './index.ts'
import { describe, test, expect } from 'vitest'

describe('useErrorSecond', () => {
  test('errorRefSecondのプロパティの初期値がfalseであること', () => {
    const { errorRefSecond } = useErrorSecond()
    expect(errorRefSecond.value.tooShort).toBe(false)
    expect(errorRefSecond.value.invalid).toBe(false)
  })
  test('markShortを実行することでerrorRefSecond.value.tooShortがtrueになること', () => {
    const { errorRefSecond, markShort } = useErrorSecond()
    markShort()
    expect(errorRefSecond.value.tooShort).toBe(true)
  })
  test('unmarkShortを実行することでerrorRefSecond.value.tooShortがfalseになること', () => {
    const { errorRefSecond, unmarkShort } = useErrorSecond()
    unmarkShort()
    expect(errorRefSecond.value.tooShort).toBe(false)
  })
  test('markInvalidを実行することでerrorRefSecond.value.invalidがtrueになること', () => {
    const { errorRefSecond, markInvalid } = useErrorSecond()
    markInvalid()
    expect(errorRefSecond.value.invalid).toBe(true)
  })
  test('unmarkInvalidを実行することでerrorRefSecond.value.invalidがfalseになること', () => {
    const { errorRefSecond, unmarkInvalid } = useErrorSecond()
    unmarkInvalid()
    expect(errorRefSecond.value.invalid).toBe(false)
  })
})
