<script setup lang="ts">
import ScreenShot from '../../../../components/ScreenShot.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>四阶段链路日志</h1>
    <p>Router 为每个请求记录完整的四阶段链路日志，覆盖请求的完整生命周期。</p>
    <ScreenShot src="/images/llm-simple-router/log.png" caption="请求日志页面" />
    <h2>四个阶段</h2>
    <table>
      <thead><tr><th>阶段</th><th>记录内容</th></tr></thead>
      <tbody>
        <tr><td>1. 客户端请求</td><td>请求时间、客户端模型名、请求 Token 数</td></tr>
        <tr><td>2. 上游请求</td><td>实际转发到的 Provider、后端模型名、请求头</td></tr>
        <tr><td>3. 上游响应</td><td>响应状态码、响应 Token 数、TTFT</td></tr>
        <tr><td>4. 客户端响应</td><td>最终返回给客户端的状态、总耗时、重试次数</td></tr>
      </tbody>
    </table>
    <h2>日志查看</h2>
    <p>管理后台 &gt; 请求日志页面。支持按时间范围、状态码、模型名等条件过滤。</p>
    <h2>重试和 Failover 标记</h2>
    <p>当请求经过重试或 Failover 时，日志会标记重试次数和切换的 Provider 信息。</p>
  </div>
</template>
