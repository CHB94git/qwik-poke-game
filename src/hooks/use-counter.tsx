import { $, useComputed$, useSignal } from '@builder.io/qwik'


export const useCounter = (initialValue: number) => {

  const counter = useSignal(initialValue)

  const increase = $(() => {
    counter.value++
  })

  const decrease = $(() => {
    if (counter.value === 0) return
    counter.value--
  })


  return {
    counter: useComputed$(() => counter.value),

    increase,
    decrease,
  }
}