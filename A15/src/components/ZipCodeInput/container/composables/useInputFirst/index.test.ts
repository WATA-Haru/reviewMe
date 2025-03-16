import { useInputFirst } from './index.ts'
import { describe, test, expect } from 'vitest'

describe('useInputFirst: input時の正常系', () => {
  test('isComposingがfalse(入力確定)で全角数字が半角数字に変換されること', () => {
    const minLengthFirst = 3
    const { textRefFirst, handleInputFirst } = useInputFirst(minLengthFirst)

    const event = new InputEvent('input')
    const input = document.createElement('input')
    input.value = '１２a'
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: false })

    handleInputFirst(event)
    expect(textRefFirst.value).toBe('12a')
  })

  test('isComposingがfalse(入力確定)で全角・半角数字かつminLength以上の条件を満たす際、goFocusRefの値がtrueになること', () => {
    const minLengthFirst = 3
    const { goFocusRef, handleInputFirst } = useInputFirst(minLengthFirst)

    const event = new InputEvent('input')
    const input = document.createElement('input')
    input.value = '１２3'
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: false })

    handleInputFirst(event)
    expect(goFocusRef.value).toBe(true)
  })
})

describe('useInputFirst: input時の異常系', () => {
  test('isComposingがtrue(入力中)で文字列の変換が行われずrefが更新されないこと', () => {
    const minLengthFirst = 3
    const { textRefFirst, handleInputFirst } = useInputFirst(minLengthFirst)

    const event = new InputEvent('input')
    const input = document.createElement('input')
    input.value = '１２３'
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: true })

    handleInputFirst(event)
    expect(textRefFirst.value).toBe('')
  })

  test('isComposingがtrue(入力中)の場合は、条件を満たしていてもgoFocusRefの値がfalseになること', () => {
    const minLengthFirst = 3
    const { goFocusRef, handleInputFirst } = useInputFirst(minLengthFirst)

    const event = new InputEvent('input')
    const input = document.createElement('input')
    input.value = '１23'
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: true })

    handleInputFirst(event)
    expect(goFocusRef.value).toBe(false)
  })

  test('isComposingがfalse(入力確定)で全角・半角数字の条件を満たさないとき、goFocusRefの値がfalseになること', () => {
    const minLengthFirst = 3
    const { goFocusRef, handleInputFirst } = useInputFirst(minLengthFirst)

    const event = new InputEvent('input')
    const input = document.createElement('input')
    input.value = '１２a'
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: false })

    handleInputFirst(event)
    expect(goFocusRef.value).toBe(false)
  })

  test('isComposingがfalse(入力確定)で文字数がminLength以上の条件を満たさないとき、goFocusRefの値がfalseになること', () => {
    const minLengthFirst = 3
    const { goFocusRef, handleInputFirst } = useInputFirst(minLengthFirst)

    const event = new InputEvent('input')
    const input = document.createElement('input')
    input.value = '１2'
    Object.defineProperty(event, 'target', { value: input })
    Object.defineProperty(event, 'isComposing', { value: false })

    handleInputFirst(event)
    expect(goFocusRef.value).toBe(false)
  })
})

describe('useInputFirst: compositionend時の正常系', () => {
  test('compositionendで全角数字が半角数字に変換されること', () => {
    const minLengthFirst = 3
    const { textRefFirst, handleCompositionEndFirst } = useInputFirst(minLengthFirst)

    const event = new CompositionEvent('compositionend')
    const input = document.createElement('input')
    input.value = '１２a'
    Object.defineProperty(event, 'target', { value: input })

    handleCompositionEndFirst(event)
    expect(textRefFirst.value).toBe('12a')
  })

  test('compositionendで全角・半角数字かつminLength以上の条件を満たす際、goFocusRefの値がtrueになること', () => {
    const minLengthFirst = 3
    const { goFocusRef, handleCompositionEndFirst } = useInputFirst(minLengthFirst)

    const event = new CompositionEvent('compositionend')
    const input = document.createElement('input')
    input.value = '１２3'
    Object.defineProperty(event, 'target', { value: input })

    handleCompositionEndFirst(event)
    expect(goFocusRef.value).toBe(true)
  })
})

describe('useInputFirst: compositionend時の異常系', () => {
  test('compositionendで全角・半角数字の条件を満たさないとき、goFocusRefの値がfalseになること', () => {
    const minLengthFirst = 3
    const { goFocusRef, handleCompositionEndFirst } = useInputFirst(minLengthFirst)

    const event = new CompositionEvent('compositionend')
    const input = document.createElement('input')
    input.value = '１２a'
    Object.defineProperty(event, 'target', { value: input })

    handleCompositionEndFirst(event)
    expect(goFocusRef.value).toBe(false)
  })

  test('compositionendで文字数がminlength以上の条件を満たさないとき、goFocusRefの値がfalseになること', () => {
    const minLengthFirst = 3
    const { goFocusRef, handleCompositionEndFirst } = useInputFirst(minLengthFirst)

    const event = new CompositionEvent('compositionend')
    const input = document.createElement('input')
    input.value = '１2'
    Object.defineProperty(event, 'target', { value: input })

    handleCompositionEndFirst(event)
    expect(goFocusRef.value).toBe(false)
  })
})

describe('useInputFirst: blur時のテスト', () => {
  test('blurで文字数が少ない場合に、最小文字列のエラーの値がtrueになること', () => {
    const minLengthFirst = 3
    const { errorRefFirst, handleBlurFirst } = useInputFirst(minLengthFirst)

    const event = new FocusEvent('blur')
    const input = document.createElement('input')
    input.value = '１２'
    Object.defineProperty(event, 'target', { value: input })

    handleBlurFirst(event)
    expect(errorRefFirst.value.tooShort).toBe(true)
  })

  test('blurで文字数がminlengthを満たす場合には、最小文字列のエラーの値がfalseのままである', () => {
    const minLengthFirst = 3
    const { errorRefFirst, handleBlurFirst } = useInputFirst(minLengthFirst)

    const event = new FocusEvent('blur')
    const input = document.createElement('input')
    input.value = '１２a'
    Object.defineProperty(event, 'target', { value: input })

    handleBlurFirst(event)
    expect(errorRefFirst.value.tooShort).toBe(false)
  })
})
