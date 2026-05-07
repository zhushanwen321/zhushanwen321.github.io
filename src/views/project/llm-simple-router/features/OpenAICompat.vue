<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>OpenAI 兼容 API</h1>
      <p>
        Router 完整兼容 OpenAI API 格式，支持 <code>/v1/chat/completions</code> 和新增的
        <code>/v1/responses</code> 端点。无论使用哪个后端 Provider，客户端都能以标准 OpenAI SDK 进行调用。
      </p>

      <h2>支持的端点</h2>
      <table>
        <thead><tr><th>端点</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><code>/v1/chat/completions</code></td><td>标准 Chat Completions API（始终支持）</td></tr>
          <tr><td><code>/v1/responses</code></td><td>OpenAI Responses API（v0.9.2 新增）</td></tr>
        </tbody>
      </table>

      <h2>Provider Patch 重写</h2>
      <p>
        Router 内置 Provider Patch 机制，自动将 OpenAI 格式的请求转换为各 Provider 的原生格式，
        并将响应转回 OpenAI 兼容格式。支持流式和非流式。
      </p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          OpenAI SDK 请求 → Router 接收<br>
          → Provider Patch 转换（OpenAI → 供应商原生格式）<br>
          → 发送到供应商<br>
          → 响应 Patch 转换（供应商格式 → OpenAI）<br>
          → 返回给客户端
        </code>
      </div>

      <h2>Response Cleaner</h2>
      <p>
        自动清理供应商响应中的非标准字段，确保返回的 JSON 结构与 OpenAI 规范一致，避免客户端解析错误。
      </p>

      <h2>使用方式</h2>
      <p>
        客户端无需任何修改，将 <code>base_url</code> 指向 Router 即可。
        例如：<code>http://localhost:9981/v1</code>。Claude Code、Cursor、OpenAI SDK 等均可直接使用。
      </p>
    </template>

    <template v-else>
      <h1>OpenAI Compatible API</h1>
      <p>
        The Router is fully compatible with OpenAI API format, supporting both
        <code>/v1/chat/completions</code> and the new <code>/v1/responses</code> endpoint.
        Clients use the standard OpenAI SDK regardless of the backend provider.
      </p>

      <h2>Supported Endpoints</h2>
      <table>
        <thead><tr><th>Endpoint</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>/v1/chat/completions</code></td><td>Standard Chat Completions API (always supported)</td></tr>
          <tr><td><code>/v1/responses</code></td><td>OpenAI Responses API (new in v0.9.2)</td></tr>
        </tbody>
      </table>

      <h2>Provider Patch Rewrite</h2>
      <p>
        The Router has a built-in Provider Patch mechanism that automatically converts
        OpenAI-format requests to each Provider's native format, and converts responses back
        to OpenAI-compatible format. Both streaming and non-streaming are supported.
      </p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          OpenAI SDK request → Router receives<br>
          → Provider Patch (OpenAI → Provider native format)<br>
          → Send to Provider<br>
          → Response Patch (Provider format → OpenAI)<br>
          → Return to client
        </code>
      </div>

      <h2>Response Cleaner</h2>
      <p>
        Automatically strips non-standard fields from provider responses, ensuring
        returned JSON matches the OpenAI spec and avoiding client-side parse errors.
      </p>

      <h2>Usage</h2>
      <p>
        No client-side changes needed — point <code>base_url</code> to the Router.
        Example: <code>http://localhost:9981/v1</code>. Works with Claude Code, Cursor, OpenAI SDK, etc.
      </p>
    </template>
  </div>
</template>
