<script setup lang="ts">
import { DocumentIcon, UserIcon } from '@heroicons/vue/24/outline'
import { Bars3BottomLeftIcon, HomeIcon } from '@heroicons/vue/24/solid'

const api = useApi()
const authStore = useAuthStore()

const navItems = ref([
  {
    id: 1,
    text: 'Blogs',
    icon: DocumentIcon,
    to: '/admin/blogs',
  },
  {
    id: 1,
    text: 'Users',
    icon: UserIcon,
    to: '/admin/users',
  },
])

const navIsShown = ref(false)
const toggleDrawer = () => {
  navIsShown.value = !navIsShown.value
}

const handleLogout = () => {
  api.reset()
  authStore.logout()

  navigateTo('/login')
}

const route = useRoute()
watch(
  () => route.path,
  () => {
    navIsShown.value = false
  },
)

// onMounted(() => {
//   document.addEventListener('click', (event: MouseEvent) => {
//     const target = event.target as HTMLDivElement
//
//     console.log({ target, navIsShown: navIsShown.value, targetId: target.id })
//     if (navIsShown.value && target.id !== 'sidebar') {
//       navIsShown.value = false
//     }
//   })
// })
</script>

<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <Bars3BottomLeftIcon class="size-6" @click="toggleDrawer" />
          </button>
          <NuxtLink to="/admin" class="text-xl sm:text-2xl font-semibold whitespace-nowrap text-black dark:text-white">
            Auth Project
          </NuxtLink>
        </div>
        <div class="flex gap-6">
          <UiButton variant="outlined" class="text-secondary flex items-center gap-1" @click="navigateTo('/')">
            <HomeIcon class="size-4" />
            <span>HOME</span>
          </UiButton>
          <UiButton @click="handleLogout">
            Logout
          </UiButton>
        </div>
      </div>
    </div>
  </nav>

  <aside
    id="sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-300 ease-in-out  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    :class="navIsShown ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <template v-for="navItem in navItems" :key="navItem.id">
          <li>
            <NuxtLink :to="navItem.to" active-class="bg-gray-200 dark:bg-gray-100" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <component :is="navItem.icon" class="size-5" />
              <span class="ms-3">{{ navItem.text }}</span>
            </NuxtLink>
          </li>
        </template>
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64 bg-white dark:bg-gray-900/50">
    <div class="p-4 mt-14">
      <slot />
    </div>
  </div>

  <UModals />
</template>

<style scoped></style>
