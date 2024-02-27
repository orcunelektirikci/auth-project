<script setup lang="ts">
interface Props {
  store: string
}

const props = defineProps<Props>()

console.log({ store: props.store })

const isOpen = ref(false)

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => { isOpen.value = false },
  },
})
</script>

<template>
  <UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Create {{ store }}
          </h3>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>
