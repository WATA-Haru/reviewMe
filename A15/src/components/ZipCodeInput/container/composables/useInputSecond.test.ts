import { describe, test, expect } from 'vitest'
import { useInputSecond } from './useInputSecond.ts'
import { nextTick } from 'vue'

describe('textRefSecondWatcher', () => {
  test('入力値が全角・半角数字以外の場合、markInvalid が呼ばれて errorRefSecond.invalid が true になること', async () => {
    const minLength = 4
    const { errorRefSecond, textRefSecond, textRefSecondWatcher } = useInputSecond(minLength)
    textRefSecondWatcher()
    textRefSecond.value = '1a3'
    await nextTick()
    expect(errorRefSecond.value.invalid).toBe(true)
  })

  test('入力値が全角・半角数字のみの場合、unmarkInvalid が呼ばれて errorRefSecond.invalid が false になること', async () => {
    const minLength = 4
    const { errorRefSecond, textRefSecond, textRefSecondWatcher } = useInputSecond(minLength)
    textRefSecondWatcher()
    textRefSecond.value = '123'
    await nextTick()
    expect(errorRefSecond.value.invalid).toBe(false)
  })

  test('入力値がminLengthの場合、unmarkShort が呼ばれて errorRefSecond.tooShort が false になること', async () => {
    const minLength = 4
    const { errorRefSecond, textRefSecond, textRefSecondWatcher } = useInputSecond(minLength)
    textRefSecondWatcher()
    textRefSecond.value = '123'
    await nextTick()
    expect(errorRefSecond.value.tooShort).toBe(false)
  })
})
