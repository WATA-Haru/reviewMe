import { makeFullWidthNumToHalfWidthNum } from '@/utils/makeFullWidthNumToHalfWidthNum'
import { ref, watch } from 'vue'
import { isStringNaturalNum } from '@/utils/isStringNaturalNum/index.ts'

interface ErrorState {
  tooShort: boolean
  invalid: boolean
}

const useErrorSecond = () => {
  const errorRefSecond = ref<ErrorState>({
    tooShort: false,
    invalid: false,
  })

  const setTooShortError = (value: boolean) => {
    errorRefSecond.value.tooShort = value
  }

  const setInvalidError = (value: boolean) => {
    errorRefSecond.value.invalid = value
  }

  const markShort = () => setTooShortError(true)
  const unmarkShort = () => setTooShortError(false)
  const markInvalid = () => setInvalidError(true)
  const unmarkInvalid = () => setInvalidError(false)

  return {
    errorRefSecond,
    markShort,
    unmarkShort,
    unmarkInvalid,
    markInvalid,
  }
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest
  describe('useErrorSecond', () => {
    test('errorRefSecondのプロパティの初期値がfalseであること', () => {
      const { errorRefSecond } = useErrorSecond()
      expect(errorRefSecond.value.tooShort).toBe(false)
      expect(errorRefSecond.value.invalid).toBe(false)
    })
    test('markShortを実行することでerrorRefSecond.value.tooShortがtrueになること', () => {
      const { errorRefSecond, markShort } = useErrorSecond()
      markShort()
      expect(errorRefSecond.value.tooShort).toBe(true)
    })
    test('unmarkShortを実行することでerrorRefSecond.value.tooShortがfalseになること', () => {
      const { errorRefSecond, unmarkShort } = useErrorSecond()
      unmarkShort()
      expect(errorRefSecond.value.tooShort).toBe(false)
    })
    test('markInvalidを実行することでerrorRefSecond.value.invalidがtrueになること', () => {
      const { errorRefSecond, markInvalid } = useErrorSecond()
      markInvalid()
      expect(errorRefSecond.value.invalid).toBe(true)
    })
    test('unmarkInvalidを実行することでerrorRefSecond.value.invalidがfalseになること', () => {
      const { errorRefSecond, unmarkInvalid } = useErrorSecond()
      unmarkInvalid()
      expect(errorRefSecond.value.invalid).toBe(false)
    })
  })
}

export const useInputSecond = (minLengthSecond: number) => {
  const textRefSecond = ref('')

  const { errorRefSecond, markShort, unmarkShort, unmarkInvalid, markInvalid } = useErrorSecond()

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

  return {
    textRefSecond,
    errorRefSecond,
    handleInputSecond,
    handleCompositionEndSecond,
    handleBlurSecond,
    textRefSecondWatcher,
  }
}
