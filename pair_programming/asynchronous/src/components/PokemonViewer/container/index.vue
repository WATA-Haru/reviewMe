<script setup lang="ts">
import { onMounted, shallowRef, type ShallowRef, triggerRef, watch } from 'vue'
import { updatePokeData } from './composables/updatePokeData'
import PokemonViewerPresentation from '@/components/PokemonViewer/presentation/index.vue'

defineOptions({
  name: 'PokemonViewerContainer',
})

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
    <PokemonViewerPresentation
      :poke-data="shallowPokeDataRef"
      @prev-pokemon="decrementId"
      @next-pokemon="incrementId"
    />
  </main>
</template>
