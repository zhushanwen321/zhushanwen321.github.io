<template>
  <div class="prose prose-invert max-w-none">
    <h1>环境变量</h1>
    <p>所有密钥通过 Setup 页面设置，以下为可选配置项：</p>
    <table>
      <thead><tr><th>变量</th><th>默认值</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td><code>PORT</code></td><td>9981</td><td>服务端口</td></tr>
        <tr><td><code>DB_PATH</code></td><td><code>~/.llm-simple-router/router.db</code></td><td>SQLite 数据库路径</td></tr>
        <tr><td><code>LOG_LEVEL</code></td><td>info</td><td>日志级别</td></tr>
        <tr><td><code>TZ</code></td><td>Asia/Shanghai</td><td>时区设置</td></tr>
        <tr><td><code>STREAM_TIMEOUT_MS</code></td><td>3000000</td><td>流式代理空闲超时（ms）</td></tr>
        <tr><td><code>RETRY_MAX_ATTEMPTS</code></td><td>3</td><td>最大重试次数</td></tr>
        <tr><td><code>RETRY_BASE_DELAY_MS</code></td><td>1000</td><td>重试基础延迟（ms）</td></tr>
      </tbody>
    </table>
    <h2>使用方式</h2>
    <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
      <code class="text-sm font-mono text-gray-300">PORT=8080 LOG_LEVEL=debug npx llm-simple-router</code>
    </div>
  </div>
</template>
