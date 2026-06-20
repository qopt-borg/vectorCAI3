<template>
  <q-layout view="lHh LpR lFf">

    <!-- ── HEADER ──────────────────────────────────────────── -->
    <q-header elevated class="app-header">
      <q-toolbar>
        <q-btn
          v-if="$route.name !== 'inicio'"
          flat
          dense
          round
          icon="mdi-menu"
          aria-label="Menú"
          @click="drawer = !drawer"
        />

        <q-toolbar-title>
          <span class="app-logo">VECTOR</span>
          <q-badge
            color="purple-2"
            text-color="purple-8"
            label="v1.0"
            class="q-ml-sm"
          />
        </q-toolbar-title>

        <q-btn
          v-if="$route.name !== 'inicio'"
          flat
          dense
          icon="mdi-home"
          label="Inicio"
          size="sm"
          :to="{ name: 'inicio' }"
        />

        <q-btn
          flat
          dense
          round
          icon="mdi-information-outline"
          aria-label="Acerca de"
          @click="mostrarAcercaDe"
        />
      </q-toolbar>
    </q-header>

    <!-- ── DRAWER (sidebar) ────────────────────────────────── -->
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="220"
      :breakpoint="700"
      bordered
      class="app-drawer"
    >
      <q-scroll-area class="fit">

        <!-- Navegación -->
        <q-list padding>
          <q-item-label header class="section-label">Temas</q-item-label>

          <q-item
            v-for="topic in TOPICS"
            :key="topic.id"
            clickable
            :to="{ name: 'ejercicio', params: { id: topic.id } }"
            :class="{ 'active-nav': $route.params.id === topic.id }"
            exact
          >
            <q-item-section avatar>
              <q-icon :name="topic.icon" size="20px" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ topic.titulo }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <!-- Estadísticas de sesión -->
        <div class="stat-row q-mt-sm">
          <q-item-label header class="section-label">Sesión</q-item-label>

          <div class="stat-item">
            <span>Ejercicios</span>
            <span class="stat-val">{{ stats.total }}</span>
          </div>
          <div class="stat-item">
            <span>Correctos</span>
            <span class="stat-val ok">{{ stats.correctos }}</span>
          </div>
          <div class="stat-item">
            <span>Incorrectos</span>
            <span class="stat-val err">{{ stats.incorrectos }}</span>
          </div>
        </div>

      </q-scroll-area>
    </q-drawer>

    <!-- ── PAGE CONTAINER ─────────────────────────────────── -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useStatsStore } from 'src/stores/stats'
import { TOPICS } from 'src/composables/topics'

const $q     = useQuasar()
const stats  = useStatsStore()
const drawer = ref(false)

function mostrarAcercaDe() {
  $q.dialog({
    title: 'Acerca de VECTOR',
    message:
      'VECTOR 1.0 es una suite de entrenamiento de aritmética vectorial.\n\n' +
      'Desarrollado por el cuerpo académico de Ciencias Aplicadas a la ' +
      'Ingeniería de la FIME Laguna — Universidad Autónoma de Coahuila.',
    ok: { label: 'Cerrar', color: 'primary', flat: true }
  })
}
</script>

<style scoped>
.app-header {
  background: #ffffff;
  color: #1a1a2e;
  border-bottom: 0.5px solid rgba(83, 74, 183, 0.12);
  box-shadow: none !important;
}

.app-logo {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #534AB7;
}

.app-drawer {
  background: #fafaff;
  border-right: 0.5px solid rgba(83, 74, 183, 0.1);
}
</style>
