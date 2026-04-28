<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CodeBlock from '../../../../components/CodeBlock.vue'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>Docker 部署</h1>
      <h2>快速启动</h2>
      <CodeBlock code="docker compose up -d" language="bash" />
      <p>环境变量通过 Setup 页面设置，不需要 <code>.env</code> 文件。</p>
      <h2>数据持久化</h2>
      <p>Docker 部署时，数据存储在容器内的 <code>/root/.llm-simple-router/</code> 目录。通过 Docker volume 挂载确保数据持久化，容器重启后数据不丢失。</p>
    </template>
    <template v-else>
      <h1>Docker Deployment</h1>
      <h2>Quick Start</h2>
      <CodeBlock code="docker compose up -d" language="bash" />
      <p>Environment vars are set via the Setup page, no <code>.env</code> file needed.</p>
      <h2>Data Persistence</h2>
      <p>In Docker, data is stored at <code>/root/.llm-simple-router/</code> inside the container. Use Docker volume mounts for data persistence so data is not lost on container restart.</p>
    </template>
  </div>
</template>
