<script setup lang="ts">
import ScreenShot from '../../../../components/ScreenShot.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>实时监控</h1>
      <p>管理后台提供 Dashboard 和实时监控功能，通过 SSE 推送活跃请求、队列状态、流式输出等，无需刷新页面。</p>

      <h2>Dashboard 面板</h2>
      <p>首页 Dashboard 按 Provider 分 Tab，每个 Tab 独立展示该供应商的用量统计和图表：</p>
      <ul>
        <li>Input / Output Token 分拆用量</li>
        <li>请求成功率和平均延迟趋势</li>
        <li>按时间范围过滤（今日/本周/本月/自定义）</li>
        <li>Tab 按 Output Tokens 自动排序，优先展示主力供应商</li>
      </ul>
      <ScreenShot src="/images/llm-simple-router/monitor.png" caption="实时请求监控 Dashboard" />

      <h2>监控内容</h2>
      <table>
        <thead><tr><th>指标</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td>活跃请求</td><td>当前正在处理的请求数量和详情，按 Provider 分组</td></tr>
          <tr><td>队列状态</td><td>各 Provider 的等待队列长度，信号量超时标记</td></tr>
          <tr><td>流式输出</td><td>实时查看 SSE 流式代理的输出内容</td></tr>
          <tr><td>请求统计</td><td>成功率、平均延迟等汇总数据</td></tr>
          <tr><td>工具错误日志</td><td>Tool Call 错误单独记录，辅助排查 LLM 工具调用问题</td></tr>
        </tbody>
      </table>

      <h2>访问方式</h2>
      <p>管理后台 &gt; 监控页面。页面自动通过 SSE 连接后端，实时推送更新数据。</p>
    </template>
    <template v-else>
      <h1>Live Monitor</h1>
      <p>The admin panel provides a Dashboard and real-time monitoring via SSE, pushing active requests, queue status, and streaming output — no page refresh needed.</p>

      <h2>Dashboard</h2>
      <p>The Dashboard organizes stats by Provider tabs, each tab displaying independent usage charts:</p>
      <ul>
        <li>Input / Output Token split usage</li>
        <li>Request success rate and average latency trends</li>
        <li>Time range filtering (today/week/month/custom)</li>
        <li>Tabs auto-sorted by Output Tokens, highlighting primary providers</li>
      </ul>
      <ScreenShot src="/images/llm-simple-router/monitor.png" caption="Live Monitor Dashboard" />

      <h2>Monitor Contents</h2>
      <table>
        <thead><tr><th>Metric</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Active Requests</td><td>Currently processing requests, grouped by Provider</td></tr>
          <tr><td>Queue Status</td><td>Wait queue length per Provider, with semaphore timeout markers</td></tr>
          <tr><td>Streaming Output</td><td>Real-time SSE streaming proxy output</td></tr>
          <tr><td>Request Stats</td><td>Success rate, average latency, and summary data</td></tr>
          <tr><td>Tool Error Logging</td><td>Dedicated tool call error log for debugging LLM tool invocation issues</td></tr>
        </tbody>
      </table>

      <h2>Access</h2>
      <p>Admin Panel &gt; Monitor page. The page auto-connects to backend via SSE for real-time updates.</p>
    </template>
  </div>
</template>
