<script setup lang="ts">
import InputFirstHalfPresentational from '@/components/InputFirstHalf/presentational/index.vue'
import { useHalfInput } from '@/components/composables/useHalfInput'

defineOptions({
  name: 'InputFirstHalfContainer',
})
interface Props {
  minLength: number
  maxLength: number
}
interface Emits {
  (event: 'validate-success'): void
  (event: 'validate-error'): void
  (event: 'input-shorter'): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const emitCallBack = (eventName: 'validate-success' | 'validate-error' | 'input-shorter') => {
  if (eventName === 'validate-success') {
    emits('validate-success')
  } else if (eventName === 'validate-error') {
    emits('validate-error')
  } else if (eventName === 'input-shorter') {
    emits('input-shorter')
  }
}

const { textRef, handleCompositionEnd, handleBlur } = useHalfInput(props.minLength, emitCallBack)
</script>
<template>
  <InputFirstHalfPresentational
    :text="textRef"
    @input-blur="handleBlur"
    @input-composition-end="handleCompositionEnd"
    :min-length="props.minLength"
    :max-length="props.maxLength"
  />
</template>
