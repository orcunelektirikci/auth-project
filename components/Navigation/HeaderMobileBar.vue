<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid'
import Button from '~/components/UI/Button.vue'

interface NAV_ITEM {
  text: string
  to: string
  display: boolean
}

interface PROPS {
  items: NAV_ITEM[]
}

withDefaults(defineProps<PROPS>(), {
  items: () => [],
})

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const route = useRoute()
watch(() => route.path, () => {
  showMenu.value = false
})
</script>

<template>
  <header class="bg-white bg-opacity-80 py-3">
    <nav class="flex justify-between item-center w-[92%] mx-auto">
      <div>
        <slot name="logo" />
      </div>
      <div
        class="absolute md:static bg-white md:bg-transparent top-0 min-h-[95%] md:min-h-fit left-0 w-full md:w-auto flex items-center px-5 transition-all duration-700 ease-in-out"
        :class="showMenu ? 'translate-y-[6%]' : 'translate-y-[-100%]'"
      >
        <ul class="flex flex-col md:flex-row items-center mx-auto md:gap-[4vw] gap-8">
          <template v-for="item in items" :key="item.to">
            <li v-if="item.display" class="hover:text-gray-500 text-xl md:text-auto">
              <NuxtLink :to="item.to">
                {{ item.text }}
              </NuxtLink>
            </li>
          </template>

          <slot name="action_buttons" />
        </ul>
      </div>
      <div class="flex items-center gap-6 md:hidden">
        <Button v-if="showMenu" variant="text" :rounded="false" size="xl" class="md:hidden" @click="toggleMenu">
          <XMarkIcon v-if="showMenu" class="w-6" />
        </Button>
        <Button v-else variant="text" :rounded="false" size="xl" class="md:hidden" @click="toggleMenu">
          <Bars3Icon class="w-6" />
        </Button>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
