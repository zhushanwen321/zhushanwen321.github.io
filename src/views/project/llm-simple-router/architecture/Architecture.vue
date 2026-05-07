<script setup lang="ts">
import Mermaid from '../../../../components/Mermaid.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')

const contextDiagram = `graph LR
  Client["客户端<br/>Claude Code / Cursor"] -->|"API 请求<br/>Bearer Token"| Router["LLM Simple Router<br/>:9981"]
  Admin["管理员<br/>浏览器"] -->|"管理后台<br/>/admin"| Router
  Router -->|"模型映射 + 重试<br/>+ 并发控制"| Zhipu["智谱 GLM"]
  Router -->|"SSE 流式代理"| Moonshot["Moonshot Kimi"]
  Router -->|"JSON 响应"| Others["其他供应商..."]`

const flowDiagram = `sequenceDiagram
  participant C as 客户端
  participant R as Router
  participant P as 后端 Provider
  
  C->>R: POST /v1/messages (model: sonnet)
  R->>R: 验证 API Key
  R->>R: 调度层匹配 (时间窗口 + 映射规则)
  R->>R: 检查并发限制
  alt 未超限
    R->>P: 转发请求 (model: glm-5.1)
    P-->>R: SSE 流式响应
    R-->>C: 原样转发 SSE
  else 超限排队
    R-->>R: 等待信号量
  else 失败重试
    R->>P2: Failover 到备用 Provider
    P2-->>R: SSE 响应
    R-->>C: 原样转发 SSE
  end
  R->>R: 记录日志 + 指标`
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>架构原理</h1>
      <p>以下两图展示 Router 在整体系统中的位置以及核心请求处理流程。</p>

      <h2>系统上下文</h2>
      <p>Router 位于客户端和上游 LLM 供应商之间，同时提供管理后台。</p>
    </template>
    <template v-else>
      <h1>Architecture</h1>
      <p>Two diagrams showing the Router's position in the overall system and the core request processing flow.</p>

      <h2>System Context</h2>
      <p>The Router sits between clients and upstream LLM providers, with a built-in admin panel.</p>
    </template>

    <Mermaid :code="contextDiagram" />

    <template v-if="isZh">
      <h2>请求处理流程</h2>
      <p>一个请求从客户端到供应商的完整生命周期：认证 → 调度匹配 → 并发控制 → 代理转发 → Failover → 日志记录。</p>

      <h2>内部包结构（Monorepo）</h2>
      <table>
        <thead><tr><th>包名</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><code>@llm-router/core</code></td><td>核心模块库：并发控制、循环检测、日志、监控等可复用组件</td></tr>
          <tr><td><code>router</code></td><td>主路由服务：HTTP 代理、模型映射调度、Provider Patch 转换</td></tr>
          <tr><td><code>pi-extension</code></td><td>Pi 编码代理插件：对接 pi agent 平台</td></tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <h2>Request Processing Flow</h2>
      <p>The full lifecycle of a request from client to provider: Auth → Schedule Match → Concurrency → Proxy → Failover → Logging.</p>

      <h2>Internal Package Structure (Monorepo)</h2>
      <table>
        <thead><tr><th>Package</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>@llm-router/core</code></td><td>Core module library: concurrency, loop detection, logging, monitoring</td></tr>
          <tr><td><code>router</code></td><td>Main router service: HTTP proxy, model mapping scheduling, Provider Patch</td></tr>
          <tr><td><code>pi-extension</code></td><td>Pi coding agent extension for the pi agent platform</td></tr>
        </tbody>
      </table>
    </template>

    <Mermaid :code="flowDiagram" />
  </div>
</template>
