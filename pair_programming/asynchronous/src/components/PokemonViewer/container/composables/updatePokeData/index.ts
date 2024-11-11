import { type ShallowRef } from 'vue'
import { getPokeData } from '../getPokeData/index'
import { isPokeTypeValid } from '../isPokeTypeValid/index'

export const updatePokeData = async (
  shallowPokeDataRef: ShallowRef<Pokemon>,
  errorPokeData = defaultErrorPokeData,
): Promise<void> => {
  const response = await getPokeData(shallowPokeDataRef.value.id)
  if (!isPokeTypeValid(response)) {
    shallowPokeDataRef.value = errorPokeData
    return
  }
  shallowPokeDataRef.value = response
}

const canNotGetImagePath = '/src/assets/canNotGetImage.jpg'
const defaultErrorPokeData: Pokemon = {
  id: 0,
  name: 'Something Went Wrong!',
  weight: 0,
  sprites: {
    front_default: canNotGetImagePath,
    front_shiny: canNotGetImagePath,
  },
}
