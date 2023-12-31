import { createRouter, createWebHistory } from 'vue-router'

import useFirebase from '@/composables/useFirebase'
import useCustomUser from '@/composables/useCustomUser'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
    },

    {
      path: '/bezoeker',
      component: () => import('../components/wrapper/AccountWrap.vue'),
      meta: { shouldBeAuthenticated: true, allowedRole: 'bezoeker' },
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/protected/bezoeker/Dashboard.vue'),
        },
        {
          path: 'lineup',
          component: () => import('../views/protected/bezoeker/LineUp.vue'),
        },
        {
          path: 'saldo',
          component: () => import('../views/protected/bezoeker/MyCoins.vue'),
        },
      ],
    },

    {
      path: '/artiest',
      component: () => import('../components/wrapper/AccountWrap.vue'),
      meta: { shouldBeAuthenticated: true, allowedRole: 'artiest' },
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/protected/artiest/Dashboard.vue'),
        },
        {
          path: 'items',
          component: () => import('../views/protected/artiest/Items.vue'),
        },
      ],
    },

    {
      path: '/personeel',
      component: () => import('../components/wrapper/AccountWrap.vue'),
      meta: { shouldBeAuthenticated: true, allowedRole: 'personeel' },
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/protected/personeel/Dashboard.vue'),
        },
        {
          path: 'materiaal',
          component: () => import('../views/protected/personeel/Materiaal.vue'),
        },
        {
          path: 'taken',
          component: () => import('../views/protected/personeel/Taken.vue'),
        },
      ],
    },

    {
      path: '/admin',
      component: () => import('../components/wrapper/AccountWrap.vue'),
      meta: { shouldBeAuthenticated: true, allowedRole: 'admin' },
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/protected/admin/Dashboard.vue'),
        },
        {
          path: 'account-aanmaken',
          component: () => import('../views/protected/admin/AddAccount.vue'),
        },
        {
          path: 'artiesten-agenda',
          component: () => import('../views/protected/admin/ArtistsAgendas.vue'),
        },
        {
          path: 'lijst-taken',
          component: () => import('../views/protected/admin/AllTasks.vue'),
        }
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
  const { customUser } = useCustomUser()

  const role = customUser.value?.role.toLowerCase()
  // console.log('inlog rol: ', role)
  // console.log(to.meta.allowedRole)

  if (to.meta.shouldBeAuthenticated && !firebaseUser.value) {
    next({ path: '/auth/login' })
  }
  if (to.meta.allowedRole && to.meta.allowedRole !== role) {
    next({ path: '/:pathMatch(.*)*' })
  }
  if (to.meta.preventLoggedIn && firebaseUser.value) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
