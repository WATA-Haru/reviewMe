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
