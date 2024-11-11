<script setup lang="ts">
const props = defineProps<{
  pokeData: Pokemon
}>()
const emits = defineEmits(['prev-pokemon', 'next-pokemon'])
const handlePrev = () => emits('prev-pokemon')
const handleNext = () => emits('next-pokemon')
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Pokemon</h1>
    <h3>Name: {{ props.pokeData.name }}</h3>
    <h3>Number: {{ props.pokeData.id }}</h3>
    <img
      :src="props.pokeData.sprites.front_default"
      width="300px"
      height="300px"
    />
    <div class="button-wrapper">
      <button class="prev-button" @click="handlePrev">Prev</button>
      <button class="next-button" @click="handleNext">Next</button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.wrapper {
  text-align: center;
}
.button-wrapper {
  display: flex;
  justify-content: center;
}
.prev-button,
.next-button {
  width: 100px;
  height: 50px;
  border-radius: 30px;
  border: none;
  background-color: #f3f313;
  font-size: 20px;
  margin-inline: 10px;
}
</style>
