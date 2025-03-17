<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'ZipCodeInputPresentational',
})

interface Props {
  textFirst: string
  minLengthFirst: number
  maxLengthFirst: number

  textSecond: string
  minLengthSecond: number
  maxLengthSecond: number

  goFocus: boolean
  isInvalidCharacterUsedFirst: boolean
  isShorterThanMinLengthFirst: boolean
  isInvalidCharacterUsedSecond: boolean
  isShorterThanMinLengthSecond: boolean
}
interface Emits {
  (eventName: 'input-first', event: Event): void
  (eventName: 'blur-first', event: Event): void
  (eventName: 'composition-end-first', event: Event): void
  (eventName: 'input-second', event: Event): void
  (eventName: 'blur-second', event: Event): void
  (eventName: 'composition-end-second', event: Event): void
  (eventName: 'reset-go-focus-status'): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const handleInputFirst = (event: Event) => {
  emits('input-first', event)
}

const handleCompositionEndFirst = (event: Event) => {
  emits('composition-end-first', event)
}

const handleBlurFirst = (event: Event) => {
  emits('blur-first', event)
}

const handleInputSecond = (event: Event) => {
  emits('input-second', event)
}

const handleCompositionEndSecond = (event: Event) => {
  emits('composition-end-second', event)
}

const handleBlurSecond = (event: Event) => {
  emits('blur-second', event)
}

const vFocus = {
  updated: (el: HTMLElement) => {
    if (el instanceof HTMLInputElement && props?.goFocus) {
      el.focus()
      emits('reset-go-focus-status')
    }
  },
}

const isSomethingError = computed(
  () =>
    props?.isInvalidCharacterUsedFirst ||
    props?.isShorterThanMinLengthFirst ||
    props?.isInvalidCharacterUsedSecond ||
    props?.isShorterThanMinLengthSecond,
)
</script>
<template>
  <div class="zipcode-input-wrapper">
    〒
    <input
      class="zipcode-input-wrapper__input-first"
      data-testid="input-first"
      type="text"
      :value="props.textFirst"
      :maxlength="props.maxLengthFirst"
      :minlength="props.minLengthFirst"
      @input="(event: Event) => handleInputFirst(event)"
      @compositionend="handleCompositionEndFirst"
      @blur="(event: Event) => handleBlurFirst(event)"
    />
    -
    <input
      v-focus
      type="text"
      class="zipcode-input-wrapper__input-second"
      data-testid="input-second"
      :value="props.textSecond"
      :maxlength="props.maxLengthSecond"
      :minlength="props.minLengthSecond"
      @input="(event: Event) => handleInputSecond(event)"
      @compositionend="handleCompositionEndSecond"
      @blur="(event: Event) => handleBlurSecond(event)"
    />
    <div v-if="isSomethingError" class="error-status" data-testid="error-status">
      <div v-if="props.isInvalidCharacterUsedFirst">
        isInvalidCharacterUsedFirst(全角半角数字以外がある)
      </div>
      <div v-if="props.isShorterThanMinLengthFirst">
        isShorterThanMinLengthFirst(入力文字数がMinLengthより小さい)
      </div>
      <div v-if="props.isInvalidCharacterUsedSecond">
        isInvalidCharacterUsedSecond(全角半角数字以外がある)
      </div>
      <div v-if="props.isShorterThanMinLengthSecond">
        isShorterThanMinLengthSecond(入力文字数がMinLengthより小さい)
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.error-status {
  background-color: #ffa799;
}
</style>
