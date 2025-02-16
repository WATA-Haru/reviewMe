import { makeFullWidthNumToHalfWidthNum } from '@/utils/makeFullWidthNumToHalfWidthNum'
import { type Ref, ref, watch } from 'vue'
import { type ErrorStatus } from '../errorStatusType.ts'
import { isStringNaturalNum } from '@/utils/isStringNaturalNum/index.ts'

export const useInputSecond = (minLengthSecond: number, errorStatusRef: Ref<ErrorStatus[]>) => {
  const textRefSecond = ref('')
  /**
   * @description - IMEが入力中の場合以外に文字を変換する。IMEが入力中かをInputEvent.isComposintで判定する
   */
  const handleInputSecond = (event: InputEvent) => {
    const { target } = event
    if (!(target instanceof HTMLInputElement)) {
      return
    }
    const textFromInput = target.value

    if (!event.isComposing) {
      textRefSecond.value = makeFullWidthNumToHalfWidthNum(textFromInput)
    }
  }

  const handleCompositionEndSecond = (event: CompositionEvent) => {
    const { target } = event
    if (!(target instanceof HTMLInputElement)) {
      return
    }
    const textFromInput = target.value

    textRefSecond.value = makeFullWidthNumToHalfWidthNum(textFromInput)
  }

  const handleBlurSecond = (event: FocusEvent) => {
    const { target } = event
    if (!(target instanceof HTMLInputElement)) {
      return
    }

    const textFromInput = target.value

    if (textFromInput.length < minLengthSecond) {
      errorStatusRef.value[1].isShorterThanMinLength = true
    }
  }

  /**
   * @description 
   *   1. 入力欄の文字列が全角・半角数字以外の場合は、即座にエラー状態をtrueにする。
   *   2. 文字数がminLengthと同じ場合エラー状態をfalseにする。
   *   3. 入力値が全角・半角数字の場合はエラー状態をfalseにする。
   *   4. minLengthのエラーは入力中ではなく、blur時に出したいのでエラー状態をtrueにする処理は行わない。
   */
  const textRefSecondWatcher = () => {
    watch(textRefSecond, () => {
      if (isStringNaturalNum(textRefSecond.value)) {
        errorStatusRef.value[1].isInvalidCharacterUsed = false
      } else {
        errorStatusRef.value[1].isInvalidCharacterUsed = true
      }
      if (textRefSecond.value.length === minLengthSecond) {
        errorStatusRef.value[1].isShorterThanMinLength = false
      }
    })
  }

  return {
    textRefSecond,
    handleInputSecond,
    handleCompositionEndSecond,
    handleBlurSecond,
    textRefSecondWatcher,
  }
}
