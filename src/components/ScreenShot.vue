<script setup lang="ts">
defineProps<{
  src: string
  caption?: string
}>()
</script>

<template>
  <figure class="my-6">
    <div class="overflow-hidden rounded-lg border border-white/10">
      <img :src="src" :alt="caption || ''" class="w-full" />
    </div>
    <figcaption v-if="caption" class="mt-2 text-center text-sm text-gray-500">
      {{ caption }}
    </figcaption>
  </figure>
</template>
