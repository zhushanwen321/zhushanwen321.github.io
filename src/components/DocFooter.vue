<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getPrevNext, llmSimpleRouterSidebar } from '../config/sidebar'

const route = useRoute()
const { t } = useI18n()
const navigation = computed(() => getPrevNext(llmSimpleRouterSidebar, route.path))
</script>

<template>
  <div class="flex items-center justify-between border-t border-white/10 pt-6 mt-12">
    <router-link
      v-if="navigation.prev"
      :to="navigation.prev.path"
      class="group flex flex-col items-start rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/5"
    >
      <span class="text-xs text-gray-500">{{ t('footer.prev') }}</span>
      <span class="text-sm text-gray-300 group-hover:text-white transition-colors">
        {{ t(navigation.prev.titleKey) }}
      </span>
    </router-link>
    <div v-else />

    <router-link
      v-if="navigation.next"
      :to="navigation.next.path"
      class="group flex flex-col items-end rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/5"
    >
      <span class="text-xs text-gray-500">{{ t('footer.next') }}</span>
      <span class="text-sm text-gray-300 group-hover:text-white transition-colors">
        {{ t(navigation.next.titleKey) }}
      </span>
    </router-link>
    <div v-else />
  </div>
</template>
