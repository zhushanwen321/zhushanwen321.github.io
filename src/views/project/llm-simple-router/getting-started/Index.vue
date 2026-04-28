<script setup lang="ts">
import { computed } from 'vue'
import CodeBlock from '../../../../components/CodeBlock.vue'
import ScreenShot from '../../../../components/ScreenShot.vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>启动 Router</h1>

      <h2>1. 安装并启动</h2>
      <p>
        启动后访问 <code>http://localhost:9981/admin</code>，首次进入 Setup 页面设置管理员密码。数据存储在 <code>~/.llm-simple-router/</code>。
      </p>

      <h2>2. 添加 Provider</h2>
      <p>
        管理后台 &gt; Provider 页面 &gt; 添加 Provider。选择 Coding Plan 后会自动填写 Base URL，只需填入 API Key。
      </p>

      <h2>3. 配置模型映射</h2>
      <p>
        核心概念：客户端请求携带模型名 A，Router 根据映射规则将其替换为后端 Provider 支持的模型名 B，然后转发请求：
      </p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">
          Claude Code (模型 A) → Router (A → B) → Provider API (模型 B)
        </code>
      </div>

      <p>Claude Code 未设置环境变量时，默认使用模型名 <code>opus</code>、<code>sonnet</code>、<code>haiku</code>。典型映射配置：</p>
      <table>
        <thead>
          <tr><th>客户端模型</th><th>后端模型</th><th>供应商</th><th>时间窗口</th></tr>
        </thead>
        <tbody>
          <tr><td>opus</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>全天</td></tr>
          <tr><td>sonnet</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>全天</td></tr>
          <tr><td>haiku</td><td>glm-5-turbo</td><td>智谱 Coding Plan</td><td>全天</td></tr>
        </tbody>
      </table>

      <h2>4. 配置 Claude Code</h2>
      <p>在管理后台创建 Router API 密钥，然后选择一种方式配置。详见 <router-link to="/project/llm-simple-router/guide/config/claude-code">Claude Code 配置</router-link> 页面。</p>

      <h2>5. 开始使用</h2>
    </template>
    <template v-else>
      <h1>Starting the Router</h1>

      <h2>1. Install &amp; Start</h2>
      <p>
        After starting, visit <code>http://localhost:9981/admin</code> and set up an admin password on first access. Data is stored in <code>~/.llm-simple-router/</code>.
      </p>

      <h2>2. Add a Provider</h2>
      <p>
        Admin Panel &gt; Provider page &gt; Add Provider. Selecting a Coding Plan auto-fills the Base URL — just enter your API Key.
      </p>

      <h2>3. Configure Model Mapping</h2>
      <p>
        Core concept: the client sends a request with model name A. Router replaces it with model name B supported by the backend Provider, then forwards the request:
      </p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">
          Claude Code (Model A) → Router (A → B) → Provider API (Model B)
        </code>
      </div>

      <p>When Claude Code has no environment variable set, it defaults to model names <code>opus</code>, <code>sonnet</code>, <code>haiku</code>. A typical mapping config:</p>
      <table>
        <thead>
          <tr><th>Client Model</th><th>Backend Model</th><th>Provider</th><th>Time Window</th></tr>
        </thead>
        <tbody>
          <tr><td>opus</td><td>glm-5.1</td><td>Zhipu Coding Plan</td><td>All day</td></tr>
          <tr><td>sonnet</td><td>glm-5.1</td><td>Zhipu Coding Plan</td><td>All day</td></tr>
          <tr><td>haiku</td><td>glm-5-turbo</td><td>Zhipu Coding Plan</td><td>All day</td></tr>
        </tbody>
      </table>

      <h2>4. Configure Claude Code</h2>
      <p>Create a Router API key in the admin panel, then choose one setup method. See the <router-link to="/project/llm-simple-router/guide/config/claude-code">Claude Code Setup</router-link> page for details.</p>

      <h2>5. Start Using</h2>
    </template>

    <!-- Shared components outside v-if -->
    <CodeBlock code="npx llm-simple-router" language="bash" />
    <ScreenShot src="/images/llm-simple-router/dashboard.png" caption="Dashboard" />
    <ScreenShot src="/images/llm-simple-router/provider_concurrency.png" caption="Provider Management & Concurrency Control" />
    <ScreenShot src="/images/llm-simple-router/model_mapping.png" caption="Model Mapping Configuration" />
    <CodeBlock code="# Method 1 (shell alias)&#10;clode&#10;&#10;# Method 2 (settings.json)&#10;claude" language="bash" />
  </div>
</template>
