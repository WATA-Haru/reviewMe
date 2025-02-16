<script setup lang="ts">
import ZipCodeInputPresentational from '@/components/ZipCodeInput/presentational/index.vue'
import { isStringNaturalNum } from '@/utils/isStringNaturalNum'
import { makeFullWidthNumToHalfWidthNum } from '@/utils/makeFullWidthNumToHalfWidthNum'
import { ref } from 'vue'

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

  console.log(textFromInput)
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

const handleBlurFirst = (event: FocusEvent) => {
  if (event) {
    return
  }
  //const { target } = event
  //if (!(target instanceof HTMLInputElement)) {
  //  return ;
  //}
  //const textFromInput = target.value
  //textRefFirst.value = makeFullWidthNumToHalfWidthNum(textFromInput)
}

const handleBlurSecond = (event: FocusEvent) => {
  if (event) {
    return
  }
  //const { target } = event
  //if (!(target instanceof HTMLInputElement)) {
  //  return ;
  //}
  //const textFromInput = target.value
  //textRefSecond.value = makeFullWidthNumToHalfWidthNum(textFromInput)
}
</script>
<template>
  <ZipCodeInputPresentational
    :text-first="textRefFirst"
    :min-length-first="minLengthFirst"
    :max-length-first="maxLengthFirst"
    :is-validate-error-first="true"
    :is-shorter-error-first="true"
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
    @reset-go-focus-status="resetGoFocusStatus"
  />
</template>
