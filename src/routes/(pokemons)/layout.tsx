import { Slot, component$ } from '@builder.io/qwik';
import { PokemonProvider } from '~/components/pokemons/pokemon-provider';
import Footer from '~/components/shared/footer/footer';
import Navbar from '~/components/shared/navbar/navbar';

export default component$(() => {
  return (
    <PokemonProvider>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
      <Footer />
    </PokemonProvider>
  )
});