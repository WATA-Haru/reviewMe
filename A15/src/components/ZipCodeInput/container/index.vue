<script setup lang="ts">
import InputFirstHalfContainer from '@/components/InputFirstHalf/container/index.vue'
import InputSecondHalfContainer from '@/components/InputSecondHalf/container/index.vue'
import { ref } from 'vue'

defineOptions({
  name: 'ZipCodeInputContainer',
})

const isFirstInputShorter = ref(false)
const isFirstValidateError = ref(false)
const isSecondInputShorter = ref(false)
const isSecondValidateError = ref(false)
const goFocus = ref(false)

const resetFirstStatus = () => {
  isFirstValidateError.value = false
  isFirstInputShorter.value = false
}
const resetSecondStatus = () => {
  isSecondValidateError.value = false
  isSecondInputShorter.value = false
}
const handleFirstInputSuccess = () => {
  resetFirstStatus()
  goFocus.value = true
}
const handleFirstValidateError = () => {
  isFirstValidateError.value = true
  goFocus.value = false
}
const handleFirstInputShorter = () => {
  isFirstInputShorter.value = true
  goFocus.value = false
}
const handleSecondInputSuccess = () => {
  resetSecondStatus()
}
const handleSecondValidateError = () => {
  isSecondValidateError.value = true
}
const handleSecondInputShorter = () => {
  isSecondInputShorter.value = true
}
</script>

<template>
  〒
  <InputFirstHalfContainer
    :min-length="3"
    :max-length="3"
    @validate-success="handleFirstInputSuccess"
    @validate-error="handleFirstValidateError"
    @input-shorter="handleFirstInputShorter"
  />
  -
  <InputSecondHalfContainer
    :go-focus="goFocus"
    :min-length="4"
    :max-length="4"
    @validate-success="handleSecondInputSuccess"
    @validate-error="handleSecondValidateError"
    @input-shorter="handleSecondInputShorter"
  />
  <div v-if="isFirstInputShorter">First: isShorterError</div>
  <div v-if="isFirstValidateError">First: isValidateError</div>

  <div v-if="isSecondInputShorter">Second: isShorterError</div>
  <div v-if="isSecondValidateError">Second: isValidateError</div>
</template>
