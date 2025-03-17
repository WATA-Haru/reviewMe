import { ref } from 'vue'

interface ErrorState {
  tooShort: boolean
  invalid: boolean
}

/**
 *
 * @description
 *  入力欄2のエラー状態の保持と管理の役割を持つ
 *
 *  戻り値
 *  1. 入力欄のエラーの状態を格納するrefを返す
 *  2. 「入力文字数」と「不正な入力」の2つのエラー状態を切り替える関数4つを返す
 *      - markShort: 入力文字数が小さいエラーをtrue(有効)にする
 *      - unmarkShort: 入力文字数が小さいエラーをfalse(無効)にする
 *      - markInvalid: 入力が不正なエラーをtrue(有効)にする
 *      - unmarkInvalid: 入力が不正なエラーをfalse(無効)にする
 */
export const useErrorSecond = () => {
  const errorRefSecond = ref<ErrorState>({
    tooShort: false,
    invalid: false,
  })

  const setTooShortError = (value: boolean) => {
    errorRefSecond.value.tooShort = value
  }

  const setInvalidError = (value: boolean) => {
    errorRefSecond.value.invalid = value
  }

  const markShort = () => setTooShortError(true)
  const unmarkShort = () => setTooShortError(false)
  const markInvalid = () => setInvalidError(true)
  const unmarkInvalid = () => setInvalidError(false)

  return {
    errorRefSecond,
    markShort,
    unmarkShort,
    unmarkInvalid,
    markInvalid,
  }
}
