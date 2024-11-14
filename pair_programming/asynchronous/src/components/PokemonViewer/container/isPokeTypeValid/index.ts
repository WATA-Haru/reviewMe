export const isPokeTypeValid = (value: unknown | Pokemon): value is Pokemon => {
  if (!value) {
    return false
  }
  if (typeof value !== 'object') {
    return false
  }
  // https://typescriptbook.jp/reference/statements/unknown
  const mayBePokemon = value as Record<keyof Pokemon, unknown>
  if (
    typeof mayBePokemon.id === undefined &&
    typeof mayBePokemon.name === undefined &&
    typeof mayBePokemon.weight === undefined &&
    mayBePokemon.sprites &&
    typeof (mayBePokemon.sprites as Sprites).front_default === undefined &&
    typeof (mayBePokemon.sprites as Sprites).front_shiny === undefined
  ) {
    return false
  }
  return true
}
