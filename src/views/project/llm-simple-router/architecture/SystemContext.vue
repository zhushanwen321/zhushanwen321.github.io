<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>系统上下文</h1>
      <p>展示 LLM Simple Router 在整体架构中的位置和与其他系统的关系。</p>
    </template>
    <template v-else>
      <h1>System Context</h1>
      <p>Shows the position of LLM Simple Router in the overall architecture and its relationship with other systems.</p>
    </template>
    <h2>{{ isZh ? '系统上下文图' : 'System Context Diagram' }}</h2>
    <div class="not-prose my-6">
      <div class="flex flex-col items-center gap-6 rounded-lg border border-white/10 bg-surface-50 p-8">
        <div class="flex items-center gap-4">
          <div class="rounded-lg border border-blue-500/30 bg-blue-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-blue-400">Claude Code / Cursor</p>
            <p class="text-xs text-gray-500">{{ isZh ? 'API 请求 · Bearer Token' : 'API Request · Bearer Token' }}</p>
          </div>
          <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div class="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-cyan-400">LLM Simple Router</p>
            <p class="text-xs text-gray-500">{{ isZh ? '映射 · 重试 · 并发控制' : 'Mapping · Retry · Concurrency' }}</p>
          </div>
          <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div class="rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-green-400">{{ isZh ? '智谱 / Moonshot / ...' : 'Zhipu / Moonshot / ...' }}</p>
            <p class="text-xs text-gray-500">{{ isZh ? 'SSE 流式 · JSON 响应' : 'SSE Streaming · JSON Response' }}</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="rounded-lg border border-purple-500/30 bg-purple-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-purple-400">{{ isZh ? '管理员' : 'Admin' }}</p>
            <p class="text-xs text-gray-500">{{ isZh ? '管理后台 /admin/' : 'Admin Panel /admin/' }}</p>
          </div>
          <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div class="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-cyan-400">LLM Simple Router</p>
            <p class="text-xs text-gray-500">{{ isZh ? '配置 · 日志 · 监控' : 'Config · Logging · Monitoring' }}</p>
          </div>
        </div>
      </div>
    </div>
    <h2>{{ isZh ? '组件说明' : 'Component Description' }}</h2>
    <table>
      <thead><tr><th>{{ isZh ? '组件' : 'Component' }}</th><th>{{ isZh ? '角色' : 'Role' }}</th></tr></thead>
      <tbody>
        <tr><td>{{ isZh ? '客户端' : 'Clients' }}</td><td>{{ isZh ? '通过 OpenAI 或 Anthropic 格式的 API 发送请求' : 'Send requests via OpenAI or Anthropic format APIs' }}</td></tr>
        <tr><td>{{ isZh ? '管理员' : 'Admin' }}</td><td>{{ isZh ? '通过浏览器访问管理后台，配置 Provider、映射规则、密钥' : 'Accesses admin panel via browser to configure Providers, mapping rules, keys' }}</td></tr>
        <tr><td>Router</td><td>{{ isZh ? '完成模型映射、并发控制、自动重试、日志记录' : 'Performs model mapping, concurrency control, auto retry, logging' }}</td></tr>
        <tr><td>{{ isZh ? '上游 Provider' : 'Upstream Providers' }}</td><td>{{ isZh ? '接收转发的请求，返回 SSE 流或 JSON 响应' : 'Receive forwarded requests, return SSE streams or JSON responses' }}</td></tr>
      </tbody>
    </table>
  </div>
</template>
