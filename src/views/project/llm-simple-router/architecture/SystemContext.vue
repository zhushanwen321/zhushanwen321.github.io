<template>
  <div class="prose prose-invert max-w-none">
    <h1>系统上下文</h1>
    <p>展示 LLM Simple Router 在整体架构中的位置和与其他系统的关系。</p>
    <h2>系统上下文图</h2>
    <div class="not-prose my-6">
      <div class="flex flex-col items-center gap-6 rounded-lg border border-white/10 bg-surface-50 p-8">
        <div class="flex items-center gap-4">
          <div class="rounded-lg border border-blue-500/30 bg-blue-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-blue-400">Claude Code / Cursor</p>
            <p class="text-xs text-gray-500">API 请求 · Bearer Token</p>
          </div>
          <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div class="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-cyan-400">LLM Simple Router</p>
            <p class="text-xs text-gray-500">映射 · 重试 · 并发控制</p>
          </div>
          <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div class="rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-green-400">智谱 / Moonshot / ...</p>
            <p class="text-xs text-gray-500">SSE 流式 · JSON 响应</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="rounded-lg border border-purple-500/30 bg-purple-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-purple-400">管理员</p>
            <p class="text-xs text-gray-500">管理后台 /admin/</p>
          </div>
          <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div class="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-cyan-400">LLM Simple Router</p>
            <p class="text-xs text-gray-500">配置 · 日志 · 监控</p>
          </div>
        </div>
      </div>
    </div>
    <h2>组件说明</h2>
    <table>
      <thead><tr><th>组件</th><th>角色</th></tr></thead>
      <tbody>
        <tr><td>客户端</td><td>通过 OpenAI 或 Anthropic 格式的 API 发送请求</td></tr>
        <tr><td>管理员</td><td>通过浏览器访问管理后台，配置 Provider、映射规则、密钥</td></tr>
        <tr><td>Router</td><td>完成模型映射、并发控制、自动重试、日志记录</td></tr>
        <tr><td>上游 Provider</td><td>接收转发的请求，返回 SSE 流或 JSON 响应</td></tr>
      </tbody>
    </table>
  </div>
</template>
