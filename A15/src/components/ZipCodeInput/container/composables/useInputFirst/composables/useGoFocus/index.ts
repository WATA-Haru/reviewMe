import { ref } from 'vue'

/**
 *
 * @description
 *  goFocusの状態の保持と管理の役割を持つ
 *
 *  戻り値
 *  1. Focusの状態を格納するrefを返す
 *  2. goFocusの状態を切り替える関数2つを返す
 *     - activateGoFocus: goFocusの状態をtrueにする
 *     - deactivateGoFocus: goFocusの状態をfalseにする
 */
export const useGoFocus = () => {
  const goFocusRef = ref(false)

  const activateGoFocus = () => {
    goFocusRef.value = true
  }

  const deactivateGoFocus = () => {
    goFocusRef.value = false
  }

  return {
    goFocusRef,
    activateGoFocus,
    deactivateGoFocus,
  }
}
