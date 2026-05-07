<script setup lang="ts">
import { computed } from 'vue'
import CodeBlock from '../../../../components/CodeBlock.vue'
import ScreenShot from '../../../../components/ScreenShot.vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')

const shellAlias = `alias clode='\\
export ANTHROPIC_AUTH_TOKEN="sk-router-你的密钥" && \\
export ANTHROPIC_BASE_URL="http://127.0.0.1:9981" && \\
claude'`

const settingsJson = `{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-router-你的密钥",
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:9981"
  }
}`

const shellAliasEn = `alias clode='\\
export ANTHROPIC_AUTH_TOKEN="sk-router-your-key" && \\
export ANTHROPIC_BASE_URL="http://127.0.0.1:9981" && \\
claude'`

const settingsJsonEn = `{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-router-your-key",
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:9981"
  }
}`
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>快速上手</h1>
      <p class="text-lg text-gray-400">6 步完成配置，让 Claude Code 走 Router 代理。</p>

      <h2>第 1 步：安装并启动</h2>
      <CodeBlock code="npx llm-simple-router" language="bash" />
      <p>启动后访问 <code>http://localhost:9981/admin</code>，首次进入 Setup 页面设置管理员密码。数据存储在 <code>~/.llm-simple-router/</code>。</p>
      <ScreenShot src="/images/llm-simple-router/dashboard.png" caption="Setup 完成后进入 Dashboard" />

      <h2>第 2 步：添加供应商</h2>
      <p>管理后台 → <strong>Provider</strong> 页面 → 添加 Provider。选择 Coding Plan 后会自动填写 Base URL 和上下文窗口，只需填入 API Key。</p>
      <ScreenShot src="/images/llm-simple-router/provider_concurrency.png" caption="Provider 管理页面" />
      <p>支持的供应商：智谱（GLM 系列含 glm-5-turbo）、Moonshot（Kimi，256K 上下文）、Minimax、火山引擎、阿里云、腾讯云、OpenAI、Anthropic。</p>

      <h2>第 3 步：配置模型映射</h2>
      <p>客户端使用 <strong>模型名 A</strong> 请求，Router 将其转换为后端供应商支持的 <strong>模型名 B</strong>：</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">Claude Code (模型 A) → Router (A → B) → Provider API (模型 B)</code>
      </div>
      <p>Claude Code 默认使用模型名 <code>opus</code>、<code>sonnet</code>、<code>haiku</code>。典型配置：</p>
      <table>
        <thead><tr><th>客户端模型</th><th>后端模型</th><th>供应商</th><th>时间窗口</th></tr></thead>
        <tbody>
          <tr><td>opus</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>全天</td></tr>
          <tr><td>sonnet</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>全天</td></tr>
          <tr><td>haiku</td><td>glm-5-turbo</td><td>智谱 Coding Plan</td><td>全天</td></tr>
        </tbody>
      </table>
      <ScreenShot src="/images/llm-simple-router/model_mapping.png" caption="模型映射配置页面" />

      <h2>第 4 步：设置并发限制</h2>
      <p>在 Provider 页面为每个供应商设置最大并发数。建议：智谱 Coding Plan 设为 5，其他按供应商 API 限制调整。启用自适应模式后 Router 自动优化。</p>

      <h2>第 5 步：配置 Claude Code</h2>
      <p>在管理后台创建 Router API 密钥（<code>sk-router-xxx</code>），然后选择一种方式：</p>

      <h3>方式一：Shell Alias（推荐）</h3>
      <p>在 <code>~/.zshrc</code> 或 <code>~/.bashrc</code> 中添加：</p>
      <CodeBlock :code="shellAlias" language="bash" />

      <h3>方式二：settings.json</h3>
      <p>在 <code>~/.claude/settings.json</code> 中添加：</p>
      <CodeBlock :code="settingsJson" language="json" />

      <p>详见 <router-link to="/project/llm-simple-router/guide/config/claude-code">Claude Code 配置</router-link>。</p>

      <h2>第 6 步：验证</h2>
      <p>启动 Claude Code（如果用了 alias，执行 <code>clode</code>），发送一条消息。在管理后台 <router-link to="/project/llm-simple-router/guide/features/monitor">实时监控</router-link> 页面应能看到请求记录。</p>
      <p>如果遇到问题，查看 <router-link to="/project/llm-simple-router/guide/faq">常见问题</router-link>。</p>
    </template>

    <template v-else>
      <h1>Getting Started</h1>
      <p class="text-lg text-gray-400">6 steps to route Claude Code through Router.</p>

      <h2>Step 1: Install &amp; Start</h2>
      <CodeBlock code="npx llm-simple-router" language="bash" />
      <p>After starting, visit <code>http://localhost:9981/admin</code>. First access goes to the Setup page to set an admin password. Data is stored in <code>~/.llm-simple-router/</code>.</p>
      <ScreenShot src="/images/llm-simple-router/dashboard.png" caption="Dashboard after Setup" />

      <h2>Step 2: Add a Provider</h2>
      <p>Admin Panel → <strong>Provider</strong> page → Add Provider. Select a Coding Plan to auto-fill Base URL and context window — just enter your API Key.</p>
      <ScreenShot src="/images/llm-simple-router/provider_concurrency.png" caption="Provider Management" />
      <p>Supported providers: Zhipu (GLM series incl. glm-5-turbo), Moonshot (Kimi, 256K context), Minimax, Volcengine, Alibaba Cloud, Tencent Cloud, OpenAI, Anthropic.</p>

      <h2>Step 3: Configure Model Mapping</h2>
      <p>Client sends <strong>model name A</strong>, Router maps it to <strong>model name B</strong> supported by the backend Provider:</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">Claude Code (Model A) → Router (A → B) → Provider API (Model B)</code>
      </div>
      <p>Claude Code defaults to model names <code>opus</code>, <code>sonnet</code>, <code>haiku</code>. A typical config:</p>
      <table>
        <thead><tr><th>Client Model</th><th>Backend Model</th><th>Provider</th><th>Time Window</th></tr></thead>
        <tbody>
          <tr><td>opus</td><td>glm-5.1</td><td>Zhipu Coding Plan</td><td>All day</td></tr>
          <tr><td>sonnet</td><td>glm-5.1</td><td>Zhipu Coding Plan</td><td>All day</td></tr>
          <tr><td>haiku</td><td>glm-5-turbo</td><td>Zhipu Coding Plan</td><td>All day</td></tr>
        </tbody>
      </table>
      <ScreenShot src="/images/llm-simple-router/model_mapping.png" caption="Model Mapping Configuration" />

      <h2>Step 4: Set Concurrency Limits</h2>
      <p>On the Provider page, set max concurrency per provider. Suggested: Zhipu Coding Plan 5, others per their API limits. Enable adaptive mode for auto-optimization.</p>

      <h2>Step 5: Configure Claude Code</h2>
      <p>Create a Router API key in Admin Panel (<code>sk-router-xxx</code>), then choose one method:</p>

      <h3>Method 1: Shell Alias (Recommended)</h3>
      <p>Add to <code>~/.zshrc</code> or <code>~/.bashrc</code>:</p>
      <CodeBlock :code="shellAliasEn" language="bash" />

      <h3>Method 2: settings.json</h3>
      <p>Add to <code>~/.claude/settings.json</code>:</p>
      <CodeBlock :code="settingsJsonEn" language="json" />

      <p>See <router-link to="/project/llm-simple-router/guide/config/claude-code">Claude Code Setup</router-link> for details.</p>

      <h2>Step 6: Verify</h2>
      <p>Start Claude Code (use <code>clode</code> if you set up the alias), send a message. Check the <router-link to="/project/llm-simple-router/guide/features/monitor">Live Monitor</router-link> page for the request.</p>
      <p>If issues arise, check the <router-link to="/project/llm-simple-router/guide/faq">FAQ</router-link>.</p>
    </template>
  </div>
</template>
