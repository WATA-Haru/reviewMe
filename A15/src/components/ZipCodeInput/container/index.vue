<script setup lang="ts">
import ZipCodeInputPresentational from '@/components/ZipCodeInput/presentational/index.vue'
import { useInputFirst } from './composables/useInputFirst/index.ts'
import { useInputSecond } from './composables/useInputSecond/index.ts'
import type { ZipCode } from '@/types/ZipCode.ts'
import { createZipCode } from '@/utils/createZipCode/index.ts'
import { watch } from 'vue'

defineOptions({
  name: 'ZipCodeInputContainer',
})

const minLengthFirst = 3
const maxLengthFirst = 3
const minLengthSecond = 4
const maxLengthSecond = 4
const {
  goFocusRef,
  textRefFirst,
  errorRefFirst,
  deactivateGoFocus,
  handleInputFirst,
  handleCompositionEndFirst,
  handleBlurFirst,
} = useInputFirst(minLengthFirst)
const {
  textRefSecond,
  errorRefSecond,
  handleInputSecond,
  handleCompositionEndSecond,
  handleBlurSecond,
} = useInputSecond(minLengthSecond)

interface Emits {
  (eventName: 'send-zipcode-from-zip-code-input', zipcode: ZipCode): void
}
const emits = defineEmits<Emits>()

/**
 * @description - 子コンポーネントで入力された郵便番号を親コンポーネントに送信する
 */
watch(textRefSecond, () => {
  const isError =
    errorRefFirst.value.invalid ||
    errorRefFirst.value.tooShort ||
    errorRefSecond.value.invalid ||
    errorRefSecond.value.tooShort
  if (isError) {
    return
  }
  const zipcode = createZipCode(textRefFirst.value.concat(textRefSecond.value))
  if (zipcode) {
    emits('send-zipcode-from-zip-code-input', zipcode)
  }
})
</script>
<template>
  <ZipCodeInputPresentational
    :text-first="textRefFirst"
    :min-length-first="minLengthFirst"
    :max-length-first="maxLengthFirst"
    :is-shorter-than-min-length-first="errorRefFirst.tooShort"
    :is-invalid-character-used-first="errorRefFirst.invalid"
    @input-first="handleInputFirst"
    @blur-first="handleBlurFirst"
    @composition-end-first="handleCompositionEndFirst"
    :go-focus="goFocusRef"
    @reset-go-focus-status="deactivateGoFocus"
    :text-second="textRefSecond"
    :min-length-second="minLengthSecond"
    :max-length-second="maxLengthSecond"
    @input-second="handleInputSecond"
    @blur-second="handleBlurSecond"
    @composition-end-second="handleCompositionEndSecond"
    :is-shorter-than-min-length-second="errorRefSecond.tooShort"
    :is-invalid-character-used-second="errorRefSecond.invalid"
  />
</template>
