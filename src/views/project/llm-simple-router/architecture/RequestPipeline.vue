<script setup lang="ts">
const stages = [
  { name: '认证', desc: 'Token 校验' },
  { name: '模型映射', desc: 'A → B 转换' },
  { name: '并发排队', desc: '信号量控制' },
  { name: '调用上游', desc: 'HTTP 代理' },
  { name: '日志 + 指标', desc: '记录采集' },
  { name: '返回响应', desc: '原样返回' },
]
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>请求流水线</h1>
    <p>展示请求从接收到响应的核心处理流程。</p>
    <h2>流水线图</h2>
    <div class="not-prose my-6">
      <div class="overflow-x-auto rounded-lg border border-white/10 bg-surface-50 p-8">
        <div class="flex items-center gap-2 min-w-max">
          <div v-for="(stage, i) in stages" :key="i" class="flex items-center gap-2">
            <div class="rounded-lg border border-white/20 bg-surface-100 px-4 py-3 text-center min-w-[100px]">
              <p class="text-sm font-semibold text-gray-200">{{ stage.name }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ stage.desc }}</p>
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
          <span class="text-xs text-amber-400">失败重试 / Failover 切换 Provider</span>
        </div>
      </div>
    </div>
    <h2>阶段说明</h2>
    <table>
      <thead><tr><th>阶段</th><th>做什么</th></tr></thead>
      <tbody>
        <tr><td>认证</td><td>Bearer Token SHA256 哈希后查询 router_keys 表</td></tr>
        <tr><td>模型映射 + 路由策略</td><td>客户端模型名映射到后端实际模型；支持分时段/轮询/随机/故障转移</td></tr>
        <tr><td>并发排队</td><td>Provider 级信号量，队列满返回 503，超时返回 504</td></tr>
        <tr><td>调用上游</td><td>原生 HTTP 代理，支持 SSE 流式；失败自动重试，Failover 切换 Provider</td></tr>
        <tr><td>日志 + 指标</td><td>记录完整请求链路，采集 Token 用量、TTFT、TPS</td></tr>
        <tr><td>返回响应</td><td>将上游响应原样返回客户端</td></tr>
      </tbody>
    </table>
  </div>
</template>
