<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>Token 用量</h1>
      <p>Router 记录每个请求的 Token 用量，包括输入 Token 和输出 Token，支持按密钥、模型、时间范围统计。</p>
    </template>
    <template v-else>
      <h1>Token Usage</h1>
      <p>Router records token usage per request, including input and output tokens. Supports filtering by key, model, and time range.</p>
    </template>
    <h2>{{ isZh ? '记录内容' : 'Recorded Fields' }}</h2>
    <table>
      <thead><tr><th>{{ isZh ? '字段' : 'Field' }}</th><th>{{ isZh ? '说明' : 'Description' }}</th></tr></thead>
      <tbody>
        <tr><td>{{ isZh ? '输入 Token' : 'Input Tokens' }}</td><td>{{ isZh ? '客户端请求中的 prompt / messages 占用的 Token 数' : 'Token count of prompt / messages in client request' }}</td></tr>
        <tr><td>{{ isZh ? '输出 Token' : 'Output Tokens' }}</td><td>{{ isZh ? '模型生成的 completion 占用的 Token 数' : 'Token count of model-generated completion' }}</td></tr>
        <tr><td>{{ isZh ? '缓存命中率' : 'Cache Hit Rate' }}</td><td>{{ isZh ? 'Provider 返回的缓存命中信息（如支持）' : 'Cache hit info returned by Provider (if supported)' }}</td></tr>
        <tr><td>{{ isZh ? '关联密钥' : 'Associated Key' }}</td><td>{{ isZh ? '用于追踪不同用户/项目的用量' : 'Used to track usage by different users/projects' }}</td></tr>
      </tbody>
    </table>
    <h2>{{ isZh ? '用量统计' : 'Usage Statistics' }}</h2>
    <p>{{ isZh ? '管理后台 > Dashboard 页面提供 Token 用量汇总。可按密钥、Provider、模型维度查看用量趋势。' : 'Admin Panel > Dashboard provides token usage summaries by key, Provider, and model dimensions.' }}</p>
  </div>
</template>
