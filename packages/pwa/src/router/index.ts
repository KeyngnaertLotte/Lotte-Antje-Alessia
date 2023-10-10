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
      path: '/account',
      component: () => import('../views/Account.vue'),
    },
    {
      path: '/festival',
      component: () => import('../views/Festival.vue'),
    },

    {
      path: '/artiest',
      component: () =>import('../views/protected/artiest/index.vue'),
    },
    {
      path: '/bezoeker',
      component: () =>import('../views/protected/bezoeker/Dashboard.vue'),
    },

    {
      path: '/artiest/dashboard',
      component: () =>import('../views/protected/artiest/dashboard.vue'),
    },

    {
      path: '/bezoeker',
      component: () => import('../components/wrapper/EventsWrapper.vue'),
      meta: { shouldBeAuthenticated: true },
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
      path: '/personeel',
      component: () => import('../views/protected/personeel/index.vue'),
    },
    {
      path: '/auth',
      component: () => import('../components/wrapper/AuthWrap.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../views/auth/Login.vue'),
        },
        {
          path: 'register',
          component: () => import('../views/auth/Register.vue'),
        },
        {
          path: 'forgot-password',
          component: () => import('../views/auth/ForgotPassword.vue'),
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
    next({ path: '/auth/login' })
  }
  if (to.meta.preventLoggedIn && firebaseUser.value) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
