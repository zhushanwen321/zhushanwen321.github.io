<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>TTFT / TPS</h1>
      <p>Router 为每个请求采集关键性能指标，帮助评估后端 Provider 的响应速度和吞吐量。</p>
    </template>
    <template v-else>
      <h1>TTFT / TPS</h1>
      <p>Router collects key performance metrics for each request to evaluate backend Provider response speed and throughput.</p>
    </template>
    <h2>{{ isZh ? '指标说明' : 'Metric Descriptions' }}</h2>
    <table>
      <thead><tr><th>{{ isZh ? '指标' : 'Metric' }}</th><th>{{ isZh ? '全称' : 'Full Name' }}</th><th>{{ isZh ? '说明' : 'Description' }}</th></tr></thead>
      <tbody>
        <tr><td>TTFT</td><td>Time To First Token</td><td>{{ isZh ? '从发送请求到收到第一个 Token 的时间（ms）' : 'Time from sending request to receiving first token (ms)' }}</td></tr>
        <tr><td>TPS</td><td>Tokens Per Second</td><td>{{ isZh ? '每秒生成的 Token 数量' : 'Number of tokens generated per second' }}</td></tr>
      </tbody>
    </table>
    <h2>{{ isZh ? '采集方式' : 'Collection Method' }}</h2>
    <p>{{ isZh ? '对于 SSE 流式请求，Router 在代理过程中旁路采集 TTFT 和每个 Token 的到达时间。对于非流式请求，记录总响应时间。' : 'For SSE streaming requests, Router side-channel collects TTFT and per-token arrival time. For non-streaming, total response time is recorded.' }}</p>
    <h2>{{ isZh ? '查看指标' : 'Viewing Metrics' }}</h2>
    <p>{{ isZh ? '指标数据记录在请求日志中。管理后台 > Dashboard 页面提供汇总视图。' : 'Metric data is recorded in request logs. Admin Panel > Dashboard provides a summary view.' }}</p>
  </div>
</template>
