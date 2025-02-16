<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'ZipCodeInputFirstHalfPresentational',
})

interface Props {
  text: string
  minLength: number
  maxLength: number
}
interface Emits {
  (event: 'first-half-input', value: string): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const isCompositionActive = ref(false)

const handleInput = (event: Event) => {
  const { target } = event

  if (!(target instanceof HTMLInputElement)) {
    return
  }
  if (isCompositionActive.value) {
    return
  }
  emits('first-half-input', target.value)
}
const activateIsComposition = () => {
  isCompositionActive.value = true
}

const handleCompositionEnd = (event: Event) => {
  isCompositionActive.value = false

  const { target } = event
  if (!(target instanceof HTMLInputElement)) {
    return
  }
  emits('first-half-input', target.value)
}
</script>
<template>
  <h1>{{ props.text }}</h1>
  <input
    type="text"
    :value="props.text"
    :maxlength="props.maxLength"
    :minlength="props.minLength"
    @input="(event: Event) => handleInput(event)"
    @compositionstart="activateIsComposition()"
    @compositionend="(event: Event) => handleCompositionEnd(event)"
  />
  <!--<div v-if="props.isInputError">
  </div>-->
</template>
<style lang="css"></style>
