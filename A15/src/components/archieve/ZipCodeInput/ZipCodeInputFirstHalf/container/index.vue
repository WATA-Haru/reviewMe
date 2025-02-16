<script setup lang="ts">
import ZipCodeInputFirstHalfPresentational from '@/components/ZipCodeInput/ZipCodeInputFirstHalf/presentational/index.vue'
import { convertStringNumToNaturalNum } from '@/utils/convertStringNumToNaturalNum'
import { isStringNaturalNum } from '@/utils/isStringNaturalNum'
import { ref } from 'vue'

defineOptions({
  name: 'ZipCodeInputFirstHalfContainer',
})

interface Props {
  minLength: number
  maxLength: number
}
interface Emits {
  (event: 'filled-min-length-value', value: string): void
  (event: 'input-first-blur', value: string): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const textRef = ref('')

const makeFullWidthNumToHalfWidthNum = (value: string) => {
  let s = ''

  for (const c of value) {
    if (isStringNaturalNum(c)) {
      s += String(convertStringNumToNaturalNum(c))
    } else {
      s += c
    }
  }
  return s
}

const handleFirstHalfInput = (textFromInput: string) => {
  // textFromInputが全角の場合に、半角にconvertしてvalueに結合
  textRef.value = makeFullWidthNumToHalfWidthNum(textFromInput)
  if (textRef.value.length === props.minLength) {
    emits('filled-min-length-value', textRef.value)
  }
}

const handleBlur = (event: Event) => {
  const { target } = event

  if (!(target instanceof HTMLInputElement)) {
    return
  }
  emits('input-first-blur', textRef.value)
}
</script>
<template>
  まずは3桁の郵便番号から<br />
  <span class="zipCode-logo">〒</span>
  <ZipCodeInputFirstHalfPresentational
    :text="textRef"
    @blur="(event: Event) => handleBlur"
    @input-first-half="handleFirstHalfInput(event)"
    :min-length="props.minLength"
    :max-length="props.maxLength"
  />
</template>
