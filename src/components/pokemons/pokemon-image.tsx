import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik';

interface PokemonImageProps {
  id: number
  size?: number
  backImage?: boolean
  isVisible?: boolean
}

const PokemonImage = component$(({ id, size = 100, backImage = false, isVisible = false }: PokemonImageProps) => {
  const imageLoaded = useSignal(false);

  useTask$(({ track }) => {
    track(() => id)
    imageLoaded.value = false
  })

  const imageUrl = useComputed$(() => (backImage)
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  )

  return (
    <div class="flex items-center justify-center" style={ { width: `${size}px`, height: `${size}px` } }>
      { !imageLoaded.value && (<span>Cargando...</span>) }
      {/* Si imageLoaded.value es false, la expresión se evalúa como true, se renderiza en ese caso, y Si imageLoaded.value es true, el elemento no se renderiza.  */ }
      <img
        src={ imageUrl.value }
        alt="Pokemon sprite"
        style={ { width: `${size}px` } }
        onLoad$={ () => { imageLoaded.value = true } }
        class={ [{
          'hidden': !imageLoaded.value, // true
          'brightness-0': !isVisible // true
        }, 'transition-all'] }
      /* Si imageLoaded.value es true, la clase no se aplica; si imageLoaded.value es false, la clase se aplica. */
      />
    </div>
  )
})

export default PokemonImage

// onLoad$={ () => {
//   setTimeout(() => {
//   imageLoaded.value = true
//   }, 500)
// } }