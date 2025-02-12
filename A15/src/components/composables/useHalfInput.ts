import { isStringNaturalNum } from '@/utils/isStringNaturalNum'
import { makeFullWidthNumToHalfWidthNum } from '@/utils/makeFullWidthNumToHalfWidthNum'
import { type Ref, ref } from 'vue'

export const useHalfInput = (
  minLength: number,
  emitFn: (eventName: 'validate-success' | 'validate-error' | 'input-shorter') => void,
) => {
  const textRef = ref('')

  /**
   * @description
   * - 文字数がminLength未満のとき
   *   - 単に全角数字を半角にする。
   */
  const handleCompositionEnd = (textFromInput: string) => {
    textRef.value = makeFullWidthNumToHalfWidthNum(textFromInput)
    compositionEndEventMessenger(textRef)
  }

  /**
   * @description
   * - 全角・半角数字以外の時は'validate-error'を発行する
   * - 文字数がminLengthかつ、バリデーションが通る場合はvalidate-successを発行する
   */
  const compositionEndEventMessenger = (textRef: Ref<string>) => {
    if (!isStringNaturalNum(textRef.value)) {
      return emitFn('validate-error')
    }
    if (textRef.value.length === minLength) {
      return emitFn('validate-success')
    }
  }

  /**
   * @description
   * - 文字数がminLength未満のときは'input-shorter'のイベントを発行する
   */
  const handleBlur = (textFromInput: string) => {
    if (textFromInput.length < minLength) {
      return emitFn('input-shorter')
    }
  }

  return {
    textRef,
    handleCompositionEnd,
    handleBlur,
  }
}
