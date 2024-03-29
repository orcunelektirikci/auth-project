<script setup lang="ts">
interface Props {
  store: string
}
defineProps<Props>()

const { t } = useI18n()

const isOpen = ref(false)

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => { isOpen.value = false },
  },
})

function close() {
  const modal = useModal()
  modal.close()
}

function submitted() {
  useToastMessage(t('success.resourceCreated'), 200).showSuccess()
  close()
}
</script>

<template>
  <UModal v-model="isOpen" :ui="{ base: 'overflow-visible' }">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ $t('general.createResource', { resourceName: $t(`${store}.title.singular`) }) }}
          </h3>
        </div>
      </template>
      <template #default>
        <FormBuilderContainer :store-name="store" @submitted="submitted" @close="close" />
      </template>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>
