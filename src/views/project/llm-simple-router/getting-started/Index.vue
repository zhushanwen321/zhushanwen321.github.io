<script setup lang="ts">
import CodeBlock from '../../../../components/CodeBlock.vue'
import ScreenShot from '../../../../components/ScreenShot.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>启动 Router</h1>

    <h2>1. 安装并启动</h2>
    <CodeBlock code="npx llm-simple-router" language="bash" />
    <p>
      启动后访问 <code>http://localhost:9981/admin</code>，首次进入 Setup 页面设置管理员密码。数据存储在 <code>~/.llm-simple-router/</code>。
    </p>
    <ScreenShot src="/images/llm-simple-router/dashboard.png" caption="Dashboard 管理面板" />

    <h2>2. 添加 Provider</h2>
    <p>
      管理后台 &gt; Provider 页面 &gt; 添加 Provider。选择 Coding Plan 后会自动填写 Base URL，只需填入 API Key。
    </p>
    <ScreenShot src="/images/llm-simple-router/provider_concurrency.png" caption="Provider 管理 + 并发控制" />

    <h2>3. 配置模型映射</h2>
    <p>
      核心概念：客户端请求携带模型名 A，Router 根据映射规则将其替换为后端 Provider 支持的模型名 B，然后转发请求：
    </p>
    <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
      <code class="text-sm font-mono text-gray-300">
        Claude Code (模型 A) → Router (A → B) → Provider API (模型 B)
      </code>
    </div>
    <ScreenShot src="/images/llm-simple-router/model_mapping.png" caption="模型映射配置" />

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
    <CodeBlock code="# 方式一（shell alias）&#10;clode&#10;&#10;# 方式二（settings.json）&#10;claude" language="bash" />
  </div>
</template>
