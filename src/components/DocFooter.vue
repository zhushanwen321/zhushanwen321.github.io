<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPrevNext, llmSimpleRouterSidebar } from '../config/sidebar'

const route = useRoute()
const navigation = computed(() => getPrevNext(llmSimpleRouterSidebar, route.path))
</script>

<template>
  <div class="flex items-center justify-between border-t border-white/10 pt-6 mt-12">
    <router-link
      v-if="navigation.prev"
      :to="navigation.prev.path"
      class="group flex flex-col items-start rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/5"
    >
      <span class="text-xs text-gray-500">上一页</span>
      <span class="text-sm text-gray-300 group-hover:text-white transition-colors">
        {{ navigation.prev.title }}
      </span>
    </router-link>
    <div v-else />

    <router-link
      v-if="navigation.next"
      :to="navigation.next.path"
      class="group flex flex-col items-end rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/5"
    >
      <span class="text-xs text-gray-500">下一页</span>
      <span class="text-sm text-gray-300 group-hover:text-white transition-colors">
        {{ navigation.next.title }}
      </span>
    </router-link>
    <div v-else />
  </div>
</template>
