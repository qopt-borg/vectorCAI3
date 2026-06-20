<template>
  <q-card
    flat
    bordered
    class="retro-card q-pa-md"
    :class="estadoClass"
  >
    <div v-if="!mostrar" class="text-grey-7">
      Aquí aparecerá la retroalimentación después de verificar tu respuesta.
    </div>

    <template v-else>
      <div class="retro-titulo q-mb-sm">
        <q-icon
          :name="correcto ? 'check_circle' : 'cancel'"
          size="24px"
          class="q-mr-sm"
        />
        <span>
          {{ correcto ? 'Respuesta correcta' : 'Respuesta incorrecta' }}
        </span>
      </div>

      <div class="retro-pasos">
        <div
          v-for="(paso, i) in desarrollo"
          :key="i"
          class="retro-paso"
        >
          <span class="paso-label">{{ paso.label }}:</span>

          <KatexRender
            v-if="paso.esLatex"
            :tex="paso.valor"
            :block="false"
            class="paso-valor-latex"
          />

          <TextoLatexInline
            v-else
            :contenido="paso.valor"
            class="paso-valor-texto"
          />
        </div>
      </div>
    </template>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import KatexRender from './KatexRender.vue'
import TextoLatexInline from './TextoLatexInline.vue'

const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false
  },
  correcto: {
    type: Boolean,
    default: false
  },
  desarrollo: {
    type: Array,
    default: () => []
  }
})

const estadoClass = computed(() => {
  if (!props.mostrar) return ''
  return props.correcto ? 'retro-correcta' : 'retro-incorrecta'
})
</script>

<style scoped>
.retro-card {
  width: 100%;
  min-height: 180px;
  border-radius: 14px;
  background: #ffffff;
}

.retro-titulo {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.05rem;
}

.retro-pasos {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.retro-paso {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.paso-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #534AB7;
  white-space: nowrap;
}

.paso-valor-latex {
  display: inline;
  font-size: 1rem;
}

.paso-valor-texto {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.retro-correcta {
  border-color: #2e7d32;
  background: #f1f8f4;
}

.retro-correcta .retro-titulo {
  color: #2e7d32;
}

.retro-correcta .paso-label {
  color: #2e7d32;
}

.retro-incorrecta {
  border-color: #c62828;
  background: #fff5f5;
}

.retro-incorrecta .retro-titulo {
  color: #c62828;
}

.retro-incorrecta .paso-label {
  color: #c62828;
}
</style>
