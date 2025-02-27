import { mount } from '@vue/test-utils'
import ZipCodeInputPresentational from './index.vue'
import { test, expect } from 'vitest'
import { describe } from 'node:test'

interface Props {
  textFirst: string
  minLengthFirst: number
  maxLengthFirst: number

  textSecond: string
  minLengthSecond: number
  maxLengthSecond: number

  goFocus: boolean
  isInvalidCharacterUsedFirst: boolean
  isShorterThanMinLengthFirst: boolean
  isInvalidCharacterUsedSecond: boolean
  isShorterThanMinLengthSecond: boolean
}

describe('ZipCodeInputPresentational Events', () => {
  // 共通の props を定義
  const defaultProps: Props = {
    textFirst: '',
    minLengthFirst: 3,
    maxLengthFirst: 3,
    textSecond: '',
    minLengthSecond: 4,
    maxLengthSecond: 4,
    goFocus: false,
    isInvalidCharacterUsedFirst: false,
    isShorterThanMinLengthFirst: false,
    isInvalidCharacterUsedSecond: false,
    isShorterThanMinLengthSecond: false,
  }

  test('input-first: first input に値がセットされたとき、イベントが発行されること', async () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputFirst = wrapper.find('.zipcode-input-wrapper__input-first')
    await inputFirst.setValue('123')
    expect(wrapper.emitted()).toHaveProperty('input-first')
  })

  test('blur-first: first input がフォーカスを失ったとき、イベントが発行されること', async () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputFirst = wrapper.find('.zipcode-input-wrapper__input-first')
    await inputFirst.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur-first')
  })

  test('composition-end-first: first input で compositionend イベントが発生したとき、イベントが発行されること', async () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputFirst = wrapper.find('.zipcode-input-wrapper__input-first')
    await inputFirst.trigger('compositionend')
    expect(wrapper.emitted()).toHaveProperty('composition-end-first')
  })

  test('input-second: second input に値がセットされたとき、イベントが発行されること', async () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputSecond = wrapper.find('.zipcode-input-wrapper__input-second')
    await inputSecond.setValue('4567')
    expect(wrapper.emitted()).toHaveProperty('input-second')
  })

  test('blur-second: second input がフォーカスを失ったとき、イベントが発行されること', async () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputSecond = wrapper.find('.zipcode-input-wrapper__input-second')
    await inputSecond.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur-second')
  })

  test('composition-end-second: second input で compositionend イベントが発生したとき、イベントが発行されること', async () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputSecond = wrapper.find('.zipcode-input-wrapper__input-second')
    await inputSecond.trigger('compositionend')
    expect(wrapper.emitted()).toHaveProperty('composition-end-second')
  })

  test('reset-go-focus-status: goFocus が true になったとき、vFocus ディレクティブによりイベントが発行されること', async () => {
    const wrapper = mount(ZipCodeInputPresentational, {
      props: { ...defaultProps, goFocus: false },
    })
    // updatedの呼び出しを期待
    await wrapper.setProps({ goFocus: true })
    expect(wrapper.emitted()).toHaveProperty('reset-go-focus-status')
  })
})

describe('ZipCodeInputPresentational Propsのレンダリング', () => {
  const defaultProps: Props = {
    textFirst: '',
    minLengthFirst: 3,
    maxLengthFirst: 3,
    textSecond: '',
    minLengthSecond: 4,
    maxLengthSecond: 4,
    goFocus: false,
    isInvalidCharacterUsedFirst: false,
    isShorterThanMinLengthFirst: false,
    isInvalidCharacterUsedSecond: false,
    isShorterThanMinLengthSecond: false,
  }

  test('textFirstにpropsが渡されたとき、input要素にpropsで受け取った値が描画されること', () => {
    const wrapper = mount(ZipCodeInputPresentational, {
      props: { ...defaultProps, textFirst: '123' },
    })
    const inputField: HTMLInputElement = wrapper.find('.zipcode-input-wrapper__input-first')
      .element as HTMLInputElement
    expect(inputField.value).toBe('123')
  })

  test('textSecondにpropsが渡されたとき、input要素にpropsで受け取った値が描画されること', () => {
    const wrapper = mount(ZipCodeInputPresentational, {
      props: { ...defaultProps, textSecond: '123' },
    })
    const inputField: HTMLInputElement = wrapper.find('.zipcode-input-wrapper__input-second')
      .element as HTMLInputElement
    expect(inputField.value).toBe('123')
  })
})
