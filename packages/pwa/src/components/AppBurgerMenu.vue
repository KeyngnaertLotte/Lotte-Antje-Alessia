<template>
  <div
    class="max-w-screen max-h-screen h-screen bg-[#D5573B] relative z-1 flex flex-col overflow-hidden"
    v-if="isVisible"
  >
    <div class="flex justify-end p-4">
      <button @click="toggleVisibility" class="justify-self-end">
        <X class="h-14 w-14 stroke-white" />
      </button>
    </div>
    <div class="flex justify-center items-center py-12">
      <div class="flex flex-col justify-center items-center w-fit">
        <p class="text-white font-bold text-6xl font-header">Lotantsia</p>
        <p class="text-white font-bold text-4xl self-end font-header">
          Festival
        </p>
      </div>
    </div>
    <div class="px-6 py-12">
      <div class="flex flex-col justify-center gap-8">
        <router-link
          v-for="(menuItem, index) in menuList" :key="index"
          :to="menuItem.path"
          @click="toggleVisibility"
          class="flex flex-row items-center text-3xl text-white gap-4 font-body"
         >
          <component :is="menuItem.icon"  class="stroke-white h-8 w-8" /> {{ menuItem.name }}
        </router-link>
      </div>
      
    </div>
    <div class="h-full flex justify-center items-end pb-12">
      <button
        @click="logoutUser"
        class="flex flex-row items-center text-3xl text-white gap-4 font-body"
      >
        <LogOut class="stroke-white h-8 w-8 transform -scale-x-100" />
        UITLOGGEN
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutDashboard , X, Clock3, MapPin, Coins, LogOut, PlusCircle, PackageOpen } from 'lucide-vue-next'
import useFirebase from '@/composables/useFirebase'
import { useRouter } from 'vue-router'
import { Plus } from 'lucide-vue-next';

const props = defineProps(
  {
    isVisible: {
      type: Boolean,
      required: true,
    },
    roleShow: {
      type: String,
      required: true,
    },
  },
)
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
      }
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
        icon: PlusCircle,
      }
    ],
  }
]

const menuList = roleMenuList.find((roleMenu) => roleMenu.role === props.roleShow)?.menuList
// console.log('menuList:', menuList)

menuList?.forEach(element => {
  
  
});

function toggleVisibility() {
  emit('toggle-visibility') // Emit event to toggle visibility
}

const logoutUser = () => {
  logout().then(() => {
    replace({ path: '/' })
  })
}
</script>
