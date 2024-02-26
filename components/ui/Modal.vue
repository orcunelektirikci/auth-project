<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid'

interface Props {
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
})

const shown = ref(false)

const isShown = computed({
  get() {
    return shown.value
  },
  set(val) {
    shown.value = val
  },
})

watch(() => props.show, n => isShown.value = n)
</script>

<template>
  <Teleport to="body">
    <div v-if="isShown" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" @click="isShown = false">
              <XMarkIcon />
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            Modal Body
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>

</style>
