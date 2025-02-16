<script setup lang="ts">
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
  (event: 'resetGoFocusStatus'): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const handleInputFirst = (event: Event) => {
  if (!(event instanceof InputEvent)) {
    return
  }
  emits('input-first', event)
}

const handleCompositionEndFirst = (event: Event) => {
  if (!(event instanceof CompositionEvent)) {
    return
  }
  emits('composition-end-first', event)
}

const handleBlurFirst = (event: Event) => {
  if (!(event instanceof FocusEvent)) {
    return
  }
  emits('blur-first', event)
}

const handleInputSecond = (event: Event) => {
  if (!(event instanceof InputEvent)) {
    return
  }
  emits('input-second', event)
}

const handleCompositionEndSecond = (event: Event) => {
  if (!(event instanceof CompositionEvent)) {
    return
  }
  emits('composition-end-second', event)
}

const handleBlurSecond = (event: Event) => {
  if (!(event instanceof FocusEvent)) {
    return
  }
  emits('blur-second', event)
}

const vFocus = {
  updated: (el: HTMLElement) => {
    if (el instanceof HTMLInputElement && props?.goFocus) {
      el.focus()
      emits('resetGoFocusStatus')
    }
  },
}
</script>
<template>
  <div>
    〒
    <input
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
      :value="props.textSecond"
      :maxlength="props.maxLengthSecond"
      :minlength="props.minLengthSecond"
      @input="(event: Event) => handleInputSecond(event)"
      @compositionend="handleCompositionEndSecond"
      @blur="(event: Event) => handleBlurSecond(event)"
    />
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
</template>
