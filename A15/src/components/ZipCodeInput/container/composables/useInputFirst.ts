import { isStringNaturalNum } from '@/utils/isStringNaturalNum'
import { makeFullWidthNumToHalfWidthNum } from '@/utils/makeFullWidthNumToHalfWidthNum'
import { ref, watch } from 'vue'

interface ErrorState {
  tooShort: boolean
  invalid: boolean
}

const useGoFocus = () => {
  const goFocusRef = ref(false)

  const activateGoFocus = () => {
    goFocusRef.value = true
  }

  const deactivateGoFocus = () => {
    goFocusRef.value = false
  }

  return {
    goFocusRef,
    activateGoFocus,
    deactivateGoFocus,
  }
}

const useErrorFirst = () => {
  const errorRefFirst = ref<ErrorState>({
    tooShort: false,
    invalid: false,
  })

  const setTooShortError = (value: boolean) => {
    errorRefFirst.value.tooShort = value
  }

  const setInvalidError = (value: boolean) => {
    errorRefFirst.value.invalid = value
  }

  const markShort = () => setTooShortError(true)
  const unmarkShort = () => setTooShortError(false)
  const markInvalid = () => setInvalidError(true)
  const unmarkInvalid = () => setInvalidError(false)

  return {
    errorRefFirst,
    markShort,
    unmarkShort,
    unmarkInvalid,
    markInvalid,
  }
}

export const useInputFirst = (minLengthFirst: number) => {
  const textRefFirst = ref('')

  const { goFocusRef, activateGoFocus, deactivateGoFocus } = useGoFocus()
  const { errorRefFirst, markShort, unmarkShort, markInvalid, unmarkInvalid } = useErrorFirst()

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

  return {
    goFocusRef,
    textRefFirst,
    errorRefFirst,
    deactivateGoFocus,
    handleInputFirst,
    handleCompositionEndFirst,
    handleBlurFirst,
    textRefFirstWatcher,
  }
}
