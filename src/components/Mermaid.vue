<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false, theme: 'dark' })

const props = defineProps<{ code: string }>()
const container = ref<HTMLElement>()

async function render() {
  if (!container.value) return
  const id = `mermaid-${Math.random().toString(36).slice(2)}`
  const { svg } = await mermaid.render(id, props.code)
  container.value.innerHTML = svg
}

onMounted(render)
watch(() => props.code, render)
</script>

<template>
  <div ref="container" class="mermaid-container my-6 flex justify-center overflow-x-auto" />
</template>
