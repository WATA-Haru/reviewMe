<script setup lang="ts">
import axios from 'axios';
import { ref, shallowRef, onMounted, type ShallowRef } from 'vue'

type Pokemon = {
  id: number;
  name: string;
  weight: number;
  sprites: Sprites; 
}

interface Sprites {
  front_default:string,
  front_shiny: string
}

const startPokeId = 477;
const notImagePath = '/src/assets/No_Image_Available.jpg';
const canNotGetImagePath = '/src/assets/canNotGetImagePath.jpg';
const shallowPokeDataRef: ShallowRef<Pokemon> = shallowRef({
  id: startPokeId,
  name: 'Nan',
  weight: 0,
  sprites: {
    front_default: notImagePath,
    front_shiny: notImagePath,
  }
});

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
  if (typeof value !== "object") {
    return false;
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
    return false;
  }
  return true;
}

const isValid = (response: unknown): response is Pokemon => {
  if (!response) {
    return false;
  }
  if (!isPokeTypeValid) {
    return false;
  }
  return true;
}

const setPokemon = async (): Promise<void> => {
  const currentId = shallowPokeDataRef.value.id;
  const response = await getPokeData(currentId + 1)

  // if id is invalid set canNotGetImagePath to imagePath
  if (!isValid(response)) {
    shallowPokeDataRef.value.sprites.front_default = canNotGetImagePath;
    shallowPokeDataRef.value.sprites.front_shiny = canNotGetImagePath;
    return
  }
  //set pokeId
  shallowPokeDataRef.value = response;
}
</script>

<template>
  <h1>Pokemon</h1>
  <!-- <button @click="incrementNum">Next</button> -->
  <div class="wrapper">
    <button @click="setPokemon()">next</button>
    <h3>{{ shallowPokeDataRef.name }}</h3>
    <img :src="shallowPokeDataRef.sprites.front_default" width="300px" height="300px" />
  </div>
</template>

<style scoped></style>

