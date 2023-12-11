<template>
  <div
    class="max-w-screen max-h-screen h-screen bg-custom-orange relative z-1 flex flex-col overflow-hidden md:max-w-1/2 md:absolute md:right-0"
    v-if="isVisible"
  >
    <div class="flex justify-end p-4">
      <button @click="toggleVisibility" class="justify-self-end focus:outline-none focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white">
        <X class="h-14 w-14 stroke-white md:h-10 md:w-10" />
      </button>
    </div>
    <div class="flex justify-center items-center py-12">
      <div class="flex flex-col justify-center items-center w-fit">
        <p class="text-white font-bold text-6xl font-header md:text-4xl">
          Lotantsia
        </p>
        <p
          class="text-white font-bold text-4xl self-end font-header md:text-3xl"
        >
          Festival
        </p>
      </div>
    </div>
    <div class="px-6 py-12">
      <div class="flex flex-col justify-center gap-8">
        <router-link
          v-for="(menuItem, index) in menuList"
          :key="index"
          :to="menuItem.path"
          @click="toggleVisibility"
          class="flex flex-row items-center text-3xl text-white gap-4 font-body md:text-2xl focus:outline-none focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white"
        >
          <component :is="menuItem.icon" class="stroke-white h-6 w-6" />
          {{ menuItem.name }}
        </router-link>
      </div>
    </div>
    <div class="h-full flex justify-center items-end pb-12">
      <button
        @click="logoutUser"
        class="flex flex-row items-center text-3xl text-white gap-4 font-body md:text-2xl focus:outline-none focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white"
      >
        <LogOut class="stroke-white h-8 w-8 transform -scale-x-100" />
        UITLOGGEN
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LayoutDashboard,
  X,
  Clock3,
  Coins,
  LogOut,
  UserPlus,
  PackageOpen,
  Mic2,
  ListTodo,
  ClipboardCheck,
} from 'lucide-vue-next'
import useFirebase from '@/composables/useFirebase'
import { useRouter } from 'vue-router'
import { Plus } from 'lucide-vue-next'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  roleShow: {
    type: String,
    required: true,
  },
})
const emit = defineEmits()
const { logout } = useFirebase()
const { replace } = useRouter()

const roleMenuList = [
  {
    role: 'BEZOEKER',
    menuList: [
      {
        name: 'Dashboard',
        path: '/bezoeker/dashboard',
        icon: LayoutDashboard,
      },
      {
        name: 'Line Up',
        path: '/bezoeker/lineup',
        icon: Clock3,
      },
      {
        name: 'Saldo',
        path: '/bezoeker/saldo',
        icon: Coins,
      },
    ],
  },
  {
    role: 'ARTIEST',
    menuList: [
      {
        name: 'Dashboard',
        path: '/artiest/dashboard',
        icon: LayoutDashboard,
      },
      {
        name: 'Items',
        path: '/artiest/items',
        icon: Plus,
      },
    ],
  },
  {
    role: 'PERSONEEL',
    menuList: [
      {
        name: 'Dashboard',
        path: '/personeel/dashboard',
        icon: LayoutDashboard,
      },
      {
        name: 'Materiaal',
        path: '/personeel/materiaal',
        icon: PackageOpen,
      },
      {
        name: 'Alle taken',
        path: '/personeel/taken',
        icon: ClipboardCheck,
      },
    ],
  },
  {
    role: 'ADMIN',
    menuList: [
      {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: LayoutDashboard,
      },
      {
        name: 'Account aanmaken',
        path: '/admin/account-aanmaken',
        icon: UserPlus,
      },
      {
        name:'Agenda artiesten',
        path: '/admin/artiesten-agenda',
        icon: Mic2,
      },
      {
        name: 'Lijst taken',
        path: '/admin/lijst-taken',
        icon: ListTodo,
      },
    ],
  },
]

const menuList = roleMenuList.find(roleMenu => roleMenu.role === props.roleShow)
  ?.menuList
// console.log('menuList:', menuList)

menuList?.forEach(element => {})

function toggleVisibility() {
  emit('toggle-visibility') // Emit event to toggle visibility
}

const logoutUser = () => {
  logout().then(() => {
    replace({ path: '/' })
  })
}
</script>
