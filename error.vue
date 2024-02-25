<script setup lang="ts">
import Button from '~/components/UI/Button.vue'

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

defineProps<PROPS>()
const { t } = useI18n()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="container h-screen flex flex-col items-center justify-center">
    <h2 class="text-6xl font-extrabold tracking-[0.5rem] text-primary">
      {{ error.statusCode }}
    </h2>
    <div class="text-lg mt-1 text-secondary">
      {{ error.message }}
    </div>
    <Button type="button" size="xl" @click="handleError">
      {{ t('errors.notfoundBtn') }}
    </Button>
  </div>
</template>

<style scoped>

</style>
