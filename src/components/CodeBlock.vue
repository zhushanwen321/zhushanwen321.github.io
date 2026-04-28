<script setup lang="ts">
defineProps<{
  code: string
  language?: string
}>()
</script>

<template>
  <div class="my-4 overflow-hidden rounded-lg border border-white/10">
    <div class="flex items-center justify-between border-b border-white/10 bg-surface-100 px-4 py-2">
      <span class="text-xs text-gray-500">{{ language || 'bash' }}</span>
      <button
        class="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        @click="navigator.clipboard.writeText(code)"
      >
        复制
      </button>
    </div>
    <pre class="overflow-x-auto bg-surface-50 p-4 text-sm leading-relaxed"><code class="text-gray-300 font-mono">{{ code }}</code></pre>
  </div>
</template>
