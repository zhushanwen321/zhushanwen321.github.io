<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>网络代理</h1>
      <p>
        为每个 Provider 独立配置 SOCKS5 或 HTTPS 代理，让 Router 通过代理服务器访问后端 API。
        适用于需要通过代理上网的网络环境。
      </p>

      <h2>工作原理</h2>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          客户端 → Router → SOCKS5/HTTPS 代理 → 上游 Provider API<br>
          支持 socks-proxy-agent / https-proxy-agent 两种代理协议
        </code>
      </div>

      <h2>配置方式</h2>
      <p>
        在管理后台的 <strong>Provider 编辑弹窗</strong> 中，可以配置代理信息：
      </p>
      <ul>
        <li><strong>代理类型</strong>：SOCKS5 或 HTTPS</li>
        <li><strong>代理主机</strong>：代理服务器地址</li>
        <li><strong>代理端口</strong>：代理服务器端口</li>
        <li><strong>认证信息</strong>：用户名和密码（可选）</li>
      </ul>

      <h2>数据库支持</h2>
      <p>
        providers 表增加代理相关字段（migration 041），包括 <code>proxy_type</code>、<code>proxy_host</code>、
        <code>proxy_port</code>、<code>proxy_username</code>、<code>proxy_password</code>。
      </p>

      <h2>使用场景</h2>
      <ul>
        <li>企业内网需要通过代理访问外网 API</li>
        <li>使用 SOCKS5 代理访问受限区域的 API</li>
        <li>部分供应商仅支持特定网络出口</li>
      </ul>

      <h2>依赖</h2>
      <p>代理功能依赖 <code>socks-proxy-agent</code> 和 <code>https-proxy-agent</code> 两个 npm 包，安装 Router 时自动包含。</p>
    </template>

    <template v-else>
      <h1>Network Proxy</h1>
      <p>
        Configure SOCKS5 or HTTPS proxy per Provider, enabling the Router to access backend APIs
        through a proxy server. Ideal for network environments that require proxied outbound connections.
      </p>

      <h2>How It Works</h2>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          Client → Router → SOCKS5/HTTPS Proxy → Upstream Provider API<br>
          Supports both socks-proxy-agent and https-proxy-agent
        </code>
      </div>

      <h2>Configuration</h2>
      <p>
        In the admin panel's <strong>Provider Edit Dialog</strong>, configure proxy settings:
      </p>
      <ul>
        <li><strong>Proxy Type</strong>: SOCKS5 or HTTPS</li>
        <li><strong>Proxy Host</strong>: Proxy server address</li>
        <li><strong>Proxy Port</strong>: Proxy server port</li>
        <li><strong>Authentication</strong>: Username and password (optional)</li>
      </ul>

      <h2>Database</h2>
      <p>
        The providers table includes proxy-related columns (migration 041):
        <code>proxy_type</code>, <code>proxy_host</code>, <code>proxy_port</code>,
        <code>proxy_username</code>, <code>proxy_password</code>.
      </p>

      <h2>Use Cases</h2>
      <ul>
        <li>Corporate networks requiring proxy for external API access</li>
        <li>SOCKS5 proxy for accessing region-restricted APIs</li>
        <li>Providers that require specific network egress</li>
      </ul>

      <h2>Dependencies</h2>
      <p>Proxy support uses <code>socks-proxy-agent</code> and <code>https-proxy-agent</code> npm packages, included automatically.</p>
    </template>
  </div>
</template>
