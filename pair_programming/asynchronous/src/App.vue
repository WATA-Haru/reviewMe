<script setup lang="ts">
import { ref } from 'vue'
const baseURL: string = 'https://pokeapi.co/api/v2/pokemon/'
const pokeNum:Ref<number> = ref(1);
const pokemonImgURL:Ref<string> = ref('');

const getPokeData = async function (
  baseURL: string,
  pokeNum: Ref<number>,
): Promise<object> {
  const response = await fetch(baseURL + pokeNum.value.toString())
  const data = await response.json()
  console.log(data)
  console.log(data.sprites.front_shiny)
  pokemonImgURL.value = data.sprites.front_shiny;
  return data
}

getPokeData(baseURL, pokeNum);

/* const incrementNum = ():void => {
  pokeNum.value++;
  const responseData = getPokeData(baseURL, pokeNum)
  pokemonImgURL.value = responseData.sprites.front_shiny
}
 */
</script>

<template>
  <h1>hoge</h1>
  <h2>huga</h2>
  <!-- <button @click="incrementNum">Next</button> -->
  <div class="wrapper">
    <img :src="pokemonImgURL" class="pokemonImg"/>
  </div>
</template>

<style scoped>
.polemonImg {
  width:500px;
  height:500px;
}

</style>
