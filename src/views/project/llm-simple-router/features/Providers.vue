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
      <p>Router 支持配置多个后端 Provider，统一管理不同的 LLM API 供应商。每个 Provider 独立配置 Base URL、API Key、并发数、代理等参数。</p>
      <h2>支持的供应商</h2>
      <table>
        <thead><tr><th>供应商</th><th>说明</th><th>备注</th></tr></thead>
        <tbody>
          <tr><td>智谱（Zhipu）</td><td>GLM 系列模型</td><td>Coding Plan 自动填写 Base URL，支持 glm-5-turbo</td></tr>
          <tr><td>Moonshot</td><td>Kimi 系列模型</td><td>支持 kimi-for-coding，上下文窗口 256K</td></tr>
          <tr><td>Minimax</td><td>MiniMax 系列模型</td><td></td></tr>
          <tr><td>火山引擎</td><td>字节跳动云服务</td><td></td></tr>
          <tr><td>阿里云</td><td>通义千问系列</td><td></td></tr>
          <tr><td>腾讯云</td><td>混元系列</td><td></td></tr>
          <tr><td>OpenAI</td><td>GPT 系列</td><td></td></tr>
          <tr><td>Anthropic</td><td>Claude 系列</td><td></td></tr>
        </tbody>
      </table>
      <h2>添加 Provider</h2>
      <p>在管理后台 &gt; Provider 页面 &gt; 添加 Provider。选择 Coding Plan 后会自动填写 Base URL 和上下文窗口大小，只需填入 API Key。</p>

      <h2>upstream_path 自定义路径</h2>
      <p>部分 Provider 的 API 路径与标准 OpenAI 格式不同。Provider 支持配置 <code>upstream_path</code> 字段，自定义上游 API 的具体路径。例如 <code>/v1/chat/completions</code> 或供应商专属路径。</p>

      <h2>每模型流式超时</h2>
      <p>每个 Provider 下的模型支持独立设置 <code>stream_timeout_ms</code>（流式响应超时时间）。超时后 Router 返回 408 错误，在映射配置页面可以直观看到各模型的超时 badge。详见 <router-link to="/project/llm-simple-router/guide/features/model-mapping">模型映射</router-link>。</p>

      <h2>网络代理</h2>
      <p>Provider 级支持 SOCKS5 / HTTPS 代理配置。在 Provider 编辑弹窗中可设置代理类型、主机、端口和认证信息。详见 <router-link to="/project/llm-simple-router/guide/features/proxy">网络代理</router-link>。</p>

      <h2>并发控制</h2>
      <p>每个 Provider 可独立配置并发数上限，支持固定值和自适应动态调整。详见 <router-link to="/project/llm-simple-router/guide/features/concurrency">并发控制</router-link>。</p>
    </template>
    <template v-else>
      <h1>Multi-Provider Support</h1>
      <p>The Router supports multiple backend Providers with unified management of different LLM API vendors. Each Provider is independently configured with Base URL, API Key, concurrency, proxy, etc.</p>
      <h2>Supported Providers</h2>
      <table>
        <thead><tr><th>Provider</th><th>Description</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Zhipu</td><td>GLM series models</td><td>Coding Plan auto-fills Base URL, supports glm-5-turbo</td></tr>
          <tr><td>Moonshot</td><td>Kimi series models</td><td>Supports kimi-for-coding, 256K context window</td></tr>
          <tr><td>Minimax</td><td>MiniMax series models</td><td></td></tr>
          <tr><td>Volcengine</td><td>ByteDance cloud service</td><td></td></tr>
          <tr><td>Alibaba Cloud</td><td>Tongyi Qianwen series</td><td></td></tr>
          <tr><td>Tencent Cloud</td><td>Hunyuan series</td><td></td></tr>
          <tr><td>OpenAI</td><td>GPT series</td><td></td></tr>
          <tr><td>Anthropic</td><td>Claude series</td><td></td></tr>
        </tbody>
      </table>
      <h2>Adding a Provider</h2>
      <p>Admin Panel &gt; Provider page &gt; Add Provider. Selecting a Coding Plan auto-fills Base URL and context window size — just enter the API Key.</p>

      <h2>upstream_path Custom Path</h2>
      <p>Some Providers have API paths that differ from the standard OpenAI format. Configure <code>upstream_path</code> to customize the upstream API path, e.g. <code>/v1/chat/completions</code> or a vendor-specific path.</p>

      <h2>Per-Model Stream Timeout</h2>
      <p>Each model under a Provider supports a custom <code>stream_timeout_ms</code> (streaming response timeout). On timeout the Router returns a 408 error. Timeout badges are displayed on the mapping config page. See <router-link to="/project/llm-simple-router/guide/features/model-mapping">Model Mapping</router-link>.</p>

      <h2>Network Proxy</h2>
      <p>Per-Provider SOCKS5/HTTPS proxy configuration. Set proxy type, host, port, and authentication in the Provider edit dialog. See <router-link to="/project/llm-simple-router/guide/features/proxy">Network Proxy</router-link>.</p>

      <h2>Concurrency Control</h2>
      <p>Each Provider can have independent concurrency limits with fixed or adaptive modes. See <router-link to="/project/llm-simple-router/guide/features/concurrency">Concurrency Control</router-link>.</p>
    </template>
  </div>
</template>
