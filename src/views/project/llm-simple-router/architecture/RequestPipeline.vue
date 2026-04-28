<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')

const stages = [
  { nameZh: '认证', nameEn: 'Auth', descZh: 'Token 校验', descEn: 'Token Verify' },
  { nameZh: '模型映射', nameEn: 'Model Map', descZh: 'A → B 转换', descEn: 'A → B Mapping' },
  { nameZh: '并发排队', nameEn: 'Concurrency', descZh: '信号量控制', descEn: 'Semaphore' },
  { nameZh: '调用上游', nameEn: 'Upstream', descZh: 'HTTP 代理', descEn: 'HTTP Proxy' },
  { nameZh: '日志 + 指标', nameEn: 'Log + Metric', descZh: '记录采集', descEn: 'Log & Collect' },
  { nameZh: '返回响应', nameEn: 'Response', descZh: '原样返回', descEn: 'Forward' },
]
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>请求流水线</h1>
      <p>展示请求从接收到响应的核心处理流程。</p>
    </template>
    <template v-else>
      <h1>Request Pipeline</h1>
      <p>Shows the core processing flow from request receipt to response.</p>
    </template>
    <h2>{{ isZh ? '流水线图' : 'Pipeline Diagram' }}</h2>
    <div class="not-prose my-6">
      <div class="overflow-x-auto rounded-lg border border-white/10 bg-surface-50 p-8">
        <div class="flex items-center gap-2 min-w-max">
          <div v-for="(stage, i) in stages" :key="i" class="flex items-center gap-2">
            <div class="rounded-lg border border-white/20 bg-surface-100 px-4 py-3 text-center min-w-[100px]">
              <p class="text-sm font-semibold text-gray-200">{{ isZh ? stage.nameZh : stage.nameEn }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ isZh ? stage.descZh : stage.descEn }}</p>
            </div>
            <svg v-if="i < stages.length - 1" class="h-4 w-4 shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2 pl-[440px]">
          <svg class="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="text-xs text-amber-400">{{ isZh ? '失败重试 / Failover 切换 Provider' : 'Retry on Failure / Failover Switch Provider' }}</span>
        </div>
      </div>
    </div>
    <h2>{{ isZh ? '阶段说明' : 'Stage Descriptions' }}</h2>
    <table>
      <thead><tr><th>{{ isZh ? '阶段' : 'Stage' }}</th><th>{{ isZh ? '做什么' : 'What It Does' }}</th></tr></thead>
      <tbody>
        <tr><td>{{ isZh ? '认证' : 'Auth' }}</td><td>{{ isZh ? 'Bearer Token SHA256 哈希后查询 router_keys 表' : 'Bearer Token SHA256 hashed and looked up in router_keys table' }}</td></tr>
        <tr><td>{{ isZh ? '模型映射 + 路由策略' : 'Model Mapping + Routing' }}</td><td>{{ isZh ? '客户端模型名映射到后端实际模型；支持分时段/轮询/随机/故障转移' : 'Map client model name to backend actual model; supports scheduled/round-robin/random/failover' }}</td></tr>
        <tr><td>{{ isZh ? '并发排队' : 'Concurrency Queue' }}</td><td>{{ isZh ? 'Provider 级信号量，队列满返回 503，超时返回 504' : 'Provider-level semaphore, queue full → 503, timeout → 504' }}</td></tr>
        <tr><td>{{ isZh ? '调用上游' : 'Upstream Call' }}</td><td>{{ isZh ? '原生 HTTP 代理，支持 SSE 流式；失败自动重试，Failover 切换 Provider' : 'Native HTTP proxy, supports SSE streaming; auto-retry on failure, failover switches Provider' }}</td></tr>
        <tr><td>{{ isZh ? '日志 + 指标' : 'Logging + Metrics' }}</td><td>{{ isZh ? '记录完整请求链路，采集 Token 用量、TTFT、TPS' : 'Record complete request pipeline, collect token usage, TTFT, TPS' }}</td></tr>
        <tr><td>{{ isZh ? '返回响应' : 'Return Response' }}</td><td>{{ isZh ? '将上游响应原样返回客户端' : 'Return upstream response as-is to client' }}</td></tr>
      </tbody>
    </table>
  </div>
</template>
