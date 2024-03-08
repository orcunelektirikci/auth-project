<script setup lang="ts">
const api = useApi()
const authStore = useAuthStore()

const navItems = ref([
  [
    {
      label: 'Blogs',
      icon: 'i-heroicons-document',
      to: '/admin/blogs',
    },
    {
      label: 'Users',
      icon: 'i-heroicons-users',
      to: '/admin/users',
    },
  ],
  [
    {
      label: 'Home Page',
      icon: 'i-heroicons-computer-desktop',
      to: '/',
    },
  ],
])

const navIsShown = ref(false)
function toggleDrawer() {
  navIsShown.value = !navIsShown.value
}

function handleLogout() {
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
  <UModals />
  <UNotifications />

  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <UButton
            type="button"
            variant="ghost"
            class="sm:hidden"
          >
            <Icon name="i-heroicons-bars-3-bottom-left" class="size-6" @click="toggleDrawer" />
          </UButton>
          <NuxtLink to="/admin" class="hidden md:inline text-xl sm:text-2xl font-semibold whitespace-nowrap text-black dark:text-white">
            Auth Project
          </NuxtLink>
        </div>
        <div class="flex gap-6">
          <CommonDarkModeButton />
          <UButton @click="handleLogout">
            Logout
          </UButton>
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
        <li class="py-3 md:hidden text-center w-full text-cool-600 dark:text-white font-extrabold text-xl border rounded-lg">
          <NuxtLink to="/admin">
            Auth Project
          </NuxtLink>
        </li>
        <UVerticalNavigation
          :links="navItems"
          :ui="{
            size: 'text-lg',
            rounded: '',
            icon: {
              base: 'size-6',
            },
          }"
        />
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64 bg-white dark:bg-gray-900/50">
    <div class="p-4 mt-14">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
