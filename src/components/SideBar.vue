<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { llmSimpleRouterSidebar } from '../config/sidebar'

const route = useRoute()
const { t } = useI18n()
const sidebar = llmSimpleRouterSidebar
const expandedGroups = ref<Record<string, boolean>>({})

watch(
  () => route.path,
  () => {
    for (const group of sidebar) {
      if (group.items.some((item) => isActive(item.path))) {
        expandedGroups.value[group.titleKey] = true
      }
    }
  },
  { immediate: true },
)

function toggleGroup(titleKey: string) {
  expandedGroups.value[titleKey] = !expandedGroups.value[titleKey]
}

function isActive(path: string): boolean {
  if (path === '/project/llm-simple-router/') {
    return route.path === '/project/llm-simple-router/' || route.path === '/project/llm-simple-router'
  }
  return route.path === path
}
</script>

<template>
  <aside class="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-r border-white/10 bg-surface-50 overflow-y-auto">
    <nav class="p-4">
      <div v-for="group in sidebar" :key="group.titleKey" class="mb-3">
        <button
          class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-300 transition-colors"
          @click="toggleGroup(group.titleKey)"
        >
          {{ t(group.titleKey) }}
          <svg
            class="h-3.5 w-3.5 transition-transform"
            :class="{ 'rotate-90': !expandedGroups[group.titleKey] }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div v-show="expandedGroups[group.titleKey] !== false">
          <router-link
            v-for="item in group.items"
            :key="item.path"
            :to="item.path"
            class="group relative flex items-center rounded-md px-3 py-1.5 text-sm transition-colors"
            :class="isActive(item.path)
              ? 'text-white bg-white/5'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'"
          >
            <span
              class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r transition-colors"
              :class="isActive(item.path) ? 'bg-accent' : 'bg-transparent'"
            />
            {{ t(item.titleKey) }}
          </router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>
