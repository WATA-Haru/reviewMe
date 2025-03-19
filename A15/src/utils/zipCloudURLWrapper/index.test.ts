import { describe, test, expect } from 'vitest'
import { zipCloudURLWrapper } from './index.ts'

describe('zipCloudURLWrapper', () => {
  const base = 'https://zipcloud.ibsnet.co.jp/api/search'

  test(`zipCloudURLWrapperの引数がない場合、${base}が返ってくること`, () => {
    expect(zipCloudURLWrapper()).toBe(base)
  })
  test(`zipCloudURLWrapperに空文字を与えると${base}が返ってくること`, () => {
    expect(zipCloudURLWrapper('')).toBe(base)
  })
  test(`zipCloudURLWrapperの引数に何らかの文字(something)があるとき、${base}somethingが返ってくること`, () => {
    expect(zipCloudURLWrapper('something')).toBe(`${base}something`)
  })
})
