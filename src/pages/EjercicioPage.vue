<template>
  <q-page class="ejercicio-page">
    <div class="ejercicio-container" v-if="topic">

      <!-- ── HEADER DEL EJERCICIO ──────────────────────────── -->
      <div class="ex-header">
        <div>
          <h1 class="ex-titulo">{{ topic.titulo }}</h1>
          <p class="ex-subtitulo">{{ topic.subtitulo }}</p>
        </div>
      </div>

      <!-- ── CUERPO: 2 COLUMNAS ────────────────────────────── -->
      <div class="ex-cols">

        <!-- COLUMNA IZQUIERDA: TEORÍA ──────────────────────── -->
        <div class="col-left">
          <q-card flat bordered class="v-card">
            <q-card-section>
              <div class="section-label">Marco teórico</div>

              <template v-for="(bloque, i) in topic.teoria" :key="i">
                <TextoLatexInline
                  v-if="bloque.tipo === 'texto'"
                  :contenido="bloque.contenido"
                />

                <div v-else class="katex-block">
                  <KatexRender :tex="bloque.contenido" :block="true" />
                </div>
              </template>
            </q-card-section>
          </q-card>
        </div>

        <!-- COLUMNA DERECHA ─────────────────────────────────── -->
        <div class="col-right">

          <!-- CARD EJERCICIO -->
          <q-card flat bordered class="v-card">
            <q-card-section>
              <div class="section-label">Ejercicio</div>

              <p class="teoria-text">{{ topic.enunciado }}</p>

              <!-- Vectores -->
              <div class="vectores-row">
                <VectorChip
                  v-for="(vec, i) in vectores"
                  :key="i"
                  :nombre="nombreVec(i)"
                  :v="vec"
                />
              </div>

              <!-- Inputs: tipo vector (i, j, k) -->
              <div v-if="topic.tipoRespuesta === 'vector'" class="inputs-vector q-mt-md">
                <div class="comp-group">
                  <span class="comp-label">i</span>
                  <q-input
                    v-model.number="respI"
                    type="number"
                    dense
                    outlined
                    class="comp-input"
                    :disable="verificado"
                    @keyup.enter="verificar"
                  />
                </div>
                <span class="comp-sep">+</span>
                <div class="comp-group">
                  <span class="comp-label">j</span>
                  <q-input
                    v-model.number="respJ"
                    type="number"
                    dense
                    outlined
                    class="comp-input"
                    :disable="verificado"
                    @keyup.enter="verificar"
                  />
                </div>
                <span class="comp-sep">+</span>
                <div class="comp-group">
                  <span class="comp-label">k</span>
                  <q-input
                    v-model.number="respK"
                    type="number"
                    dense
                    outlined
                    class="comp-input"
                    :disable="verificado"
                    @keyup.enter="verificar"
                  />
                </div>
              </div>

              <!-- Inputs: tipo scalar -->
              <div v-else class="inputs-scalar q-mt-md">
                <span class="comp-label">Respuesta</span>
                <q-input
                  v-model.number="respEscalar"
                  type="number"
                  step="0.01"
                  dense
                  outlined
                  class="scalar-input"
                  :disable="verificado"
                  @keyup.enter="verificar"
                />
              </div>

              <!-- Botones -->
              <div class="btn-row q-mt-md">
                <q-btn
                  color="primary"
                  label="Verificar"
                  icon="mdi-check"
                  :disable="verificado || !tieneRespuesta"
                  @click="verificar"
                />
                <q-btn
                  flat
                  color="primary"
                  label="Siguiente"
                  icon-right="mdi-arrow-right"
                  @click="siguiente"
                />
              </div>
            </q-card-section>
          </q-card>

          <!-- CARD RETROALIMENTACIÓN -->
          <q-card flat bordered class="v-card q-mt-sm">
            <q-card-section>
              <div class="section-label">Retroalimentación</div>
              <RetroFeedback
                :mostrar="verificado"
                :correcto="esCorrecto"
                :desarrollo="pasos"
              />
            </q-card-section>
          </q-card>

        </div>
      </div>
    </div>

    <!-- Topic no encontrado -->
    <div v-else class="flex flex-center" style="min-height:60vh">
      <div class="text-center">
        <q-icon name="mdi-alert-circle-outline" size="48px" color="negative" />
        <p class="q-mt-md">Ejercicio no encontrado.</p>
        <q-btn flat color="primary" label="Volver al inicio" :to="{ name: 'inicio' }" />
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useStatsStore } from 'src/stores/stats'
import { getTopic } from 'src/composables/topics'
import KatexRender  from 'src/components/KatexRender.vue'
import TextoLatexInline from 'src/components/TextoLatexInline.vue'
import VectorChip   from 'src/components/VectorChip.vue'
import RetroFeedback from 'src/components/RetroFeedback.vue'


