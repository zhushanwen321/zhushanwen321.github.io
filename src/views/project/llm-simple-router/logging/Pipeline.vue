<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ScreenShot from '../../../../components/ScreenShot.vue'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>四阶段链路日志</h1>
      <p>Router 为每个请求记录完整的四阶段链路日志，覆盖请求的完整生命周期。支持分页浏览和工具错误独立记录。</p>
    </template>
    <template v-else>
      <h1>Four-Stage Pipeline Logging</h1>
      <p>Router records complete four-stage pipeline logs for each request, covering the full request lifecycle. Supports paginated browsing and dedicated tool error logging.</p>
    </template>
    <ScreenShot :src="isZh ? '/images/llm-simple-router/log.png' : '/images/llm-simple-router/log.png'" :caption="isZh ? '请求日志页面' : 'Request Logs Page'" />
    <h2>{{ isZh ? '四个阶段' : 'The Four Stages' }}</h2>
    <table>
      <thead><tr><th>{{ isZh ? '阶段' : 'Stage' }}</th><th>{{ isZh ? '记录内容' : 'Recorded Content' }}</th></tr></thead>
      <tbody>
        <tr><td>{{ isZh ? '1. 客户端请求' : '1. Client Request' }}</td><td>{{ isZh ? '请求时间、客户端模型名、请求 Token 数' : 'Request time, client model name, request token count' }}</td></tr>
        <tr><td>{{ isZh ? '2. 上游请求' : '2. Upstream Request' }}</td><td>{{ isZh ? '实际转发到的 Provider、后端模型名、请求头' : 'Actual Provider forwarded to, backend model name, request headers' }}</td></tr>
        <tr><td>{{ isZh ? '3. 上游响应' : '3. Upstream Response' }}</td><td>{{ isZh ? '响应状态码、响应 Token 数、TTFT' : 'Response status code, response token count, TTFT' }}</td></tr>
        <tr><td>{{ isZh ? '4. 客户端响应' : '4. Client Response' }}</td><td>{{ isZh ? '最终返回给客户端的状态、总耗时、重试次数' : 'Final status returned to client, total duration, retry count' }}</td></tr>
      </tbody>
    </table>
    <h2>{{ isZh ? '日志查看' : 'Viewing Logs' }}</h2>
    <p>{{ isZh ? '管理后台 > 请求日志页面。支持按时间范围、状态码、模型名等条件过滤。分页功能帮助在海量日志中快速定位，支持页码按钮跳转。' : 'Admin Panel > Request Logs page. Filter by time range, status code, model name. Pagination with page number buttons helps navigate through large log volumes.' }}</p>
    <h2>{{ isZh ? '重试和 Failover 标记' : 'Retry & Failover Markers' }}</h2>
    <p>{{ isZh ? '当请求经过重试或 Failover 时，日志会标记重试次数和切换的 Provider 信息。' : 'When a request undergoes retry or failover, the log marks retry count and switched Provider info.' }}</p>
    <h2>{{ isZh ? '工具错误日志' : 'Tool Error Logging' }}</h2>
    <p>{{ isZh ? 'Router 专门记录 LLM 工具调用（Tool Call）过程中的错误，包括调用参数、错误详情和耗时。便于排查 Agent 场景下的工具调用异常。' : 'The Router specifically logs tool call errors including call parameters, error details, and duration. Helps debug tool invocation issues in Agent scenarios.' }}</p>
  </div>
</template>
