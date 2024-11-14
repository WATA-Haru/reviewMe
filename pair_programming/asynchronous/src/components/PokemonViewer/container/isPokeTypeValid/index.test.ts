import { expect, test } from 'vitest'
import { isPokeTypeValid } from '.'

test('Pokemon型を入れたとき、Trueを返すこと', () => {
  const sampleData: Pokemon = {
    id: 0,
    name: 'Something Went Wrong!',
    weight: 0,
    sprites: {
      front_default: '',
      front_shiny: '',
    },
  }
  expect(isPokeTypeValid(sampleData)).toBe(true)
})

test('nullを入れたとき、Falseを返すこと', () => {
  console.log(isPokeTypeValid(null))
  expect(isPokeTypeValid(null)).toBe(false)
})

test('プリミティブな値(-1)を入れたとき、Falseを返すこと', () => {
  console.log(isPokeTypeValid(-1))
  expect(isPokeTypeValid(-1)).toBe(false)
})
