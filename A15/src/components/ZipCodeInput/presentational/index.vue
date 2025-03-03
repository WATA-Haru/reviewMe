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
  (event: 'input-first', EventElement: Readonly<InputEvent>): void
  (event: 'blur-first', EventElement: Readonly<FocusEvent>): void
  (event: 'composition-end-first', EventElement: Readonly<CompositionEvent>): void
  (event: 'input-second', EventElement: Readonly<InputEvent>): void
  (event: 'blur-second', EventElement: Readonly<FocusEvent>): void
  (event: 'composition-end-second', EventElement: Readonly<CompositionEvent>): void
  (event: 'reset-go-focus-status'): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const isTesting = process.env.NODE_ENV === 'test'

const handleInputFirst = (event: Event) => {
  if (!isTesting && !(event instanceof InputEvent)) {
    return
  }
  emits('input-first', event as Readonly<InputEvent>)
}

const handleCompositionEndFirst = (event: Event) => {
  if (!isTesting && !(event instanceof CompositionEvent)) {
    return
  }
  emits('composition-end-first', event as Readonly<CompositionEvent>)
}

const handleBlurFirst = (event: Event) => {
  if (!isTesting && !(event instanceof FocusEvent)) {
    return
  }
  emits('blur-first', event as Readonly<FocusEvent>)
}

const handleInputSecond = (event: Event) => {
  if (!isTesting && !(event instanceof InputEvent)) {
    return
  }
  emits('input-second', event as Readonly<InputEvent>)
}

const handleCompositionEndSecond = (event: Event) => {
  if (!isTesting && !(event instanceof CompositionEvent)) {
    return
  }
  emits('composition-end-second', event as Readonly<CompositionEvent>)
}

const handleBlurSecond = (event: Event) => {
  if (!isTesting && !(event instanceof FocusEvent)) {
    return
  }
  emits('blur-second', event as Readonly<FocusEvent>)
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
      :value="props.textSecond"
      :maxlength="props.maxLengthSecond"
      :minlength="props.minLengthSecond"
      @input="(event: Event) => handleInputSecond(event)"
      @compositionend="handleCompositionEndSecond"
      @blur="(event: Event) => handleBlurSecond(event)"
    />
    <div v-if="isSomethingError" class="error-status">
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
