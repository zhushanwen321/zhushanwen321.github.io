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
      <h1>模型映射</h1>
      <p>核心概念：客户端请求携带模型名 A，Router 根据映射规则将其替换为后端 Provider 支持的模型名 B，然后转发请求。</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">Claude Code (模型 A) → Router (A → B) → Provider API (模型 B)</code>
      </div>
      <h2>基础映射</h2>
      <p>只需在映射表中配置「客户端模型 = A，后端模型 = B，选择供应商」即可。Claude Code 默认使用 <code>opus</code>、<code>sonnet</code>、<code>haiku</code>。</p>
      <ScreenShot src="/images/llm-simple-router/model_mapping.png" caption="模型映射配置" />
      <h2>分时段映射</h2>
      <p>按时间段自动切换后端模型。例如高峰期切到 Kimi，低谷期切回 GLM：</p>
      <table>
        <thead><tr><th>客户端模型</th><th>后端模型</th><th>供应商</th><th>时间窗口</th></tr></thead>
        <tbody>
          <tr><td>sonnet</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>00:00-14:00</td></tr>
          <tr><td>sonnet</td><td>kimi-for-coding</td><td>Moonshot</td><td>14:00-18:00</td></tr>
          <tr><td>sonnet</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>18:00-24:00</td></tr>
        </tbody>
      </table>
      <h2>路由策略</h2>
      <table>
        <thead><tr><th>策略</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td>Scheduled（定时）</td><td>按时间窗口切换</td></tr>
          <tr><td>Round-Robin（轮询）</td><td>依次轮换各 Provider</td></tr>
          <tr><td>Random（随机）</td><td>随机选择 Provider</td></tr>
          <tr><td>Failover（故障转移）</td><td>优先第一个，失败切换下一个</td></tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <h1>Model Mapping</h1>
      <p>Core concept: the client sends request with model name A. Router replaces it with model name B supported by the backend Provider, then forwards the request.</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">Claude Code (Model A) → Router (A → B) → Provider API (Model B)</code>
      </div>
      <h2>Basic Mapping</h2>
      <p>Simply configure "client model = A, backend model = B, select provider" in the mapping table. Claude Code defaults to <code>opus</code>, <code>sonnet</code>, <code>haiku</code> model names.</p>
      <ScreenShot src="/images/llm-simple-router/model_mapping.png" caption="Model Mapping Configuration" />
      <h2>Time-based Mapping</h2>
      <p>Auto-switch backend models by time window. e.g. switch to Kimi during peak hours, back to GLM during off-peak:</p>
      <table>
        <thead><tr><th>Client Model</th><th>Backend Model</th><th>Provider</th><th>Time Window</th></tr></thead>
        <tbody>
          <tr><td>sonnet</td><td>glm-5.1</td><td>Zhipu Coding Plan</td><td>00:00-14:00</td></tr>
          <tr><td>sonnet</td><td>kimi-for-coding</td><td>Moonshot</td><td>14:00-18:00</td></tr>
          <tr><td>sonnet</td><td>glm-5.1</td><td>Zhipu Coding Plan</td><td>18:00-24:00</td></tr>
        </tbody>
      </table>
      <h2>Routing Strategies</h2>
      <table>
        <thead><tr><th>Strategy</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Scheduled</td><td>Switch by time window</td></tr>
          <tr><td>Round-Robin</td><td>Rotate through providers in order</td></tr>
          <tr><td>Random</td><td>Randomly select a provider</td></tr>
          <tr><td>Failover</td><td>Try first, fall back to next on failure</td></tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
