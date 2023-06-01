import { createContextId } from '@builder.io/qwik';

export interface PokemonGameState {
  pokemonId: number;
  showBackImage: boolean;
  showPokemon: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context');