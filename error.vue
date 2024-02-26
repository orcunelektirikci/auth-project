<script setup lang="ts">
interface PROPS {
  error: {
    url: string
    statusCode: string
    statusMessage: string
    message: string
    description: string
    data: any
  }
}

const props = defineProps<PROPS>()

const { t } = useI18n()

const authStore = useAuthStore()

const isAdminError = computed(() => {
  return props.error.url?.startsWith('/admin') && authStore.isLoggedIn && authStore.isAdmin
})
const layout = computed(() => isAdminError.value ? 'admin' : 'default')

const handleError = () => clearError({ redirect: isAdminError.value ? '/admin' : '/' })

onBeforeUnmount(() => {
  clearError()
})
</script>

<template>
  <div>
    <NuxtLayout :name="layout">
      <div class="container h-screen flex flex-col items-center justify-center">
        <h2 class="text-6xl font-extrabold tracking-[0.5rem] text-primary">
          {{ error.statusCode }}
        </h2>
        <div class="text-lg mt-1 text-secondary">
          {{ error.message }}
        </div>
        <UiButton type="button" size="xl" @click="handleError">
          {{ t('errors.notfoundBtn') }}
        </UiButton>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>
