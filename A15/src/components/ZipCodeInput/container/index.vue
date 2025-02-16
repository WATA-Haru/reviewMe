<script setup lang="ts">
import ZipCodeInputPresentational from '@/components/ZipCodeInput/presentational/index.vue'
import { useGoFocus } from './composables/useGoFocus'
import { useInputFirst } from './composables/useInputFirst.ts'
import { useInputSecond } from './composables/useInputSecond.ts'
import { useErrorStatus } from './composables/useErrorStatus.ts'

defineOptions({
  name: 'ZipCodeInputContainer',
})

const minLengthFirst = 3
const maxLengthFirst = 3
const minLengthSecond = 4
const maxLengthSecond = 4
const { goFocusRef, resetGoFocusStatus } = useGoFocus()
const { errorStatusRef } = useErrorStatus()
const {
  textRefFirst,
  handleInputFirst,
  handleCompositionEndFirst,
  handleBlurFirst,
  textRefFirstWatcher,
} = useInputFirst(minLengthFirst, errorStatusRef, goFocusRef)
const {
  textRefSecond,
  handleInputSecond,
  handleCompositionEndSecond,
  handleBlurSecond,
  textRefSecondWatcher,
} = useInputSecond(minLengthSecond, errorStatusRef)

textRefFirstWatcher()
textRefSecondWatcher()
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
    @reset-go-focus-status="resetGoFocusStatus"
    :text-second="textRefSecond"
    :min-length-second="minLengthSecond"
    :max-length-second="maxLengthSecond"
    @input-second="handleInputSecond"
    @blur-second="handleBlurSecond"
    @composition-end-second="handleCompositionEndSecond"
    :is-shorter-than-min-length-second="errorStatusRef[1].isShorterThanMinLength"
    :is-invalid-character-used-second="errorStatusRef[1].isInvalidCharacterUsed"
  />
</template>
