<template>
  <div class="prose prose-invert max-w-none">
    <h1>Token 用量</h1>
    <p>Router 记录每个请求的 Token 用量，包括输入 Token 和输出 Token，支持按密钥、模型、时间范围统计。</p>
    <h2>记录内容</h2>
    <table>
      <thead><tr><th>字段</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>输入 Token</td><td>客户端请求中的 prompt / messages 占用的 Token 数</td></tr>
        <tr><td>输出 Token</td><td>模型生成的 completion 占用的 Token 数</td></tr>
        <tr><td>缓存命中率</td><td>Provider 返回的缓存命中信息（如支持）</td></tr>
        <tr><td>关联密钥</td><td>用于追踪不同用户/项目的用量</td></tr>
      </tbody>
    </table>
    <h2>用量统计</h2>
    <p>管理后台 &gt; Dashboard 页面提供 Token 用量汇总。可按密钥、Provider、模型维度查看用量趋势。</p>
  </div>
</template>
