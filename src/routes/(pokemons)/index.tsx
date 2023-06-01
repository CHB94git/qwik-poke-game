import { $, component$, useTask$ } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import PokemonImage from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';


export default component$(() => {
  const nav = useNavigate()

  const {
    pokemonId,
    nextPokemon,
    prevPokemon,
    showBackImage,
    showPokemon,
    toggleFlipImage,
    toggleVisibility
  } = usePokemonGame()

  useTask$(({ track }) => {
    track(() => pokemonId.value)
    toggleVisibility(false)
  })

  const goToPokemon = $((idPokemon: number) => {
    nav(`/pokemon/${idPokemon}/`)
  })

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{ pokemonId.value }</span>

      <div onClick$={ () => goToPokemon(pokemonId.value) }>
        <PokemonImage
          id={ pokemonId.value }
          backImage={ showBackImage.value }
          isVisible={ showPokemon.value }
        />
      </div>

      <div class="mt-2">
        <button onClick$={ prevPokemon } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ nextPokemon } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={ toggleFlipImage } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ () => toggleVisibility() } class="btn btn-primary">
          { !showPokemon.value ? 'Revelar' : 'Ocultar' }
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'App PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Mi primera aplicación con Qwik',
    },
  ],
};

// useSignal (Usarlo para datos primitivos) booleans, strings, numbers
// const pokemonId = useSignal(1)
// const showBackImage = useSignal(false)
// const showPokemon = useSignal(false)

{/* <Link href={ `/pokemon/${pokemonId.value}/` }>
  <PokemonImage id={ pokemonId.value } backImage={ showBackImage.value } isVisible={ showPokemon } />
</Link>  */}
