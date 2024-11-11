<script setup lang="ts">
import axios from 'axios'
import { onMounted, shallowRef, type ShallowRef, triggerRef, watch } from 'vue'
import Button from './components/Button.vue'

type Pokemon = {
  id: number
  name: string
  weight: number
  sprites: Sprites
}

interface Sprites {
  front_default: string
  front_shiny: string
}

const startPokeId = 9
const notImagePath = '/src/assets/No_Image_Available.jpg'
const canNotGetImagePath = '/src/assets/canNotGetImage.jpg'
const shallowPokeDataRef: ShallowRef<Pokemon> = shallowRef({
  id: startPokeId,
  name: 'Nan',
  weight: 0,
  sprites: {
    front_default: notImagePath,
    front_shiny: notImagePath,
  },
})

const errorPokeData: Pokemon = {
  id: 0,
  name: 'Something Went Wrong!',
  weight: 0,
  sprites: {
    front_default: canNotGetImagePath,
    front_shiny: canNotGetImagePath,
  },
}

const getPokeData = async function (pokeNum: number): Promise<object | null> {
  const baseURL: string = 'https://pokeapi.co/api/v2/pokemon/'

  try {
    const response = await fetch(baseURL + pokeNum.toString())
    if (!response.ok) {
      throw new Error(
        `response.status=${response.status}, response.statusText = ${response.statusText}`,
      )
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const isPokeTypeValid = (value: unknown | Pokemon): value is Pokemon => {
  if (typeof value !== 'object') {
    return false
  }
  // https://typescriptbook.jp/reference/statements/unknown
  const mayBePokemon = value as Record<keyof Pokemon, unknown>
  if (
    typeof mayBePokemon.id === undefined &&
    typeof mayBePokemon.name === undefined &&
    typeof mayBePokemon.weight === undefined &&
    mayBePokemon.sprites &&
    typeof (mayBePokemon.sprites as Sprites).front_default === undefined &&
    typeof (mayBePokemon.sprites as Sprites).front_shiny === undefined
  ) {
    return false
  }
  return true
}

const isValid = (response: unknown): response is Pokemon => {
  if (!response) {
    return false
  }
  if (!isPokeTypeValid) {
    return false
  }
  return true
}

const setPokemon = async (): Promise<void> => {
  const response = await getPokeData(shallowPokeDataRef.value.id)

  // if id is invalid set canNotGetImagePath to imagePath
  if (!isValid(response)) {
    shallowPokeDataRef.value = errorPokeData
    return
  }
  shallowPokeDataRef.value = response
}

watch(
  () => shallowPokeDataRef.value.id,
  () => {
    setPokemon()
  },
)
onMounted(() => {
  setPokemon()
})

const incrementNum = () => {
  shallowPokeDataRef.value.id++
  triggerRef(shallowPokeDataRef)
}
const decrementNum = () => {
  shallowPokeDataRef.value.id--
  triggerRef(shallowPokeDataRef)
}
</script>

<template>
  <h1>Pokemon</h1>
  <div class="wrapper">
    <Button emitName="prev-pokemon" @prev-pokemon="decrementNum"> prev </Button>
    <Button emitName="next-pokemon" @next-pokemon="incrementNum"> Next </Button>

    <h3>Name: {{ shallowPokeDataRef.name }}</h3>
    <h3>Number: {{ shallowPokeDataRef.id }}</h3>
    <img
      :src="shallowPokeDataRef.sprites.front_default"
      width="300px"
      height="300px"
    />
  </div>
</template>

<style scoped></style>
