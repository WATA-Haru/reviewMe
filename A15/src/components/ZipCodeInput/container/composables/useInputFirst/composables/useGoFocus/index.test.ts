import { useGoFocus } from './index.ts'
import { describe, test, expect } from 'vitest'

describe('useGoFocus', () => {
  test('goFocusRefの初期値がfalseであること', () => {
    const { goFocusRef } = useGoFocus()
    expect(goFocusRef.value).toBe(false)
  })
  test('activateGoFocusを実行することでgoFocusRefがtrueになること', () => {
    const { goFocusRef, activateGoFocus } = useGoFocus()
    activateGoFocus()
    expect(goFocusRef.value).toBe(true)
  })
  test('deactivateGoFocusを実行することでgoFocusRefがfalseになること', () => {
    const { goFocusRef, deactivateGoFocus } = useGoFocus()
    deactivateGoFocus()
    expect(goFocusRef.value).toBe(false)
  })
})
