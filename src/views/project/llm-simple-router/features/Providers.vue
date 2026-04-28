<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>多供应商支持</h1>
      <p>Router 支持配置多个后端 Provider，统一管理不同的 LLM API 供应商。每个 Provider 独立配置 Base URL、API Key、并发数等参数。</p>
      <h2>支持的供应商</h2>
      <table>
        <thead><tr><th>供应商</th><th>说明</th><th>备注</th></tr></thead>
        <tbody>
          <tr><td>智谱（Zhipu）</td><td>GLM 系列模型</td><td>Coding Plan 自动填写 Base URL</td></tr>
          <tr><td>Moonshot</td><td>Kimi 系列模型</td><td>支持 kimi-for-coding</td></tr>
          <tr><td>Minimax</td><td>MiniMax 系列模型</td><td></td></tr>
          <tr><td>火山引擎</td><td>字节跳动云服务</td><td></td></tr>
          <tr><td>阿里云</td><td>通义千问系列</td><td></td></tr>
          <tr><td>腾讯云</td><td>混元系列</td><td></td></tr>
          <tr><td>OpenAI</td><td>GPT 系列</td><td></td></tr>
          <tr><td>Anthropic</td><td>Claude 系列</td><td></td></tr>
        </tbody>
      </table>
      <h2>添加 Provider</h2>
      <p>在管理后台 &gt; Provider 页面 &gt; 添加 Provider。选择 Coding Plan 后会自动填写 Base URL，只需填入 API Key。</p>
      <h2>并发控制</h2>
      <p>每个 Provider 可独立配置并发数上限。超过并发限制的请求会排队等待，不会丢失。队列满时返回 503，等待超时返回 504。</p>
    </template>
    <template v-else>
      <h1>Multi-Provider Support</h1>
      <p>The Router supports multiple backend Providers, unified management of different LLM API vendors. Each Provider is independently configured with Base URL, API Key, concurrency limit, etc.</p>
      <h2>Supported Providers</h2>
      <table>
        <thead><tr><th>Provider</th><th>Description</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Zhipu</td><td>GLM series models</td><td>Coding Plan auto-fills Base URL</td></tr>
          <tr><td>Moonshot</td><td>Kimi series models</td><td>Supports kimi-for-coding</td></tr>
          <tr><td>Minimax</td><td>MiniMax series models</td><td></td></tr>
          <tr><td>Volcengine</td><td>ByteDance cloud service</td><td></td></tr>
          <tr><td>Alibaba Cloud</td><td>Tongyi Qianwen series</td><td></td></tr>
          <tr><td>Tencent Cloud</td><td>Hunyuan series</td><td></td></tr>
          <tr><td>OpenAI</td><td>GPT series</td><td></td></tr>
          <tr><td>Anthropic</td><td>Claude series</td><td></td></tr>
        </tbody>
      </table>
      <h2>Adding a Provider</h2>
      <p>Admin Panel &gt; Provider page &gt; Add Provider. Selecting a Coding Plan auto-fills the Base URL — just enter the API Key.</p>
      <h2>Concurrency Control</h2>
      <p>Each Provider can have independent concurrency limits. Requests exceeding the limit are queued. Queue full returns 503, timeout returns 504.</p>
    </template>
  </div>
</template>
