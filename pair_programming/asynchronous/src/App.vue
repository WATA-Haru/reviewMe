<script setup lang="ts">
import { ref } from 'vue'
const pokeNum:Ref<number> = ref(0);
const pokemonImgURL:Ref<string> = ref('');
type Pokemon = {name: string, weight: number, image: string};

const getPokeData = async function (
  pokeNum: Ref<number>,
): Promise<object | null> {
  const baseURL: string = 'https://pokeapi.co/api/v2/pokemon/'
  
  try{
    const response = await fetch(baseURL + pokeNum.value.toString());
    if (!response.ok) {
      throw new Error(`response.status=${response.status}, response.statusText = ${response.statusText}`);
    }
    const data = await response.json()
    return data;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

const setNextPokemon = async (): Promise<void> => {
  pokeNum.value++;
  const pokeData = await getPokeData(pokeNum)
  if (!pokeData) {
    return null;
  }
  pokemonImgURL.value = pokeData.sprites.front_shiny
  console.log(pokemonImgURL)
  console.log(pokeData)
  console.log(pokeData.sprites.front_shiny)
  pokemonImgURL.value = pokeData.sprites.front_shiny;
}
</script>

<template>
  <h1>Pokemon</h1>
  <!-- <button @click="incrementNum">Next</button> -->
  <div class="wrapper">
    <button @click="setNextPokemon()">next</button>
    <img :src="pokemonImgURL" width="300px" height="300px"/>
  </div>
</template>

<style scoped>
</style>
