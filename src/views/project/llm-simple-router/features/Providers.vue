<template>
  <div class="prose prose-invert max-w-none">
    <h1>多供应商支持</h1>
    <p>Router 支持配置多个后端 Provider，统一管理不同的 LLM API 供应商。每个 Provider 独立配置 Base URL、API Key、并发数等参数。</p>
    <h2>支持的供应商</h2>
    <table>
      <thead><tr><th>供应商</th><th>说明</th><th>备注</th></tr></thead>
      <tbody>
        <tr><td>智谱（Zhipu）</td><td>GLM 系列模型</td><td>Coding Plan 自动填写 Base URL</td></tr>
        <tr><td>Moonshot</td><td>Kimi 系列模型</td><td>支持 kimi-for-coding</td></tr>
        <tr><td>Minimax</td><td>MiniMax 系列模型</td><td></td></tr>
        <tr><td>火山引擎</td><td>字节跳动云服务</td><td></td></tr>
        <tr><td>阿里云</td><td>通义千问系列</td><td></td></tr>
        <tr><td>腾讯云</td><td>混元系列</td><td></td></tr>
        <tr><td>OpenAI</td><td>GPT 系列</td><td></td></tr>
        <tr><td>Anthropic</td><td>Claude 系列</td><td></td></tr>
      </tbody>
    </table>
    <h2>添加 Provider</h2>
    <p>在管理后台 &gt; Provider 页面 &gt; 添加 Provider。选择 Coding Plan 后会自动填写 Base URL，只需填入 API Key。</p>
    <h2>并发控制</h2>
    <p>每个 Provider 可独立配置并发数上限。超过并发限制的请求会排队等待，不会丢失。队列满时返回 503，等待超时返回 504。</p>
  </div>
</template>
