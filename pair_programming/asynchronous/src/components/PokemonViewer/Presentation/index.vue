<script setup lang="ts">
const props = defineProps<{
  pokeData: Pokemon
}>()
</script>

<template>
  <div class="wrapper">
    <h3>Name: {{ props.pokeData.name }}</h3>
    <h3>Number: {{ props.pokeData.id }}</h3>
    <img
      :src="props.pokeData.sprites.front_default"
      width="300px"
      height="300px"
    />
  </div>
</template>

<style lang="css" scoped>
.wrapper {
  text-align: center;
}
</style>
