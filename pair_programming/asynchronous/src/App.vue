<script setup lang="ts">
import { onMounted, shallowRef, type ShallowRef, triggerRef, watch } from 'vue'
import { updatePokeData } from './components/PokemonViewer/container/composables/updatePokeData'
import Button from './components/Button/index.vue'
import PokemonViewerPresentation from './components/PokemonViewer/Presentation/index.vue'

const startPokeId = 9
const notImagePath = '/src/assets/No_Image_Available.jpg'
const shallowPokeDataRef: ShallowRef<Pokemon> = shallowRef({
  id: startPokeId,
  name: 'Nan',
  weight: 0,
  sprites: {
    front_default: notImagePath,
    front_shiny: notImagePath,
  },
})

watch(
  () => shallowPokeDataRef.value.id,
  () => {
    updatePokeData(shallowPokeDataRef)
  },
)
onMounted(() => {
  updatePokeData(shallowPokeDataRef)
})

const incrementId = () => {
  shallowPokeDataRef.value.id++
  triggerRef(shallowPokeDataRef)
}

const decrementId = () => {
  shallowPokeDataRef.value.id--
  triggerRef(shallowPokeDataRef)
}

document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (!e) {
    return
  } else if (e.key === 'ArrowLeft') {
    decrementId()
  } else if (e.key === 'ArrowRight') {
    incrementId()
  }
})
</script>

<template>
  <main class="main">
    <h1 class="title">Pokemon</h1>
    <PokemonViewerPresentation :poke-data="shallowPokeDataRef" />

    <div class="button-wrapper">
      <Button emitName="prev-pokemon" @prev-pokemon="decrementId">
        prev
      </Button>
      <Button emitName="next-pokemon" @next-pokemon="incrementId">
        Next
      </Button>
    </div>
  </main>
</template>

<style scoped>
.title {
  text-align: center;
}
.button-wrapper {
  display: flex;
  justify-content: center;
}
</style>
