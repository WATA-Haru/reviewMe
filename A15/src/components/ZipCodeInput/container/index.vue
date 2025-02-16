<script setup lang="ts">
import ZipCodeInputPresentational from '@/components/ZipCodeInput/presentational/index.vue'
import { isStringNaturalNum } from '@/utils/isStringNaturalNum'
import { makeFullWidthNumToHalfWidthNum } from '@/utils/makeFullWidthNumToHalfWidthNum'
import { type Ref, ref, watch } from 'vue'

defineOptions({
  name: 'ZipCodeInputContainer',
})

const minLengthFirst = 3
const maxLengthFirst = 3
const minLengthSecond = 4
const maxLengthSecond = 4

const textRefFirst = ref('')
const textRefSecond = ref('')
const goFocusRef = ref(false)

const resetGoFocusStatus = () => {
  goFocusRef.value = false
}

type ErrorStatus = {
  isShorterThanMinLength: boolean
  isInvalidCharacterUsed: boolean
}
const errorStatusRef: Ref<ErrorStatus[]> = ref([
  { isShorterThanMinLength: false, isInvalidCharacterUsed: false },
  { isShorterThanMinLength: false, isInvalidCharacterUsed: false },
])

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

const handleCompositionEndSecond = (event: CompositionEvent) => {
  const { target } = event
  if (!(target instanceof HTMLInputElement)) {
    return
  }
  const textFromInput = target.value

  textRefSecond.value = makeFullWidthNumToHalfWidthNum(textFromInput)
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

  //if (textFromInput.length < minLengthFirst) {
  //  errorStatusRef.value[0].isShorterThanMinLength = true
  //}
}

const handleBlurSecond = (event: FocusEvent) => {
  const { target } = event
  if (!(target instanceof HTMLInputElement)) {
    return
  }

  const textFromInput = target.value

  //if (textFromInput.length < minLengthFirst) {
  //  errorStatusRef.value[1].isShorterThanMinLength = true
  //}
}

watch(textRefFirst, () => {
  if (isStringNaturalNum(textRefFirst.value)) {
    errorStatusRef.value[0].isInvalidCharacterUsed = false
  } else {
    errorStatusRef.value[0].isInvalidCharacterUsed = true
  }
  if (textRefFirst.value.length === minLengthFirst) {
    errorStatusRef.value[0].isShorterThanMinLength = false
  } else {
    errorStatusRef.value[0].isShorterThanMinLength = true
  }
})

watch(textRefSecond, () => {
  if (isStringNaturalNum(textRefSecond.value)) {
    errorStatusRef.value[1].isInvalidCharacterUsed = false
  } else {
    errorStatusRef.value[1].isInvalidCharacterUsed = true
  }
  if (textRefSecond.value.length === minLengthSecond) {
    errorStatusRef.value[1].isShorterThanMinLength = false
  } else {
    errorStatusRef.value[1].isShorterThanMinLength = true
  }
})
</script>
<template>
  <ZipCodeInputPresentational
    :text-first="textRefFirst"
    :min-length-first="minLengthFirst"
    :max-length-first="maxLengthFirst"
    :is-shorter-than-min-length-first="errorStatusRef[0].isShorterThanMinLength"
    :is-invalid-character-used-first="errorStatusRef[0].isInvalidCharacterUsed"
    @input-first="handleInputFirst"
    @blur-first="handleBlurFirst"
    @composition-end-first="handleCompositionEndFirst"
    :go-focus="goFocusRef"
    :text-second="textRefSecond"
    :min-length-second="minLengthSecond"
    :max-length-second="maxLengthSecond"
    @input-second="handleInputSecond"
    @blur-second="handleBlurSecond"
    @composition-end-second="handleCompositionEndSecond"
    :is-shorter-than-min-length-second="errorStatusRef[1].isShorterThanMinLength"
    :is-invalid-character-used-second="errorStatusRef[1].isInvalidCharacterUsed"
    @reset-go-focus-status="resetGoFocusStatus"
  />
</template>
