<script setup lang="ts">
interface DropdownItem {
  label: string
  to?: string
  icon?: string
  onClick?: () => void
}

interface Props {
  items: DropdownItem[]
  buttonLabel: string
  buttonIcon?: string
  isActive?: boolean
}

const props = defineProps<Props>()
const route = useRoute()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleItemClick = (item: DropdownItem) => {
  if (item.onClick) {
    item.onClick()
  }
  isOpen.value = false
}
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <!-- Dropdown Button -->
    <button
      @click="toggleDropdown"
      class="px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 border-b-2 border-transparent"
      :class="isActive
        ? 'font-bold text-brand-600 dark:text-brand-400 border-brand-600 dark:border-brand-400'
        : 'font-medium text-zinc-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'"
      :aria-expanded="isOpen"
      aria-haspopup="true"
    >
      <UIcon v-if="buttonIcon" :name="buttonIcon" class="h-4 w-4" />
      <span>{{ buttonLabel }}</span>
      <UIcon
        name="i-lucide-chevron-down"
        class="h-4 w-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-show="isOpen"
        class="absolute left-0 mt-2 w-56 rounded-lg bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 z-50"
      >
        <div class="py-1" role="menu">
          <template v-for="item in items" :key="item.label">
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              @click="isOpen = false"
              class="flex items-center gap-3 px-4 py-2 text-sm transition-colors border-l-2"
              :class="route.path === item.to
                ? 'border-brand-600 dark:border-brand-400 font-bold text-brand-600 dark:text-brand-400 bg-brand-50/50 dark:bg-brand-950/30'
                : 'border-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600 dark:hover:text-brand-400'"
              role="menuitem"
            >
              <UIcon v-if="item.icon" :name="item.icon" class="h-4 w-4" />
              <span>{{ item.label }}</span>
            </NuxtLink>
            <button
              v-else
              @click="handleItemClick(item)"
              class="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-left"
              role="menuitem"
            >
              <UIcon v-if="item.icon" :name="item.icon" class="h-4 w-4" />
              <span>{{ item.label }}</span>
            </button>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>
