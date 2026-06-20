import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import MainLayout from 'src/layouts/MainLayout.vue'
import InicioPage from 'src/pages/InicioPage.vue'
import EjercicioPage from 'src/pages/EjercicioPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'inicio',
        component: InicioPage
      },
      {
        path: 'ejercicio/:id',
        name: 'ejercicio',
        component: EjercicioPage
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/'
  }
]

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  return Router
})
