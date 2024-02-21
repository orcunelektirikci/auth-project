<script setup lang="ts">
import { Bars2Icon, XMarkIcon } from '@heroicons/vue/24/solid'
import Button from '~/components/UI/Button.vue'
import type { NAV_ITEM } from '~/types/UI/menu'

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
  <header class="bg-white dark:bg-secondary-darker py-3 shadow-lg w-full">
    <nav class="flex justify-between item-center w-[92%] mx-auto">
      <div>
        <slot name="logo" />
      </div>
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-6">
          <slot name="outer_buttons" />
        </div>
        <div
          class="absolute md:static bg-gradient-to-br from-primary-lighter dark:from-primary-darker via-accent-light dark:via-accent-darker to-primary-lighter dark:to-primary-darker overflow-y-hidden  md:bg-none md:bg-transparent md:opacity-100 translate-y-[7%] top-0 min-h-[93.5%] md:min-h-fit left-0 w-full md:w-auto flex items-center px-5 transition-all duration-300 ease-in-out z-50"
          :class="showMenu ? 'opacity-100' : 'opacity-0'"
        >
          <ul class="flex flex-col md:flex-row items-center mx-auto md:gap-[4vw] gap-8">
            <template v-for="item in items" :key="item.to">
              <li v-if="item.display" class="dark:text-secondary-light hover:text-accent dark:hover:text-secondary text-xl md:text-auto">
                <NuxtLink active-class="underline underline-offset-2 md:underline-offset-8 text-accent dark:text-accent-lighter" :to="item.to">
                  {{ item.text }}
                </NuxtLink>
              </li>
            </template>

            <slot name="action_buttons" />
          </ul>
        </div>
        <div class="flex items-center gap-6 md:hidden">
          <Button
            variant="text"
            :rounded="false"
            size="xl"
            class="md:hidden transition-all duration-500 ease-in-out"
            :class="showMenu ? 'rotate-180' : '-rotate-180 '"
            @click="toggleMenu"
          >
            <XMarkIcon v-if="showMenu" class="w-8" />
            <Bars2Icon v-else class="w-8" />
          </Button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
