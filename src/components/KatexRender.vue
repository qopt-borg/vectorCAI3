<template>
  <span
    ref="el"
    :class="block ? 'katex-block' : 'katex-inline'"
  />
</template>

<script setup>
/**
 * KatexRender — renderiza una expresión LaTeX con KaTeX.
 * Reemplaza gui_mostrar_expresion_latex() de gui_utils.py
 *
 * Props:
 *   tex   — cadena LaTeX (sin los signos $)
 *   block — si true, centra en bloque; si false, inline
 */
import { ref, watch, onMounted, getCurrentInstance } from 'vue'

const props = defineProps({
  tex:   { type: String, required: true },
  block: { type: Boolean, default: false }
})

const el = ref(null)
const { proxy } = getCurrentInstance()

function render() {
  if (!el.value) return
  try {
    proxy.$katex.render(props.tex, el.value, {
      throwOnError: false,
      displayMode: props.block
    })
  } catch (e) {
    el.value.textContent = props.tex
  }
}

onMounted(render)
watch(() => props.tex, render)
</script>

<style scoped>
.katex-block {
  display: flex;
  justify-content: center;
  padding: 8px 0;
}
.katex-inline {
  display: inline;
}
</style>
