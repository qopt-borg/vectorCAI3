<template>
  <div class="vector-chip">
    <KatexRender :tex="latex" />
  </div>
</template>

<script setup>
/**
 * VectorChip — muestra un vector como expresión LaTeX dentro de un chip.
 * Equivalente visual de gui_vector_latex() en gui_utils.py
 *
 * Props:
 *   nombre — letra del vector ('A', 'B', etc.)
 *   v      — arreglo [x, y, z]
 */
import KatexRender from './KatexRender.vue'
import { useLatex } from 'src/composables/useLatex'
import { computed }  from 'vue'

const props = defineProps({
  nombre: { type: String, required: true },
  v:      { type: Array,  required: true }
})

const { vecLatex } = useLatex()
const latex = computed(() => vecLatex(props.nombre, props.v))
</script>

<style scoped>
.vector-chip {
  background: #EEEDFE;
  border: 0.5px solid #AFA9EC;
  border-radius: 8px;
  padding: 8px 18px;
  display: inline-flex;
  align-items: center;
  font-size: 15px;
}
</style>
