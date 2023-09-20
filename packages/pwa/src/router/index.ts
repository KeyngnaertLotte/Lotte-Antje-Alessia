import { createRouter, createWebHistory } from 'vue-router'

import useFirebase from '@/composables/useFirebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/festival',
      component: () => import('../views/Festival.vue'),
    },
    {
      path: '/bezoeker',
      component: () => import('../components/wrapper/EventsWrapper.vue'),
      meta: { shouldBeAuthenticated: true},
      children: [
        // {
        //   path: '',
        //   component: () => import('../views/protected/events/Events.vue'),
        // },
        // {
        //   path: 'new',
        //   component: () => import('../views/protected/events/AddEvent.vue'),
        // },
        {
          path: ':eventId',
          component: () => import('../views/protected/bezoeker/Detail.vue'),
        },
      ],
    },

    {
      path: '/auth',
      component: () => import('../components/wrapper/AuthWrap.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../views/auth/Login.vue'),
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { firebaseUser } = useFirebase()

  if (to.meta.shouldBeAuthenticated && !firebaseUser.value) {
    console.log('HACKER')
    next({ path: '/auth/login' })
  } else {
    next()
  }
})

export default router
