import { makeFullWidthNumToHalfWidthNum } from '@/utils/makeFullWidthNumToHalfWidthNum'
import { ref, watch } from 'vue'
import { isStringNaturalNum } from '@/utils/isStringNaturalNum/index.ts'
import { useErrorSecond } from './composables/useErrorSecond'

/**
 * @description
 * ### 1. テキストを保持し全角数字を半角数字に変換する
 * textRefSecondで入力テキストを保持する。
 *
 * テキスト変換に関連する関数
 * - handleInputSecond: 入力中(isComposing)ではない場合に全角数字を半角数字に変換
 * - handleCompositionEndSecond: IMEの入力確定時に全角数字を半角数字に変換
 *
 * ### 2. 入力によりエラー状態を切り替える
 * errorRefSecondでエラー状態を保持する。
 *
 * エラー状態の切り替えに関連する関数
 * - handleBlurSecond: blur時に文字列の長さが最小文字列より小さい場合に「文字列の長さのエラー」を有効化
 * - textRefSecondWatcher: テキストを保持するrefを監視し、全角・半角数字以外ならば「入力が不正のエラー」を有効化 / 文字列の長さを満たしている場合に「文字列の長さのエラー」を無効化
 *
 */
export const useInputSecond = (minLengthSecond: number) => {
  const textRefSecond = ref('')

  const { errorRefSecond, markShort, unmarkShort, unmarkInvalid, markInvalid } = useErrorSecond()

  /**
   * @description - IMEが入力中の場合以外に文字を変換する。IMEが入力中かをInputEvent.isComposintで判定する
   */
  const handleInputSecond = (event: Event) => {
    if (!(event instanceof InputEvent)) {
      return
    }
    if (event.isComposing) {
      return
    }
    const { target } = event
    if (!(target instanceof HTMLInputElement)) {
      return
    }
    const textFromInput = target.value
    if (!event.isComposing) {
      textRefSecond.value = makeFullWidthNumToHalfWidthNum(textFromInput)
    }
  }

  const handleCompositionEndSecond = (event: Event) => {
    if (!(event instanceof CompositionEvent)) {
      return
    }
    const { target } = event
    if (!(target instanceof HTMLInputElement)) {
      return
    }
    const textFromInput = target.value
    textRefSecond.value = makeFullWidthNumToHalfWidthNum(textFromInput)
  }

  const handleBlurSecond = (event: Event) => {
    if (!(event instanceof FocusEvent)) {
      return
    }
    const { target } = event
    if (!(target instanceof HTMLInputElement)) {
      return
    }
    const textFromInput = target.value
    if (textFromInput.length < minLengthSecond) {
      markShort()
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
        unmarkInvalid()
      } else {
        markInvalid()
      }
      if (textRefSecond.value.length === minLengthSecond) {
        unmarkShort()
      }
    })
  }

  textRefSecondWatcher()

  return {
    textRefSecond,
    errorRefSecond,
    handleInputSecond,
    handleCompositionEndSecond,
    handleBlurSecond,
  }
}
