<script setup lang="ts">
import ZipCodeInputFirstHalfContainer from '@/components/ZipCodeInput/ZipCodeInputFirstHalf/container/index.vue'

defineOptions({
  name: 'ZipCodeInputContainer',
})

const handleFilledMinLength = () => {}

const inputFirstBlur = () => {}
</script>

<template>
  <ZipCodeInputFirstHalfContainer
    :min-length="3"
    :max-length="3"
    @filled-min-length-value="handleFilledMinLength"
    @input-first-blur="inputFirstBlur"
  />
</template>
