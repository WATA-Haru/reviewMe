import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, test, expect } from 'vitest'
import ZipCodeInputContainer from '@/components/ZipCodeInput/container/index.vue'
import ZipCodeInputPresentational from '@/components/ZipCodeInput/presentational/index.vue'

const inputFirstClassName = 'zipcode-input-wrapper__input-first'
const inputSecondClassName = 'zipcode-input-wrapper__input-second'

describe('入力欄1: inputの入力確定時に文字列が変換されることのテスト', () => {
  test('inputイベント時、isComposingがfalse(入力確定)で文字列の変換が行われること', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２３'

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: false })
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('123')
  })

  test('inputイベント時、isComposingがtrue(入力未確定)で文字列の変換が行われないこと', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２３'

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: true })
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('１２３')
  })
})

describe('入力欄2: inputの入力確定時に文字列が変換されることのテスト', () => {
  test('inputイベント時、isComposingがfalse(入力確定)で文字列の変換が行われること', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputSecondClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２３'

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: false })
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('123')
  })

  test('inputイベント時、isComposingがtrue(入力未確定)で文字列の変換が行われないこと', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputSecondClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２３'

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: true })
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('１２３')
  })
})

describe('入力欄1:inputイベント: 文字列が全角・半角数字の場合、文字列が変換されることのテスト', () => {
  test('文字列がすべて全角数字の場合に半角数字に変換されること', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２３'

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: false })
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('123')
  })

  test('すべて全角半角数字でない場合は変換されないこと', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = 'abc'

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: false })
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('abc')
  })

  test('文字列に全角数字とそれ以外の文字がある場合、全角数字のみが半角数字に変換されること', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１a3'

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: false })
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('1a3')
  })
})

describe('入力欄2:inputイベント: 文字列が全角・半角数字の場合、文字列が変換されることのテスト', () => {
  test('文字列がすべて全角数字の場合に半角数字に変換されること', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputSecondClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２３４'

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: false })
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('1234')
  })

  test('すべて全角半角数字でない場合は変換されないこと', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputSecondClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = 'abcd'

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: false })
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('abcd')
  })

  test('文字列に全角数字とそれ以外の文字がある場合、全角数字のみが半角数字に変換されること', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputSecondClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１a3b'

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: false })
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('1a3b')
  })
})

describe('入力欄1:IMEの入力確定時(compositionend)、文字列が全角・半角数字の場合、文字列が変換されることのテスト', () => {
  test('文字列がすべて全角数字の場合に半角数字に変換されること', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２３'

    const event = new CompositionEvent('compositionend')
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('123')
  })

  test('文字列がすべて全角半角数字でない場合は変換されないこと', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = 'abc'

    const event = new CompositionEvent('compositionend')
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('abc')
  })

  test('文字列に全角数字とそれ以外の文字がある場合、全角数字のみが半角数字に変換されること', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１a3'

    const event = new CompositionEvent('compositionend')
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('1a3')
  })
})

describe('入力欄2:IMEの入力確定時(compositionend)、文字列が全角・半角数字の場合、文字列が変換されることのテスト', () => {
  test('文字列がすべて全角数字の場合に半角数字に変換されること', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputSecondClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２３４'

    const event = new CompositionEvent('compositionend')
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('1234')
  })

  test('文字列がすべて全角半角数字でない場合は変換されないこと', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = 'abcd'

    const event = new CompositionEvent('compositionend')
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('abcd')
  })

  test('文字列に全角数字とそれ以外の文字がある場合、全角数字のみが半角数字に変換されること', async () => {
    const wrapper = mount(ZipCodeInputContainer)
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１a3b'

    const event = new CompositionEvent('compositionend')
    input.element.dispatchEvent(event)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('1a3b')
  })
})

describe('入力欄1から2へ移動するイベント(GoFocus)のテスト', () => {
  test('input時にisComposingがfalse(入力確定)でminLengthの長さの全角・半角数字の条件を満たすとき、focusが入力欄2に移動すること', async () => {
    const wrapper = mount(ZipCodeInputContainer, { attachTo: document.body })
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２3'

    htmlInputElement.focus()

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: false })
    input.element.dispatchEvent(event)
    await nextTick()

    expect((wrapper.find(`.${inputFirstClassName}`).element as HTMLInputElement).value).toBe('123')
    expect(document.activeElement?.className).toBe(inputSecondClassName)
  })

  test('input時にisComposingがtrue(入力中)の際はfocusが移動しないこと\n ', async () => {
    const wrapper = mount(ZipCodeInputContainer, { attachTo: document.body })
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２3'

    htmlInputElement.focus()

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: true })
    input.element.dispatchEvent(event)
    await nextTick()

    expect(document.activeElement?.className).toBe(inputFirstClassName)
  })

  test('isComposingがfalse(入力確定)だが、文字列が全角・半角数字の条件を満たさないときはfocusがそのままであること', async () => {
    const wrapper = mount(ZipCodeInputContainer, { attachTo: document.body })
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２a'

    htmlInputElement.focus()

    const event = new InputEvent('input')
    Object.defineProperty(event, 'isComposing', { value: false })
    input.element.dispatchEvent(event)
    await nextTick()

    expect(document.activeElement?.className).toBe(inputFirstClassName)
  })

  test('IMEの入力確定時(compositionend)に文字列が全角・半角数字の条件を満たすときfocusが移動すること', async () => {
    const wrapper = mount(ZipCodeInputContainer, { attachTo: document.body })
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２3'

    htmlInputElement.focus()

    const event = new CompositionEvent('compositionend')
    input.element.dispatchEvent(event)
    await nextTick()

    expect(document.activeElement?.className).toBe(inputSecondClassName)
  })

  test('IMEの入力確定時(compositionend)に文字列が全角・半角数字の条件を満たさないときはfocusがそのままであること', async () => {
    const wrapper = mount(ZipCodeInputContainer, { attachTo: document.body })
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement
    htmlInputElement.value = '１２a'

    htmlInputElement.focus()

    const event = new CompositionEvent('compositionend')
    input.element.dispatchEvent(event)
    await nextTick()

    expect(document.activeElement?.className).toBe(inputFirstClassName)
  })
})

describe('input1: blur時に文字列が少ないかの判定を行うテスト', () => {
  test('入力が minLength と等しい場合はエラーが出ないこと', async () => {
    const wrapper = mount(ZipCodeInputContainer, { attachTo: document.body })
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement

    htmlInputElement.focus()
    htmlInputElement.value = '１２3'

    const event = new FocusEvent('blur')
    input.element.dispatchEvent(event)
    await nextTick()

    const presentational = wrapper.findComponent(ZipCodeInputPresentational)
    const props = presentational.props()

    expect(props['isShorterThanMinLengthFirst']).toBe(false)
  })

  test('入力が minLength 未満の場合propsにエラーが渡されること', async () => {
    const wrapper = mount(ZipCodeInputContainer, { attachTo: document.body })
    const input = wrapper.find(`.${inputFirstClassName}`)
    const htmlInputElement = input.element as HTMLInputElement

    htmlInputElement.focus()
    htmlInputElement.value = '１２'

    const event = new FocusEvent('blur')
    input.element.dispatchEvent(event)
    await nextTick()

    const presentational = wrapper.findComponent(ZipCodeInputPresentational)
    const props = presentational.props()

    expect(props['isShorterThanMinLengthFirst']).toBe(true)
  })
})
