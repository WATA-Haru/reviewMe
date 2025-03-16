import { useInputSecond } from './index.ts'
import { describe, test, expect } from 'vitest'

describe('useInputSecond: input時のテスト', () => {
  test('isComposingがfalse(入力確定)で全角数字が半角数字に変換されること', () => {
    const minLengthSecond = 4
    const { textRefSecond, handleInputSecond } = useInputSecond(minLengthSecond)

    const event = new InputEvent('input')
    const input = document.createElement('input')
    input.value = '１２3b'
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: false })

    handleInputSecond(event)
    expect(textRefSecond.value).toBe('123b')
  })

  test('isComposingがtrue(入力中)で文字列の変換が行われずrefが更新されないこと', () => {
    const minLengthSecond = 4
    const { textRefSecond, handleInputSecond } = useInputSecond(minLengthSecond)

    const event = new InputEvent('input')
    const input = document.createElement('input')
    input.value = '１２３a'
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: true })

    handleInputSecond(event)
    expect(textRefSecond.value).toBe('')
  })
})

describe('useInputSecond: compositionend時のテスト', () => {
  test('compositionendで全角数字が半角数字に変換されること', () => {
    const minLengthSecond = 4
    const { textRefSecond, handleCompositionEndSecond } = useInputSecond(minLengthSecond)

    const event = new CompositionEvent('compositionend')
    const input = document.createElement('input')
    input.value = '１２a'
    Object.defineProperty(event, 'target', { value: input })

    handleCompositionEndSecond(event)
    expect(textRefSecond.value).toBe('12a')
  })
})

describe('useInputSecond: blur時のテスト', () => {
  test('blurで文字数が少ない場合に、最小文字列のエラーの値がtrueになること', () => {
    const minLengthSecond = 4
    const { errorRefSecond, handleBlurSecond } = useInputSecond(minLengthSecond)

    const event = new FocusEvent('blur')
    const input = document.createElement('input')
    input.value = '１２'
    Object.defineProperty(event, 'target', { value: input })

    handleBlurSecond(event)
    expect(errorRefSecond.value.tooShort).toBe(true)
  })

  test('blurで文字数がminlengthを満たす場合には、最小文字列のエラーの値がfalseのままである', () => {
    const minLengthSecond = 4
    const { errorRefSecond, handleBlurSecond } = useInputSecond(minLengthSecond)

    const event = new FocusEvent('blur')
    const input = document.createElement('input')
    input.value = '１２aa'
    Object.defineProperty(event, 'target', { value: input })

    handleBlurSecond(event)
    expect(errorRefSecond.value.tooShort).toBe(false)
  })
})
