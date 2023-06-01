import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';

import { PokemonGameContext, PokemonListContext } from '~/context';
import type { PokemonListState, PokemonGameState } from '~/context'


export const PokemonProvider = component$(() => {
  // useStore (signal) Usarlo para objetos, arreglos, elementos complejos
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    showBackImage: false,
    showPokemon: false
  })

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: []
  })

  useContextProvider(PokemonGameContext, pokemonGame)
  useContextProvider(PokemonListContext, pokemonList)

  useVisibleTask$(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('pokemon-game')) {
      const {
        pokemonId,
        showBackImage,
        showPokemon
      } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState

      pokemonGame.pokemonId = pokemonId
      pokemonGame.showBackImage = showBackImage
      pokemonGame.showPokemon = showPokemon
    }
  })

  useVisibleTask$(({ track }) => {
    track(() => [pokemonGame.pokemonId, pokemonGame.showBackImage, pokemonGame.showPokemon])
    if (typeof window !== 'undefined')
      localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
  })

  return (<Slot />)
});