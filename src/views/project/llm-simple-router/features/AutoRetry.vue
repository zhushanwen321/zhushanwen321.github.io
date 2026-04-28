<script setup lang="ts">
import CodeBlock from '../../../../components/CodeBlock.vue'
import ScreenShot from '../../../../components/ScreenShot.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>自动重试</h1>
    <p>
      当后端 Provider 返回 429（限流）、400（特定错误）或网络超时时，Router 自动按重试规则进行指数退避重试，无需手动干预。
    </p>
    <h2>重试策略</h2>
    <table>
      <thead><tr><th>策略</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>Fixed（固定间隔）</td><td>每次重试等待固定时间</td></tr>
        <tr><td>Exponential（指数退避）</td><td>每次重试等待时间翻倍，避免雪崩</td></tr>
      </tbody>
    </table>
    <h2>重试规则配置</h2>
    <p>在管理后台的重试规则页面，可以按状态码配置是否重试、重试策略、最大重试次数、基础延迟等参数。</p>
    <ScreenShot src="/images/llm-simple-router/retry.png" caption="重试规则配置" />
    <h2>重试流程</h2>
    <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
      <code class="text-sm font-mono text-gray-300 block leading-loose">
        请求发送 → 收到 429/400/超时<br>
        → 判断是否可重试（匹配重试规则）<br>
        → 等待（fixed 或 exponential 退避）<br>
        → 重新发送请求<br>
        → 重复直到成功或达到最大重试次数
      </code>
    </div>
    <h2>相关环境变量</h2>
    <table>
      <thead><tr><th>变量</th><th>默认值</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>RETRY_MAX_ATTEMPTS</code></td><td>3</td><td>最大重试次数</td></tr>
        <tr><td><code>RETRY_BASE_DELAY_MS</code></td><td>1000</td><td>重试基础延迟（ms）</td></tr>
      </tbody>
    </table>
  </div>
</template>
