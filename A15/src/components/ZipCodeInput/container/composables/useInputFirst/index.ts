import { isStringNaturalNum } from '@/utils/isStringNaturalNum'
import { makeFullWidthNumToHalfWidthNum } from '@/utils/makeFullWidthNumToHalfWidthNum'
import { useGoFocus } from './composables/useGoFocus/index.ts'
import { useErrorFirst } from './composables/useErrorFirst/index.ts'
import { ref, watch } from 'vue'

/**
 * @description
 * ### 1. テキストを保持し全角数字を半角数字に変換する
 * textRefFirstで入力テキストを保持する。
 *
 * テキスト変換に関連する関数
 * - handleInputFirst: 入力中(isComposing)ではない場合に全角数字を半角数字に変換
 * - handleCompositionEndFirst: IMEの入力確定時に全角数字を半角数字に変換
 *
 * ### 2. 入力によりエラー状態を切り替える
 * errorRefFirstでエラー状態を保持する。
 *
 * エラー状態の切り替えに関連する関数
 * - handleBlurFirst: blur時に文字列の長さが最小文字列より小さい場合に「文字列の長さのエラー」を有効化
 * - textRefFirstWatcher: テキストを保持するrefを監視し、全角・半角数字以外ならば「入力が不正のエラー」を有効化 / 文字列の長さを満たしている場合に「文字列の長さのエラー」を無効化
 *
 * ### 3. 入力が正しい場合にfocus移動の状態を切り替える
 * goFocusRefでfocusの状態を保持する。
 *
 * focus状態の切り替えに関連する関数
 * - deactivateGoFocus: focusの状態を無効化する
 * - handleInputFirst: 文字列変換後に入力値のエラーがない場合、focusの状態を有効化する
 * - handleCompositionEndFirst: モズ列返還後に入力値のエラーがない場合、focusの状態を有効化する
 *
 */
export const useInputFirst = (minLengthFirst: number) => {
  const textRefFirst = ref('')

  const { goFocusRef, activateGoFocus, deactivateGoFocus } = useGoFocus()
  const { errorRefFirst, markShort, unmarkShort, markInvalid, unmarkInvalid } = useErrorFirst()

  /**
   * @description - IMEが入力中の場合以外に文字を変換する。IMEが入力中かをInputEvent.isComposintで判定する。InputとCompositionの両方でfocusイベントを扱う理由は、IMEを伴う入力確定はisComposingで発行できるが、IMEを伴わない普通の英数字入力の場合はInput属性のisComposingを用いないと入力確定がチェックできないからだ。
   */
  const handleInputFirst = (event: InputEvent) => {
    const { target } = event

    if (event.isComposing) {
      return
    }
    if (!(target instanceof HTMLInputElement)) {
      return
    }

    const textFromInput = target.value

    if (!event.isComposing) {
      textRefFirst.value = makeFullWidthNumToHalfWidthNum(textFromInput)
    }
    // IMEでない入力の場合、inputのタイミングでfocusイベントを処理
    if (textRefFirst.value.length === minLengthFirst && isStringNaturalNum(textRefFirst.value)) {
      activateGoFocus()
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
      activateGoFocus()
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
  const textRefFirstWatcher = () => {
    watch(textRefFirst, () => {
      if (isStringNaturalNum(textRefFirst.value)) {
        unmarkInvalid()
      } else {
        markInvalid()
      }
      if (textRefFirst.value.length === minLengthFirst) {
        unmarkShort()
      }
    })
  }

  textRefFirstWatcher()

  return {
    goFocusRef,
    textRefFirst,
    errorRefFirst,
    deactivateGoFocus,
    handleInputFirst,
    handleCompositionEndFirst,
    handleBlurFirst,
  }
}
