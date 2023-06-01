import type { PokemonListResponse, SmallPokemon } from '~/interfaces'

export const getSmallPokemons = async (offset: number = 0, limit: number = 10): Promise<SmallPokemon[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data = await response.json() as PokemonListResponse

  return data.results.map(({ url, name }) => {
    const idPokemon = url.split('/').at(-2)!
    return {
      id: idPokemon,
      name
    }
  })
} 