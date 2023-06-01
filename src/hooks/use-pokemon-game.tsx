import { $, useComputed$, useContext } from '@builder.io/qwik'
import { PokemonGameContext } from '~/context'


export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext)

  // Serializar la función, envolver en $()
  const changePokemonId = $((value: number) => {
    if ((pokemonGame.pokemonId + (value)) <= 0) return
    pokemonGame.pokemonId += value
  })

  const toggleFlipImage = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage
  })

  const toggleVisibility = $((state?: boolean) => {
    pokemonGame.showPokemon = state !== undefined ? state : !pokemonGame.showPokemon
  })

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    showPokemon: useComputed$(() => pokemonGame.showPokemon),

    prevPokemon: $(() => changePokemonId(-1)),
    nextPokemon: $(() => changePokemonId(1)),

    toggleFlipImage,
    toggleVisibility,
  }
}