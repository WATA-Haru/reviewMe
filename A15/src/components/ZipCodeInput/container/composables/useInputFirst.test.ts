import { describe, test, expect } from 'vitest'
import { useInputFirst } from './useInputFirst'
import { nextTick } from 'vue'

describe('handleInputFirst', () => {
  test('isComposingがfalse(入力確定)で文字列の変換が行われること', () => {
    const minLength = 3
    const { textRefFirst, handleInputFirst } = useInputFirst(minLength)
    const input = document.createElement('input')
    input.value = '１２３'
    const event = new InputEvent('input')
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: false })

    handleInputFirst(event)
    expect(textRefFirst.value).toBe('123')
  })

  test('isComposingがfalse(入力確定)でminLengthの長さの全角・半角数字の条件を満たすとき、handleInputFirstを実行した後にgoFocusRefがtrueになること', () => {
    const minLength = 3
    const { goFocusRef, handleInputFirst } = useInputFirst(minLength)
    const input = document.createElement('input')
    input.value = '１２３'
    const event = new InputEvent('input')
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: false })

    handleInputFirst(event)
    expect(goFocusRef.value).toBe(true)
  })

  test('isComposingがtrueで入力中の際はtextRefが更新されず、goFocusRefもfalseであること\n ', () => {
    const minLength = 3
    const { goFocusRef, textRefFirst, handleInputFirst } = useInputFirst(minLength)
    const input = document.createElement('input')
    input.value = '１a３'
    const event = new InputEvent('input')
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: true })

    handleInputFirst(event)
    expect(goFocusRef.value).toBe(false)
    expect(textRefFirst.value).toBe('')
  })
})

describe('handleCompositionEndFirst', () => {
  test('入力確定後に全角数字が半角数字に変換されること', () => {
    const minLength = 3
    const { textRefFirst, handleCompositionEndFirst } = useInputFirst(minLength)
    const input = document.createElement('input')
    input.value = '１a'
    const event = new CompositionEvent('input')
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: false })

    handleCompositionEndFirst(event)
    expect(textRefFirst.value).toBe('1a')
  })
  test('入力確定後、文字列の長さがminLengthで全角・半角数字の場合goFocusRefがtrueになること', () => {
    const minLength = 3
    const { goFocusRef, handleCompositionEndFirst } = useInputFirst(minLength)
    const input = document.createElement('input')
    input.value = '１２3'
    const event = new CompositionEvent('input')
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: false })

    handleCompositionEndFirst(event)
    expect(goFocusRef.value).toBe(true)
  })
})

describe('handleBlurFirst', () => {
  test('入力が minLength 未満の場合、blur で markShort が呼ばれて errorRefFirst.tooShort が true になること', () => {
    const minLength = 3
    const { errorRefFirst, handleBlurFirst } = useInputFirst(minLength)
    const input = document.createElement('input')
    input.value = '12'
    const event = new FocusEvent('blur')
    Object.defineProperty(event, 'target', { value: input })

    handleBlurFirst(event)
    expect(errorRefFirst.value.tooShort).toBe(true)
  })
})

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
