import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/temp',
      component: () => import('../views/Temp.vue'),
    },
    {
      path: '/festival',
      component: () => import('../views/Festival.vue'),
    },
    {
      path: '/events',
      component: () => import('../views/EventsWrapper.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/Events.vue'),
        },
        {
          path: 'new',
          component: () => import('../views/AddEvent.vue'),
        },
        {
          path: ':id',
          component: () => import('../views/Event.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