const route  = useRoute()
const $q     = useQuasar()
const stats  = useStatsStore()

// ── TOPIC ACTIVO ────────────────────────────────────────────────
const topic = computed(() => getTopic(route.params.id))

// ── ESTADO DEL EJERCICIO ────────────────────────────────────────
const data       = ref({})
const verificado = ref(false)
const esCorrecto = ref(false)
const pasos      = ref([])

// Respuestas
const respI       = ref(null)
const respJ       = ref(null)
const respK       = ref(null)
const respEscalar = ref(null)

// ── VECTORES PARA MOSTRAR ───────────────────────────────────────
const vectores = computed(() => {
  if (!data.value.A) return []
  return data.value.B ? [data.value.A, data.value.B] : [data.value.A]
})

function nombreVec(i) {
  return ['A', 'B'][i]
}

// ── VALIDACIÓN ──────────────────────────────────────────────────
const tieneRespuesta = computed(() => {
  if (!topic.value) return false
  if (topic.value.tipoRespuesta === 'vector') {
    return respI.value !== null && respJ.value !== null && respK.value !== null &&
           respI.value !== '' && respJ.value !== '' && respK.value !== ''
  }
  return respEscalar.value !== null && respEscalar.value !== ''
})

// ── CARGAR EJERCICIO ────────────────────────────────────────────
function cargar() {
  if (!topic.value) return
  data.value   = topic.value.genData()
  verificado.value = false
  esCorrecto.value = false
  pasos.value  = []
  respI.value  = null
  respJ.value  = null
  respK.value  = null
  respEscalar.value = null
}

// ── VERIFICAR ───────────────────────────────────────────────────
function verificar() {
  if (!topic.value || verificado.value) return

  let vals
  if (topic.value.tipoRespuesta === 'vector') {
    vals = [
      parseInt(respI.value),
      parseInt(respJ.value),
      parseInt(respK.value)
    ]
    if (vals.some(isNaN)) {
      $q.notify({ type: 'warning', message: 'Ingresa valores enteros en los tres campos.' })
      return
    }
  } else {
    const v = parseFloat(respEscalar.value)
    if (isNaN(v)) {
      $q.notify({ type: 'warning', message: 'Ingresa un valor numérico válido.' })
      return
    }
    vals = [v]
  }

  esCorrecto.value = topic.value.check(data.value, vals)
  pasos.value      = topic.value.desarrollo(data.value)
  verificado.value = true
  stats.registrar(esCorrecto.value)

  $q.notify({
    type: esCorrecto.value ? 'positive' : 'negative',
    message: esCorrecto.value ? '¡Correcto!' : 'Incorrecto — revisa el desarrollo.',
    position: 'top-right',
    timeout: 1800
  })
}

// ── SIGUIENTE ───────────────────────────────────────────────────
function siguiente() {
  cargar()
}

// ── CICLO DE VIDA ───────────────────────────────────────────────
onMounted(cargar)
watch(() => route.params.id, cargar)
</script>

<style scoped>
.ejercicio-page {
  background: #f5f4fc;
  padding: 20px;
}

.ejercicio-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* HEADER */
.ex-header {
  margin-bottom: 16px;
}
.ex-titulo {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}
.ex-subtitulo {
  font-size: 13px;
  color: #888;
  margin: 4px 0 0;
}

/* COLUMNAS */
.ex-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: start;
}

@media (max-width: 700px) {
  .ex-cols {
    grid-template-columns: 1fr;
  }
}

.col-left, .col-right {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* VECTORES */
.vectores-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  padding: 12px 0;
}

/* INPUTS VECTOR */
.inputs-vector {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.comp-group {
  display: flex;
  align-items: center;
  gap: 6px;
}
.comp-label {
  font-size: 14px;
  font-weight: 500;
  color: #534AB7;
  min-width: 10px;
}
.comp-input {
  width: 72px;
}
.comp-sep {
  font-size: 18px;
  color: #aaa;
}

/* INPUTS SCALAR */
.inputs-scalar {
  display: flex;
  align-items: center;
  gap: 10px;
}
.scalar-input {
  width: 110px;
}

/* BOTONES */
.btn-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
