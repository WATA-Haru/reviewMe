import { isStringNaturalNum } from '@/utils/isStringNaturalNum'
import { makeFullWidthNumToHalfWidthNum } from '@/utils/makeFullWidthNumToHalfWidthNum'
import { type Ref, ref, watch } from 'vue'
import { type ErrorStatus } from '../errorStatusType.ts'

export const useInputFirst = (
  minLengthFirst: number,
  errorStatusRef: Ref<ErrorStatus[]>,
  goFocusRef: Ref<boolean>,
) => {
  const textRefFirst = ref('')

  /**
   * @description - IMEが入力中の場合以外に文字を変換する。IMEが入力中かをInputEvent.isComposintで判定する
   */
  const handleInputFirst = (event: InputEvent) => {
    const { target } = event
    if (!(target instanceof HTMLInputElement)) {
      return
    }
    const textFromInput = target.value

    if (!event.isComposing) {
      textRefFirst.value = makeFullWidthNumToHalfWidthNum(textFromInput)
    }

    // IMEでない入力の場合、inputのタイミングでfocusイベントを処理
    if (textRefFirst.value.length === minLengthFirst && isStringNaturalNum(textRefFirst.value)) {
      goFocusRef.value = true
    }
  }

  const handleCompositionEndFirst = (event: CompositionEvent) => {
    const { target } = event
    if (!(target instanceof HTMLInputElement)) {
      return
    }
    const textFromInput = target.value

    textRefFirst.value = makeFullWidthNumToHalfWidthNum(textFromInput)
    if (textFromInput.length === minLengthFirst && isStringNaturalNum(textFromInput)) {
      goFocusRef.value = true
    }
  }
  /**
   *
   * @description validationを行い、文字数が少ない場合にisShorterThanMinLengthをtrueにする
   */
  const handleBlurFirst = (event: FocusEvent) => {
    const { target } = event
    if (!(target instanceof HTMLInputElement)) {
      return
    }

    const textFromInput = target.value

    if (textFromInput.length < minLengthFirst) {
      errorStatusRef.value[0].isShorterThanMinLength = true
    }
  }

  /**
   * @description 
   *   1. 入力欄の文字列が全角・半角数字以外の場合は、即座にエラー状態をtrueにする。
   *   2. 文字数がminLengthと同じ場合エラー状態をfalseにする。
   *   3. 入力値が全角・半角数字の場合はエラー状態をfalseにする。
   *   4. minLengthのエラーは入力中ではなく、blur時に出したいのでエラー状態をtrueにする処理は行わない。
   */
  const textRefFirstWatcher = () => {
    watch(textRefFirst, () => {
      if (isStringNaturalNum(textRefFirst.value)) {
        errorStatusRef.value[0].isInvalidCharacterUsed = false
      } else {
        errorStatusRef.value[0].isInvalidCharacterUsed = true
      }
      if (textRefFirst.value.length === minLengthFirst) {
        errorStatusRef.value[0].isShorterThanMinLength = false
      }
    })
  }

  return {
    textRefFirst,
    handleInputFirst,
    handleCompositionEndFirst,
    handleBlurFirst,
    textRefFirstWatcher,
  }
}
