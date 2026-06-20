<template>
  <q-page class="inicio-page flex flex-center">
    <div class="inicio-contenedor">

      <!-- Logo / Título -->
      <div class="inicio-hero">
        <div class="inicio-titulo">VECTOR</div>
        <div class="inicio-subtitulo">Suite de entrenamiento de aritmética vectorial</div>
        <p class="inicio-instruccion">Selecciona el área que deseas entrenar</p>
      </div>

      <!-- Menú de temas en cuadrícula -->
      <div class="menu-grid">
        <div
          v-for="topic in TOPICS"
          :key="topic.id"
          class="menu-card"
          @click="ir(topic.id)"
        >
          <q-icon :name="topic.icon" size="28px" color="primary" />
          <div class="menu-card-title">{{ topic.titulo }}</div>
          <div class="menu-card-desc">{{ topic.subtitulo }}</div>
        </div>
      </div>

      <!-- Créditos -->
      <p class="inicio-creditos">
        FIME Laguna — Universidad Autónoma de Coahuila
      </p>

    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { TOPICS } from 'src/composables/topics'

const router = useRouter()

function ir(id) {
  router.push({ name: 'ejercicio', params: { id } })
}
</script>

<style scoped>
.inicio-page {
  background: #f5f4fc;
  min-height: 100vh;
}

.inicio-contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 40px 20px;
  max-width: 560px;
  width: 100%;
}

.inicio-hero {
  text-align: center;
}

.inicio-titulo {
  font-size: 48px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: #534AB7;
  line-height: 1;
}

.inicio-subtitulo {
  font-size: 15px;
  color: #666;
  margin-top: 8px;
}

.inicio-instruccion {
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}

/* ── GRID DE MENÚ ─────────────────────────────────── */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
}

@media (min-width: 500px) {
  .menu-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.menu-card {
  background: #ffffff;
  border: 0.5px solid rgba(83, 74, 183, 0.15);
  border-radius: 12px;
  padding: 20px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  transition: border-color 0.15s, transform 0.1s, box-shadow 0.15s;
}

.menu-card:hover {
  border-color: #534AB7;
  box-shadow: 0 4px 16px rgba(83, 74, 183, 0.1);
  transform: translateY(-2px);
}

.menu-card:active {
  transform: translateY(0);
}

.menu-card-title {
  font-size: 13px;
  font-weight: 600;
  color: #1a1a2e;
}

.menu-card-desc {
  font-size: 11px;
  color: #999;
  line-height: 1.4;
}

.inicio-creditos {
  font-size: 11px;
  color: #bbb;
  text-align: center;
}
</style>
