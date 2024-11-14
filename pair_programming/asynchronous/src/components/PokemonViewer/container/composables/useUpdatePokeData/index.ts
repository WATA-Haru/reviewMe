import type { Ref } from 'vue'
import { START_POKE_ID } from '@/const/constValues'
import { ref, onMounted, watch } from 'vue'
import { getPokeData } from '../../getPokeData'
import { isPokeTypeValid } from '../../isPokeTypeValid'

/**
 *
 * @description pokeDataを受け取り、fetchしたPokeDataをセットする
 */
const setFetchPokeData = async (pokeDataRef: Ref<Pokemon>) => {
  const response = await getPokeData(pokeDataRef.value.id)
  if (!response) {
    console.error('Failed to fetch Pokemon Data')
  }
  if (!isPokeTypeValid(response)) {
    return
  }
  pokeDataRef.value = response
}

// pokeDataRefはuseUpdatePokeDataの中で管理(副作用)
export const useUpdatePokeData = (): {
  pokeDataRef: Ref<Pokemon>
  decrementRefID: () => void
  incrementRefID: () => void
} => {
  // define PokeData as closure
  const pokeDataRef: Ref<Pokemon> = ref({
    id: START_POKE_ID,
    name: 'Nan',
    weight: 0,
    sprites: {
      front_default: '',
      front_shiny: '',
    },
  })

  const decrementRefID = () => {
    pokeDataRef.value.id--
  }

  const incrementRefID = () => {
    pokeDataRef.value.id++
  }

  onMounted(() => {
    setFetchPokeData(pokeDataRef)
  })

  watch(
    () => pokeDataRef.value.id,
    () => {
      setFetchPokeData(pokeDataRef)
    },
  )

  return {
    pokeDataRef,
    decrementRefID,
    incrementRefID,
  }
}
