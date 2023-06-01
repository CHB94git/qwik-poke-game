import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import PokemonImage from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';


export default component$(() => {
  const pokemonState = useContext(PokemonListContext)

  // useTask$ Se ejecuta en el servidor y se reanuda en el cliente
  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 30, 30);
    if (Object.values(pokemons).some(pokemon => pokemonState.pokemons.some(p => p.id === pokemon.id))) return;
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  })

  useOnDocument('scroll', $(() => {
    const maxScroll = document.body.scrollHeight
    const currentScroll = window.scrollY + window.innerHeight

    if ((currentScroll + 200) >= maxScroll && !pokemonState.isLoading) {
      pokemonState.isLoading = true
      pokemonState.currentPage++
    }
  }))

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Página actual: { pokemonState.currentPage } </span>
        <span>Está cargando: { pokemonState.isLoading ? 'Yes' : 'No' }  </span>
      </div>

      <div class="mt-10">
        <button onClick$={ () => pokemonState.currentPage-- }
          class="btn btn-primary mr-2">
          Anteriores
        </button>
        <button onClick$={ () => pokemonState.currentPage++ }
          class="btn btn-primary mr-2">
          Siguientes
        </button>
      </div>

      <div class="grid sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-8 mt-5">
        {
          pokemonState.pokemons.map(({ name, id }) => (
            <div key={ id } class="m-5 flex flex-col-justify-center items-center">
              <PokemonImage
                id={ Number(id) }
                isVisible
              />
              <span class="capitalize">
                { name }
              </span>
            </div>
          ))
        }
      </div>
    </>
  )
});

export const head: DocumentHead = {
  title: "CSR list client",
};

// useVisibleTask => Solo se ejecuta en el lado del cliente (Browser)
/* useVisibleTask$(async ({ track }) => {
  track(() => pokemonState.currentPage)
  const pokemons = await getSmallPokemons(pokemonState.currentPage * 10)
  pokemonState.pokemons = pokemons
  console.log(pokemons)
}) */

// interface PokemonState {
//   currentPage: number
//   isLoading: boolean
//   pokemons: SmallPokemon[]
// }

// const pokemonState = useStore<PokemonState>({
  //   currentPage: 0,
  //   isLoading: false,
  //   pokemons: []
  // })

    // if (Object.values(pokemons).every(pokemon => pokemonState.pokemons.some(p => p.id === pokemon.id))) return;
