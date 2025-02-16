import { ref } from 'vue'

export const useGoFocus = () => {
  const goFocusRef = ref(false)

  const resetGoFocusStatus = () => {
    goFocusRef.value = false
  }

  return {
    goFocusRef,
    resetGoFocusStatus,
  }
}
