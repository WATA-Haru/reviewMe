<script setup lang="ts">
import ZipCodeInputPresentational from '@/components/ZipCodeInput/presentational/index.vue'
import { useInputFirst } from './composables/useInputFirst.ts'
import { useInputSecond } from './composables/useInputSecond.ts'

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
  textRefFirstWatcher,
} = useInputFirst(minLengthFirst)
const {
  textRefSecond,
  errorRefSecond,
  handleInputSecond,
  handleCompositionEndSecond,
  handleBlurSecond,
  textRefSecondWatcher,
} = useInputSecond(minLengthSecond)

textRefFirstWatcher()
textRefSecondWatcher()
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
