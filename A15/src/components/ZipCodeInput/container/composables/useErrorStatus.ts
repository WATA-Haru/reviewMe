import { type ErrorStatus } from '../errorStatusType.ts'
import { type Ref, ref } from 'vue'

export const useErrorStatus = () => {
  const errorStatusRef: Ref<ErrorStatus[]> = ref([
    { isShorterThanMinLength: false, isInvalidCharacterUsed: false },
    { isShorterThanMinLength: false, isInvalidCharacterUsed: false },
  ])

  return {
    errorStatusRef,
  }
}
