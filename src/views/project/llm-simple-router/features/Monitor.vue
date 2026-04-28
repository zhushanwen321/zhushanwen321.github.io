<script setup lang="ts">
import ScreenShot from '../../../../components/ScreenShot.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>实时监控</h1>
    <p>管理后台提供实时请求监控功能，通过 SSE 推送活跃请求、队列状态、流式输出等内容，无需刷新页面。</p>
    <ScreenShot src="/images/llm-simple-router/monitor.png" caption="实时请求监控" />
    <h2>监控内容</h2>
    <table>
      <thead><tr><th>指标</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>活跃请求</td><td>当前正在处理的请求数量和详情</td></tr>
        <tr><td>队列状态</td><td>各 Provider 的等待队列长度</td></tr>
        <tr><td>流式输出</td><td>实时查看 SSE 流式代理的输出内容</td></tr>
        <tr><td>请求统计</td><td>成功率、平均延迟等汇总数据</td></tr>
      </tbody>
    </table>
    <h2>访问方式</h2>
    <p>管理后台 &gt; 监控页面。页面自动通过 SSE 连接后端，实时推送更新数据。</p>
  </div>
</template>
