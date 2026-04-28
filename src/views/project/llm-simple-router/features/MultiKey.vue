<template>
  <div class="prose prose-invert max-w-none">
    <h1>多密钥管理</h1>
    <p>Router 支持创建多个独立的 API 密钥，每个密钥可以配置模型白名单。适合多用户、多项目共享同一个 Router 实例。</p>
    <h2>密钥特性</h2>
    <table>
      <thead><tr><th>特性</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>独立密钥</td><td>每个密钥格式为 <code>sk-router-xxx</code>，独立认证</td></tr>
        <tr><td>模型白名单</td><td>限制密钥只能访问指定的模型</td></tr>
        <tr><td>多用户支持</td><td>不同用户使用不同密钥，互不干扰</td></tr>
        <tr><td>多项目支持</td><td>不同项目使用不同密钥，便于追踪用量</td></tr>
      </tbody>
    </table>
    <h2>创建密钥</h2>
    <p>管理后台 &gt; 密钥管理页面 &gt; 创建密钥。设置密钥名称、模型白名单（可选）后自动生成密钥字符串。</p>
    <h2>认证方式</h2>
    <p>客户端请求通过 <code>Authorization: Bearer sk-router-xxx</code> 头携带密钥。Router 对密钥进行 SHA256 哈希后查询数据库验证。</p>
  </div>
</template>
