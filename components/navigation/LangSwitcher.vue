<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
  <NuxtLink
    v-for="local in availableLocales"
    :key="local.code"
    :to="switchLocalePath(local.code)"
    class="text-primary"
  >
    {{ local.name }}
  </NuxtLink>
</template>
