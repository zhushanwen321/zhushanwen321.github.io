<script setup lang="ts">
import CodeBlock from '../../../../components/CodeBlock.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>Docker 部署</h1>
    <h2>快速启动</h2>
    <CodeBlock code="docker compose up -d" language="bash" />
    <p>环境变量通过 Setup 页面设置，不需要 <code>.env</code> 文件。</p>
    <h2>数据持久化</h2>
    <p>Docker 部署时，数据存储在容器内的 <code>/root/.llm-simple-router/</code> 目录。通过 Docker volume 挂载确保数据持久化，容器重启后数据不丢失。</p>
  </div>
</template>
