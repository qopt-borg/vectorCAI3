import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStatsStore = defineStore('stats', () => {
  const total     = ref(0)
  const correctos = ref(0)
  const incorrectos = ref(0)

  function registrar(esCorrecto) {
    total.value++
    if (esCorrecto) correctos.value++
    else incorrectos.value++
  }

  function reset() {
    total.value     = 0
    correctos.value = 0
    incorrectos.value = 0
  }

  return { total, correctos, incorrectos, registrar, reset }
})
