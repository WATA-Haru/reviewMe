import { describe, test, expect } from 'vitest'
import { useInputFirst } from './useInputFirst'
import { nextTick } from 'vue'

describe('textRefFirstWatcher', () => {
  test('入力値が全角・半角数字以外の場合、markInvalid が呼ばれて errorRefFirst.invalid が true になること', async () => {
    const minLength = 3
    const { errorRefFirst, textRefFirst, textRefFirstWatcher } = useInputFirst(minLength)
    textRefFirstWatcher()
    textRefFirst.value = '1a3'
    await nextTick()
    expect(errorRefFirst.value.invalid).toBe(true)
  })

  test('入力値が全角・半角数字のみの場合、unmarkInvalid が呼ばれて errorRefFirst.invalid が false になること', async () => {
    const minLength = 3
    const { errorRefFirst, textRefFirst, textRefFirstWatcher } = useInputFirst(minLength)
    textRefFirstWatcher()
    textRefFirst.value = '123'
    await nextTick()
    expect(errorRefFirst.value.invalid).toBe(false)
  })

  test('入力値がminLengthの場合、unmarkShort が呼ばれて errorRefFirst.tooShort が false になること', async () => {
    const minLength = 3
    const { errorRefFirst, textRefFirst, textRefFirstWatcher } = useInputFirst(minLength)
    textRefFirstWatcher()
    textRefFirst.value = '123'
    await nextTick()
    expect(errorRefFirst.value.tooShort).toBe(false)
  })
})
