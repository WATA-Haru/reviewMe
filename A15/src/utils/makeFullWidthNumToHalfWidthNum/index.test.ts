import { describe, test, expect } from 'vitest'
import { makeFullWidthNumToHalfWidthNum } from './index.ts'

describe('makeFullWidthNumToHalfWidthNum', () => {
  test(`'１'を渡したとき、'1'が返ること`, () => {
    expect(makeFullWidthNumToHalfWidthNum('０')).toBe('0')
  })
  test(`'０１２'を渡したとき、'012'が返ることと`, () => {
    expect(makeFullWidthNumToHalfWidthNum('０１２')).toBe('012')
  })
  test(`'1a１'を渡したとき、'1a1'が返ることと`, () => {
    expect(makeFullWidthNumToHalfWidthNum('１a1')).toBe('1a1')
  })
})
