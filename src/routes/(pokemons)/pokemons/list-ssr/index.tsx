import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik'
import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city'
import PokemonImage from '~/components/pokemons/pokemon-image'
import { Modal } from '~/components/shared'
import { getPokemonInfoByChatGpt } from '~/helpers/get-open-ai-response'
import { getSmallPokemons } from '~/helpers/get-small-pokemons'
import type { SmallPokemon } from '~/interfaces'

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset') || '0')
    if (isNaN(offset)) redirect(301, pathname)
    if (offset < 0) redirect(301, pathname)
    return getSmallPokemons(offset)
  }
)

export default component$(() => {
  const pokemons = usePokemonList()
  const location = useLocation()

  const modalVisible = useSignal(false)

  const modalPokemonInfo = useStore({
    id: '',
    name: '',
    openAIResponse: '',
  })

  const showModal = $((id: string, name: string) => {
    modalPokemonInfo.id = id
    modalPokemonInfo.name = name
    modalVisible.value = true
  })

  const closeModal = $(() => {
    modalVisible.value = false
  })

  const currentOffset = useComputed$<number>(() => {
    const offset = new URLSearchParams(location.url.search)
    return Number(offset.get('offset') || '0')
  })

  useVisibleTask$(({ track }) => {
    track(() => modalPokemonInfo.name)
    modalPokemonInfo.openAIResponse = ''

    if (modalPokemonInfo.name.length > 0)
      getPokemonInfoByChatGpt(modalPokemonInfo.name)
        .then((response) => (modalPokemonInfo.openAIResponse = response))
        .catch(console.error)
  })

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: { currentOffset } </span>
        <span>
          Está cargando página: { location.isNavigating ? 'Si' : 'No' }{ ' ' }
        </span>
      </div>

      <div class="mt-10">
        <Link
          href={ `/pokemons/list-ssr/?offset=${currentOffset.value - 10}` }
          class="btn btn-primary mr-2"
        >
          Anteriores
        </Link>
        <Link
          href={ `/pokemons/list-ssr/?offset=${currentOffset.value + 10}` }
          class="btn btn-primary mr-2"
        >
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        { pokemons.value.map(({ name, id }) => (
          <div
            key={ name }
            onClick$={ () => showModal(id, name) }
            class="m-5 flex flex-col-justify-center items-center"
          >
            <PokemonImage id={ Number(id) } isVisible />
            <span class="capitalize">{ name }</span>
          </div>
        )) }
      </div>

      <Modal showModal={ modalVisible.value } closeFn={ closeModal } persistent>
        <div q:slot="title">{ modalPokemonInfo.name }</div>
        <div q:slot="content" class="flex flex-col justify-center items-center">
          <PokemonImage id={ Number(modalPokemonInfo.id) } isVisible />
          <span>
            { modalPokemonInfo.openAIResponse === ''
              ? 'Consultando a ChatGPT sobre más info...'
              : modalPokemonInfo.openAIResponse }
          </span>
        </div>
      </Modal>
    </>
  )
})

export const head: DocumentHead = {
  title: 'SSR list server',
}

// const offset = location.url.searchParams.get('offset')
