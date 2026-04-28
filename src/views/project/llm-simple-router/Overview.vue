<script setup lang="ts">
import CodeBlock from '../../../components/CodeBlock.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
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
    <CodeBlock code="npx llm-simple-router" language="bash" />
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
        <tr><td>自动重试</td><td>对 429/400/网络超时自动指数退避重试</td></tr>
        <tr><td>多供应商支持</td><td>智谱、Moonshot、Minimax、火山引擎、阿里云、腾讯云等</td></tr>
        <tr><td>模型分时段映射</td><td>按时间段自动切换后端模型</td></tr>
        <tr><td>并发队列等待</td><td>按 Provider 配置并发数上限，超限请求排队等待</td></tr>
        <tr><td>Failover 故障转移</td><td>多 Provider 互备，失败自动切换下一个</td></tr>
        <tr><td>实时请求监控</td><td>SSE 推送活跃请求、队列状态、流式输出实时查看</td></tr>
        <tr><td>多密钥管理</td><td>独立密钥 + 模型白名单，支持多用户/多项目</td></tr>
        <tr><td>请求日志</td><td>四阶段完整链路（客户端请求/上游请求/上游响应/客户端响应）</td></tr>
        <tr><td>性能指标</td><td>TTFT、TPS、Token 用量、缓存命中率</td></tr>
      </tbody>
    </table>
  </div>
</template>
