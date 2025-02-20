import { describe, test, expect } from 'vitest'
import { useInputSecond } from './useInputSecond.ts'
import { nextTick } from 'vue'

describe('handleInputSecond', () => {
  test('isComposingがfalse(入力確定)の場合、変換処理がされてtextRefSecondが更新されること', () => {
    const minLength = 4
    const { textRefSecond, handleInputSecond } = useInputSecond(minLength)
    const input = document.createElement('input')
    input.value = '１２３'
    const event = new InputEvent('input')
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: false })

    handleInputSecond(event)
    expect(textRefSecond.value).toBe('123')
  })
  test('isComposingがtrueで入力中の場合、変換処理がされず、textRefSecondが更新されずそのままなこと', () => {
    const minLength = 4
    const { textRefSecond, handleInputSecond } = useInputSecond(minLength)
    const input = document.createElement('input')
    input.value = '１２３'
    const event = new InputEvent('input')
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: true })

    handleInputSecond(event)
    expect(textRefSecond.value).toBe('')
  })
})

describe('handleCompositionEndSecond', () => {
  test('入力確定後に全角数字が半角数字に変換されること', () => {
    const minLength = 4
    const { textRefSecond, handleCompositionEndSecond } = useInputSecond(minLength)
    const input = document.createElement('input')
    input.value = '１a'
    const event = new CompositionEvent('input')
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: false })

    handleCompositionEndSecond(event)
    expect(textRefSecond.value).toBe('1a')
  })
})

describe('handleBlurSecond', () => {
  test('入力が minLength 未満の場合、blur で markShort が呼ばれて errorRefSecond.tooShort が true になること', () => {
    const minLength = 4
    const { errorRefSecond, handleBlurSecond } = useInputSecond(minLength)
    const input = document.createElement('input')
    input.value = '12'
    const event = new FocusEvent('blur')
    Object.defineProperty(event, 'target', { value: input })

    handleBlurSecond(event)
    expect(errorRefSecond.value.tooShort).toBe(true)
  })
})

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
