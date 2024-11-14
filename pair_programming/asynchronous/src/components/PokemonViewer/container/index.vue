<script setup lang="ts">
import { useUpdatePokeData } from './composables/useUpdatePokeData'
import PokemonViewerPresentation from '@/components/PokemonViewer/presentation/index.vue'

defineOptions({
  name: 'PokemonViewerContainer',
})

const { pokeDataRef, decrementRefID, incrementRefID } = useUpdatePokeData()
</script>

<template>
  <main class="main">
    <PokemonViewerPresentation
      :poke-data="pokeDataRef"
      @prev-pokemon="decrementRefID"
      @next-pokemon="incrementRefID"
    />
  </main>
</template>
