<script setup lang="ts">
import { ref, useTemplateRef, watchEffect } from 'vue'

defineOptions({
  name: 'InputFirstHalfPresentational',
})

interface Props {
  text: string
  minLength: number
  maxLength: number
  goFocus: boolean
}
interface Emits {
  (event: 'input-composition-end', value: string): void
  (event: 'input-blur', value: string): void
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
  emits('input-composition-end', target.value)
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
  emits('input-composition-end', target.value)
}

const handleBlur = (event: Event) => {
  const { target } = event
  if (!(target instanceof HTMLInputElement)) {
    return
  }
  emits('input-blur', target.value)
}

const secondInput = useTemplateRef('second-input')

watchEffect(() => {
  if (secondInput.value) {
    if (props.goFocus) {
      secondInput.value.focus()
    }
  } else {
    return
  }
})
</script>
<template>
  <input
    ref="second-input"
    type="text"
    :value="props.text"
    :maxlength="props.maxLength"
    :minlength="props.minLength"
    @input="(event: Event) => handleInput(event)"
    @compositionstart="activateIsComposition()"
    @compositionend="(event: Event) => handleCompositionEnd(event)"
    @blur="(event: Event) => handleBlur(event)"
  />
</template>
