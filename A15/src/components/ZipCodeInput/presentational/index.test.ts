import { mount } from '@vue/test-utils'
import ZipCodeInputPresentational from './index.vue'
import { describe, test, expect } from 'vitest'

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

describe('ZipCodeInputPresentationalイベントのテスト', () => {
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
  test('入力欄1でinputイベントが発生した場合、input-firstイベントが発火すること', () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputFirst = wrapper.findByTestId('input-first')
    inputFirst.trigger('input')
    expect(wrapper.emitted('input-first')?.length).toBe(1)
  })
  test('入力欄1でblurイベントが発生した場合、blur-firstイベントが発火すること', () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputFirst = wrapper.findByTestId('input-first')
    inputFirst.trigger('blur')
    expect(wrapper.emitted('blur-first')?.length).toBe(1)
  })
  test('入力欄1でcompositionendイベントが発生した場合、composition-end-firstイベントが発火すること', () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputFirst = wrapper.findByTestId('input-first')
    inputFirst.trigger('compositionend')
    expect(wrapper.emitted('composition-end-first')?.length).toBe(1)
  })

  test('入力欄2でinputイベントが発生した場合、input-secondイベントが発火すること', () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputSecond = wrapper.findByTestId('input-second')
    inputSecond.trigger('input')
    expect(wrapper.emitted('input-second')?.length).toBe(1)
  })
  test('入力欄2でblurイベントが発生した場合、blur-secondイベントが発火すること', () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputSecond = wrapper.findByTestId('input-second')
    inputSecond.trigger('blur')
    expect(wrapper.emitted('blur-second')?.length).toBe(1)
  })
  test('入力欄2でcompositionendイベントが発生した場合、composition-end-secondイベントが発火すること', () => {
    const wrapper = mount(ZipCodeInputPresentational, { props: defaultProps })
    const inputSecond = wrapper.findByTestId('input-second')
    inputSecond.trigger('compositionend')
    expect(wrapper.emitted('composition-end-second')?.length).toBe(1)
  })

  test('PropsでgoFocus=trueが渡されたとき、reset-go-focusイベントが発行されること', async () => {
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
    const inputField: HTMLInputElement = wrapper.findByTestId('input-first')
      .element as HTMLInputElement
    expect(inputField.value).toBe('123')
  })

  test('textSecondにpropsが渡されたとき、input要素にpropsで受け取った値が描画されること', () => {
    const wrapper = mount(ZipCodeInputPresentational, {
      props: { ...defaultProps, textSecond: '123' },
    })
    const inputField: HTMLInputElement = wrapper.findByTestId('input-second')
      .element as HTMLInputElement
    expect(inputField.value).toBe('123')
  })
})

describe('Propsで渡されたエラーによって要素を描画するテスト', () => {
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
  test('1つもエラーのpropsを受け取っていない場合、エラーのラッパークラスが描画されないこと', () => {
    const wrapper = mount(ZipCodeInputPresentational, {
      props: defaultProps,
    })
    const errorField = wrapper.findByTestId('error-status')
    expect(errorField.exists()).toBe(false)
  })

  test('1つ以上エラーのpropsを受け取っている場合、エラーのラッパークラスが描画されること', () => {
    const wrapper = mount(ZipCodeInputPresentational, {
      props: { ...defaultProps, isInvalidCharacterUsedSecond: true },
    })
    const errorField = wrapper.findByTestId('error-status')
    expect(errorField.exists()).toBe(true)
  })

  test('input1: 全角半角数字以外のエラーを表すpropsがある場合、そのエラーを描画すること', () => {
    const wrapper = mount(ZipCodeInputPresentational, {
      props: { ...defaultProps, isInvalidCharacterUsedFirst: true },
    })
    const errorField = wrapper.findByTestId('error-status')
    expect(errorField.text()).toContain('isInvalidCharacterUsedFirst(全角半角数字以外がある)')
  })

  test('input1: 全角半角数字以外のエラーを表すpropsがある場合、そのエラーを描画すること', () => {
    const wrapper = mount(ZipCodeInputPresentational, {
      props: { ...defaultProps, isShorterThanMinLengthFirst: true },
    })
    const errorField = wrapper.findByTestId('error-status')
    expect(errorField.text()).toContain(
      'isShorterThanMinLengthFirst(入力文字数がMinLengthより小さい)',
    )
  })

  test('input2: 全角半角数字以外のエラーを表すpropsがある場合、そのエラーを描画すること', () => {
    const wrapper = mount(ZipCodeInputPresentational, {
      props: { ...defaultProps, isInvalidCharacterUsedSecond: true },
    })
    const errorField = wrapper.findByTestId('error-status')
    expect(errorField.text()).toContain('isInvalidCharacterUsedSecond(全角半角数字以外がある)')
  })

  test('input2: 全角半角数字以外のエラーを表すpropsがある場合、そのエラーを描画すること', () => {
    const wrapper = mount(ZipCodeInputPresentational, {
      props: { ...defaultProps, isShorterThanMinLengthSecond: true },
    })
    const errorField = wrapper.findByTestId('error-status')
    expect(errorField.text()).toContain(
      'isShorterThanMinLengthSecond(入力文字数がMinLengthより小さい)',
    )
  })
})
