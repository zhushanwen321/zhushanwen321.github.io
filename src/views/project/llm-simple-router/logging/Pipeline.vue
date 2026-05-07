<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ScreenShot from '../../../../components/ScreenShot.vue'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <!-- ====== 中文 ====== -->
    <template v-if="isZh">
      <h1>日志与指标</h1>

      <!-- 请求日志 -->
      <h2>请求日志</h2>
      <p>Router 为每个请求记录完整的四阶段链路日志，覆盖请求的完整生命周期。支持分页浏览和工具错误独立记录。</p>
      <ScreenShot src="/images/llm-simple-router/log.png" caption="请求日志页面" />

      <h3>四个阶段</h3>
      <table>
        <thead><tr><th>阶段</th><th>记录内容</th></tr></thead>
        <tbody>
          <tr><td>1. 客户端请求</td><td>请求时间、客户端模型名、请求 Token 数</td></tr>
          <tr><td>2. 上游请求</td><td>实际转发到的 Provider、后端模型名、请求头</td></tr>
          <tr><td>3. 上游响应</td><td>响应状态码、响应 Token 数、TTFT</td></tr>
          <tr><td>4. 客户端响应</td><td>最终返回给客户端的状态、总耗时、重试次数</td></tr>
        </tbody>
      </table>

      <h3>日志查看</h3>
      <p>管理后台 → 请求日志页面。支持按时间范围、状态码、模型名等条件过滤。分页功能帮助在海量日志中快速定位。</p>

      <h3>重试和 Failover 标记</h3>
      <p>当请求经过重试或 Failover 时，日志会标记重试次数和切换的 Provider 信息。</p>

      <h3>工具错误日志</h3>
      <p>Router 专门记录 LLM 工具调用过程中的错误，包括调用参数、错误详情和耗时，便于排查 Agent 场景下的工具调用异常。</p>

      <!-- 性能指标 -->
      <h2>性能指标</h2>
      <p>Router 为每个请求采集关键性能指标，帮助评估后端 Provider 的响应速度和吞吐量。</p>

      <h3>TTFT（首 Token 时间）</h3>
      <p>Time To First Token — 从发送请求到收到第一个 Token 的耗时（ms）。TTFT 越低，体感越快。</p>

      <h3>TPS（每秒 Token 数）</h3>
      <p>Tokens Per Second — 流式输出阶段每秒生成的 Token 数量。</p>

      <h3>Token 用量</h3>
      <table>
        <thead><tr><th>字段</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td>输入 Token</td><td>客户端请求中 prompt / messages 的 Token 数</td></tr>
          <tr><td>输出 Token</td><td>模型生成的 completion 的 Token 数</td></tr>
          <tr><td>缓存命中率</td><td>Provider 返回的缓存命中信息（如支持）</td></tr>
        </tbody>
      </table>

      <h3>查看指标</h3>
      <p>管理后台 → Dashboard 页面提供 Token 用量汇总和 TTFT/TPS 趋势图，可按 Provider、模型维度查看。</p>
    </template>

    <!-- ====== English ====== -->
    <template v-else>
      <h1>Logging &amp; Metrics</h1>

      <!-- Request Logging -->
      <h2>Request Logging</h2>
      <p>Router records complete four-stage pipeline logs for each request. Supports paginated browsing and dedicated tool error logging.</p>
      <ScreenShot src="/images/llm-simple-router/log.png" caption="Request Logs Page" />

      <h3>The Four Stages</h3>
      <table>
        <thead><tr><th>Stage</th><th>Recorded Content</th></tr></thead>
        <tbody>
          <tr><td>1. Client Request</td><td>Request time, client model name, request token count</td></tr>
          <tr><td>2. Upstream Request</td><td>Actual Provider, backend model name, request headers</td></tr>
          <tr><td>3. Upstream Response</td><td>Response status code, response token count, TTFT</td></tr>
          <tr><td>4. Client Response</td><td>Final status, total duration, retry count</td></tr>
        </tbody>
      </table>

      <h3>Viewing Logs</h3>
      <p>Admin Panel → Request Logs page. Filter by time range, status code, model name. Pagination for large log volumes.</p>

      <h3>Retry &amp; Failover Markers</h3>
      <p>When a request undergoes retry or failover, the log marks retry count and switched Provider info.</p>

      <h3>Tool Error Logging</h3>
      <p>Dedicated tool call error log including call parameters, error details, and duration — helps debug Agent scenarios.</p>

      <!-- Performance Metrics -->
      <h2>Performance Metrics</h2>
      <p>Router collects key performance metrics for each request to evaluate backend Provider performance.</p>

      <h3>TTFT (Time To First Token)</h3>
      <p>Time from sending request to receiving the first token (ms). Lower TTFT = faster perceived response.</p>

      <h3>TPS (Tokens Per Second)</h3>
      <p>Number of tokens generated per second during streaming output.</p>

      <h3>Token Usage</h3>
      <table>
        <thead><tr><th>Field</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Input Tokens</td><td>Token count of prompt / messages in the client request</td></tr>
          <tr><td>Output Tokens</td><td>Token count of model-generated completion</td></tr>
          <tr><td>Cache Hit Rate</td><td>Cache hit info returned by Provider (if supported)</td></tr>
        </tbody>
      </table>

      <h3>Viewing Metrics</h3>
      <p>Admin Panel → Dashboard provides token usage summaries and TTFT/TPS trends, filterable by Provider and model.</p>
    </template>
  </div>
</template>
