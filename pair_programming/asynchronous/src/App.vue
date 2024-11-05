<script setup lang="ts">
import { reactive, onMounted } from 'vue'
const startPokeNum = 477
interface Pokemon {
  id: number
  name: string
  weight: number
  sprites: {
    front_default: string
    front_shiny: string
  }
}
const pokeData: Pokemon = reactive({
  id: startPokeNum,
  name: '',
  weight: 0,
  sprites: {
    front_default: '',
    front_shiny: '',
  },
})

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

onMounted(() => {
  setNextPokemon()
})

const setNextPokemon = async (): Promise<void> => {
  pokeData.id++
  const response = await getPokeData(pokeData.id)
  if (!response) {
    return null
  }
  if (
    'name' in response &&
    'weight' in response &&
    'sprites' in response
  )
  {
    const {
      name,
      weight,
      sprites
    }  = response as {
        name: string;
        weight: number;
        sprites: { front_default: string, front_shiny: string }
    }
    Object.assign(pokeData, {
      name,
      weight,
      sprites,
    })
  }
}
</script>

<template>
  <h1>Pokemon</h1>
  <!-- <button @click="incrementNum">Next</button> -->
  <div class="wrapper">
    <button @click="setNextPokemon()">next</button>
    <h3>{{ pokeData.name }}</h3>
    <img :src="pokeData.sprites.front_default" width="300px" height="300px" />
  </div>
</template>

<style scoped></style>
