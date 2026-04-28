<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
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
    </template>
    <template v-else>
      <h1>Multi-Key Management</h1>
      <p>The Router supports creating multiple independent API keys, each with model whitelist. Suitable for multi-user/multi-project scenarios sharing one Router instance.</p>
      <h2>Key Features</h2>
      <table>
        <thead><tr><th>Feature</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Independent Keys</td><td>Each key formatted as <code>sk-router-xxx</code>, independent authentication</td></tr>
          <tr><td>Model Whitelist</td><td>Restrict key access to specified models only</td></tr>
          <tr><td>Multi-User Support</td><td>Different users use different keys, no interference</td></tr>
          <tr><td>Multi-Project Support</td><td>Different projects use different keys for usage tracking</td></tr>
        </tbody>
      </table>
      <h2>Creating Keys</h2>
      <p>Admin Panel &gt; Key Management page &gt; Create Key. Set name and optional whitelist, key string is auto-generated.</p>
      <h2>Authentication</h2>
      <p>Client sends key via <code>Authorization: Bearer sk-router-xxx</code> header. Router verifies via SHA256 hash lookup.</p>
    </template>
  </div>
</template>
