<script setup lang="ts">
import { computed } from 'vue'
import CodeBlock from '../../../components/CodeBlock.vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>LLM Simple Router</h1>
      <p class="text-lg text-gray-400">
        LLM API 代理路由器。接收 Claude Code / Cursor 等客户端请求，通过模型映射和路由策略转发到配置的后端 Provider，支持流式（SSE）和非流式代理。
      </p>

      <h2>解决的核心问题</h2>
      <ul>
        <li>国产模型限流频繁，影响开发效率</li>
        <li>多供应商切换麻烦，手动改配置成本高</li>
        <li>并发控制缺失，多项目同时使用容易撞限</li>
      </ul>

      <h2>适合谁</h2>
      <ul>
        <li>用 Claude Code 配合国产模型（智谱、Moonshot、Minimax 等）的开发者</li>
        <li>希望自动重试限流错误、分时段切换模型、控制并发排队</li>
        <li>想要一个开箱即用的方案，不折腾</li>
      </ul>

      <h2>快速体验</h2>
      <p>
        访问 <code>http://localhost:9981/admin</code>，首次进入 Setup 页面设置管理员密码。数据存储在 <code>~/.llm-simple-router/</code>。
      </p>

      <h2>工作原理</h2>
      <div class="not-prose my-6 rounded-lg border border-white/10 bg-surface-50 p-6">
        <code class="text-sm font-mono text-gray-300">
          Claude Code → Router (模型映射 + 自动重试 + 并发控制) → 智谱 GLM / Kimi / 其他供应商
        </code>
      </div>
      <p>
        Router 根据模型映射找到后端供应商 → 转发请求 → 自动重试失败请求 → 记录日志和性能指标 → 返回响应。
      </p>

      <h2>功能一览</h2>
      <table>
        <thead>
          <tr><th>功能</th><th>说明</th></tr>
        </thead>
        <tbody>
          <tr><td>自动重试</td><td>对 429/400/1305(ZAI过载)/网络超时自动指数退避重试，支持状态码级可配置规则</td></tr>
          <tr><td>多供应商支持</td><td>智谱、Moonshot、Minimax、火山引擎、阿里云、腾讯云等，支持自定义 upstream_path</td></tr>
          <tr><td>模型分时段调度</td><td>按时间段自动切换后端模型，支持 transform_rule，可视化 pipeline 编辑器</td></tr>
          <tr><td>自适应并发控制</td><td>根据上游响应时间动态调整并发度，超限排队，信号量机制</td></tr>
          <tr><td>LLM 循环检测</td><td>N-gram 算法检测输出循环，自动中断，节省 Token</td></tr>
          <tr><td>Failover 故障转移</td><td>多 Provider 互备，失败自动切换下一个</td></tr>
          <tr><td>每模型流式超时</td><td>按模型粒度配置 stream_timeout_ms，超时 408 错误返回</td></tr>
          <tr><td>网络代理</td><td>Provider 级别配置 SOCKS5 / HTTPS 代理，支持认证</td></tr>
          <tr><td>实时请求监控</td><td>Dashboard 按 Provider 分 Tab，SSE 推送活跃请求、队列状态</td></tr>
          <tr><td>多密钥管理</td><td>独立密钥 + 模型白名单，支持多用户/多项目</td></tr>
          <tr><td>请求日志</td><td>四阶段完整链路 + 分页 + 工具错误日志</td></tr>
          <tr><td>性能指标</td><td>TTFT、TPS、Token 用量（Input/Output 分拆）、缓存命中率</td></tr>
          <tr><td>OpenAI 兼容</td><td>/v1/chat/completions + /v1/responses 端点，Provider Patch 自动转换</td></tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <h1>LLM Simple Router</h1>
      <p class="text-lg text-gray-400">
        An LLM API proxy router. Receives requests from clients like Claude Code and Cursor, forwards them to configured backend Providers via model mapping and routing strategies. Supports both streaming (SSE) and non-streaming proxy.
      </p>

      <h2>Core Problems Solved</h2>
      <ul>
        <li>Domestic model rate limiting is frequent, hurting development efficiency</li>
        <li>Switching between multiple providers is tedious with high manual config cost</li>
        <li>Lack of concurrency control causes rate limit collisions across projects</li>
      </ul>

      <h2>Who Is This For</h2>
      <ul>
        <li>Developers using Claude Code with domestic models (Zhipu, Moonshot, Minimax, etc.)</li>
        <li>Those who want automatic retry for rate limits, time-based model switching, and concurrency queuing</li>
        <li>Those who want a ready-to-use solution with zero hassle</li>
      </ul>

      <h2>Quick Start</h2>
      <p>
        Visit <code>http://localhost:9981/admin</code> and set up an admin password on the Setup page. Data is stored in <code>~/.llm-simple-router/</code>.
      </p>

      <h2>How It Works</h2>
      <div class="not-prose my-6 rounded-lg border border-white/10 bg-surface-50 p-6">
        <code class="text-sm font-mono text-gray-300">
          Claude Code → Router (Model Mapping + Auto Retry + Concurrency Control) → Zhipu GLM / Kimi / Other Providers
        </code>
      </div>
      <p>
        Router finds the backend provider via model mapping → forwards request → auto-retries on failure → logs request and performance metrics → returns response.
      </p>

      <h2>Feature Overview</h2>
      <table>
        <thead>
          <tr><th>Feature</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>Auto Retry</td><td>Exponential backoff for 429/400/1305(ZAI overload)/timeout, per-status-code rules</td></tr>
          <tr><td>Multi-Provider</td><td>Zhipu, Moonshot, Minimax, Volcengine, Alibaba Cloud, Tencent Cloud, etc. + custom upstream_path</td></tr>
          <tr><td>Time-based Model Scheduling</td><td>Auto-switch by time window + transform_rule, visual pipeline editor</td></tr>
          <tr><td>Adaptive Concurrency</td><td>Dynamic concurrency based on upstream response time, semaphore queuing</td></tr>
          <tr><td>LLM Loop Detection</td><td>N-gram algorithm detects output loops, auto-interrupt to save tokens</td></tr>
          <tr><td>Failover</td><td>Multi-provider backup, auto-switch on failure</td></tr>
          <tr><td>Per-Model Stream Timeout</td><td>Model-level stream_timeout_ms config with 408 error response</td></tr>
          <tr><td>Network Proxy</td><td>Per-Provider SOCKS5/HTTPS proxy configuration with authentication</td></tr>
          <tr><td>Live Monitor</td><td>Dashboard with per-Provider tabs, SSE-pushed active requests and queue status</td></tr>
          <tr><td>Multi-Key</td><td>Independent API keys with model whitelists for multi-user/multi-project</td></tr>
          <tr><td>Request Logging</td><td>Complete four-stage pipeline + pagination + tool error logging</td></tr>
          <tr><td>Performance Metrics</td><td>TTFT, TPS, split input/output token usage, cache hit rate</td></tr>
          <tr><td>OpenAI Compatible</td><td>/v1/chat/completions + /v1/responses endpoints, Provider Patch auto-conversion</td></tr>
        </tbody>
      </table>
    </template>

    <!-- Shared components outside v-if -->
    <CodeBlock code="npx llm-simple-router" language="bash" />
  </div>
</template>
