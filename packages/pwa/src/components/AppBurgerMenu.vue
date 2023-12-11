<template>
  <div
    class="max-w-screen max-h-screen h-screen bg-[#D5573B] relative z-1 flex flex-col overflow-hidden md:max-w-1/2 md:absolute md:right-0"
    v-if="isVisible"
  >
    <div class="flex justify-between p-4">
      <!-- TEST -->
      <div class="h-[80px]">
        <button
          @click="toggleShow(languages)"
          class="m-4 mb-0 p-2 min-w-full border-white border-1 flex justify-between"
        >
          <p class="text-white">
            {{
              $t('navigation.current.language', {
                user: firebaseUser?.displayName,
              })
            }}
          </p>
          <ChevronDown class="stroke-white" />
        </button>
        <transition name="slide-fade">
          <div v-if="isShow(languages)">
            <div>
              <div
                class="m-2 mx-4 mt-0 p-2 flex flex-col justify-between min-w-full"
              >
                <!-- <button class="text-white flex justify-start">{{ otherLang(languages).toString() }}</button> -->
                <button class="text-white flex justify-start" @click="setLanguage(otherLang(languages).toString())">
                  {{ otherLang(languages).toString() }}
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- TEST -->

      <button @click="toggleVisibility" class="justify-self-end">
        <X class="h-14 w-14 stroke-white" />
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
          class="flex flex-row items-center text-3xl text-white gap-4 font-body md:text-2xl"
        >
          <component :is="menuItem.icon" class="stroke-white h-6 w-6" />
          {{ menuItem.name }}
        </router-link>
      </div>
    </div>
    <div class="h-full flex justify-center items-end pb-12">
      <button
        @click="logoutUser"
        class="flex flex-row items-center text-3xl text-white gap-4 font-body md:text-2xl"
      >
        <LogOut class="stroke-white h-8 w-8 transform -scale-x-100" />
        {{ $t('account.log.out', { user: firebaseUser?.displayName }) }}
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
  ChevronDown,
} from 'lucide-vue-next'
import useFirebase from '@/composables/useFirebase'
import { useRouter } from 'vue-router'
import { Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import useCustomUser from '@/composables/useCustomUser'
import { SET_USER_LOCALE } from '@/graphql/user.mutation'
import { useMutation } from '@vue/apollo-composable'

const { firebaseUser } = useFirebase()

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

// taal dropdown
const languages = { nl: 'Nederlands', en: 'Engels' }
type Languages = { nl: string, en: string }
type ShowState = { [key: string]: boolean }
const showState = ref<ShowState>({})

const toggleShow = (languages: any) => {
  showState.value[languages] = !showState.value[languages]
}

// show current language user
const { customUser } = useCustomUser()

const otherLang = (languages: any) => {
  const currentLanguageCode = customUser.value?.locale

  const isCurrentLanguageInList = languages.hasOwnProperty(currentLanguageCode)

  const filteredLanguages = isCurrentLanguageInList
    ? Object.fromEntries(
        Object.entries(languages).filter(
          ([key]) => key !== currentLanguageCode,
        ),
      )
    : languages

  console.log('lijst van talen nu: ', filteredLanguages)
  console.log('VALUES: ', Object.values(filteredLanguages))

  return Object.values(filteredLanguages) || false
}

const isShow = (languages: any) => {
  // remove current language from dropdown
  console.log('customUser:', customUser.value?.locale)
  console.log('languages:', languages)

  return showState.value[languages] || false
}

// set language
const setLanguage = (selectedLang: any) => {
  console.log('selectedLang: ', selectedLang)

  const userId = String(customUser.value?.uid)
  const { mutate: setLocale } = useMutation(SET_USER_LOCALE)

  // de key van de gekozen taal
  const selectedLangKey = Object.keys(languages).find(
    (key) => languages[key as keyof Languages] === selectedLang
  ) as keyof Languages;

  console.log('selectedLangKey: ', selectedLangKey)

  setLocale({userId: userId, locale: selectedLangKey})
    .then(graphqlresult => {
      console.log('🎉 locale changed')
      console.log(graphqlresult?.data)
    })
    .catch(error => {
      console.error(error)
    })

  console.log('customUser CHANGED to: ', customUser.value?.locale)
}

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
        name: 'Lijst artiesten',
        path: '/admin/lijst-accounts',
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

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
