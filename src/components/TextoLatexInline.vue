<template>
  <p class="teoria-text texto-latex-inline">
    <template
      v-for="(parte, index) in partes"
      :key="index"
    >
      <span v-if="parte.tipo === 'texto'">
        {{ parte.contenido }}
      </span>

      <KatexRender
        v-else
        class="latex-inline"
        :tex="parte.contenido"
        :block="false"
      />
    </template>
  </p>
</template>

<script setup>
import { computed } from 'vue'
import KatexRender from 'src/components/KatexRender.vue'

const props = defineProps({
  contenido: {
    type: String,
    required: true
  }
})

function normalizarLatex(latex) {
  // Ayuda con el error común de escribir '$\mathbf{A}$' en lugar de
  // '$\\mathbf{A}$' dentro de strings JavaScript. En JS, '\b' se convierte
  // en un caracter de retroceso; esta línea recupera '\mathbf'.
  return latex
    .replace(/\u0008f/g, '\\mathbf')
    .replace(/\u0008/g, '\\b')
}

const partes = computed(() => {
  const texto = props.contenido ?? ''
  const resultado = []

  // Soporta dos formas inline:
  //   $\\mathbf{A}$
  //   \\(\\mathbf{A}\\)
  const regex = /(\$[^$]+\$|\\\([\s\S]+?\\\))/g

  let ultimoIndice = 0
  let coincidencia

  while ((coincidencia = regex.exec(texto)) !== null) {
    const inicio = coincidencia.index
    const fin = regex.lastIndex

    if (inicio > ultimoIndice) {
      resultado.push({
        tipo: 'texto',
        contenido: texto.slice(ultimoIndice, inicio)
      })
    }

    const token = coincidencia[0]
    let latex = ''

    if (token.startsWith('$')) {
      latex = token.slice(1, -1)
    } else {
      latex = token.slice(2, -2)
    }

    resultado.push({
      tipo: 'latex',
      contenido: normalizarLatex(latex.trim())
    })

    ultimoIndice = fin
  }

  if (ultimoIndice < texto.length) {
    resultado.push({
      tipo: 'texto',
      contenido: texto.slice(ultimoIndice)
    })
  }

  return resultado
})
</script>

<style scoped>
.texto-latex-inline {
  margin-bottom: 8px;
}

.latex-inline {
  display: inline;
  vertical-align: baseline;
}
</style>
