type Pokemon = {
  id: number
  name: string
  weight: number
  sprites: Sprites
}

interface Sprites {
  front_default: string
  front_shiny: string
}
