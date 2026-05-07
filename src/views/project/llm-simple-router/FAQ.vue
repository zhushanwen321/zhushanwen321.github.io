<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>常见问题</h1>

      <h2>Claude Code 连接不上 Router？</h2>
      <ol>
        <li>确认 Router 正在运行：访问 <code>http://localhost:9981/admin</code></li>
        <li>确认 API Key 正确：管理后台 &gt; 密钥管理，确保使用了正确的 <code>sk-router-xxx</code> 密钥</li>
        <li>检查环境变量：<code>ANTHROPIC_BASE_URL</code> 是否指向 Router 地址</li>
        <li>如果 Router 在其他机器上，确保端口可访问（非 127.0.0.1）</li>
        <li>调试模式启动 Claude Code：<code>claude --debug --verbose</code> 查看详细错误</li>
      </ol>

      <h2>怎么设置并发数？</h2>
      <p>
        建议根据 Provider 的 API 限制来设定。例如智谱 Coding Plan 限制 5 并发，则设为 5。
        启用自适应模式后，Router 会根据响应时间自动调整，无需精确估算。
        初始建议：智谱 5、Moonshot 3、其他供应商参考官方文档。
      </p>

      <h2>供应商突然不可用了？</h2>
      <p>
        配置 <strong>Failover 故障转移</strong>：在模型映射页面为同一客户端模型配置多个映射规则，
        路由策略选择 Failover。主力 Provider 故障时自动切换到备用 Provider。
      </p>

      <h2>Token 消耗太快？</h2>
      <ul>
        <li>在 Dashboard 查看哪个模型 Token 用量最大，分析是否正常</li>
        <li>开启 <strong>LLM 循环检测</strong>，避免输出死循环浪费 Token</li>
        <li>设置 <strong>每模型流式超时</strong>，避免单个请求长时间占用</li>
      </ul>

      <h2>怎么升级到新版本？</h2>
      <p>非 Docker 部署：</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">npx llm-simple-router@latest</code>
      </div>
      <p>Docker 部署：</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">docker compose pull && docker compose up -d</code>
      </div>
      <p>升级前建议备份 <code>~/.llm-simple-router/router.db</code>。</p>

      <h2>怎么备份和迁移数据？</h2>
      <p>所有数据存储在 <code>~/.llm-simple-router/</code> 目录下，备份该目录即可：</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">cp -r ~/.llm-simple-router ~/.llm-simple-router.bak</code>
      </div>

      <h2>HTTP 环境下无法登录？</h2>
      <p>Router 自动检测请求协议设置 Cookie Secure 标志。如果通过 HTTP 访问（非 HTTPS），
      Cookie 会设置为非 Secure 模式，无需额外配置。</p>
    </template>

    <template v-else>
      <h1>FAQ</h1>

      <h2>Claude Code can't connect to Router?</h2>
      <ol>
        <li>Verify Router is running: visit <code>http://localhost:9981/admin</code></li>
        <li>Check API key: Admin Panel &gt; Key Management, ensure correct <code>sk-router-xxx</code> key</li>
        <li>Check env vars: <code>ANTHROPIC_BASE_URL</code> points to Router address</li>
        <li>If Router is on another machine, ensure port is accessible (not 127.0.0.1)</li>
        <li>Debug Claude Code: <code>claude --debug --verbose</code> for detailed errors</li>
      </ol>

      <h2>How to set concurrency limits?</h2>
      <p>
        Set based on Provider API limits. e.g. Zhipu Coding Plan caps at 5 concurrency → set to 5.
        Enable adaptive mode and Router auto-adjusts based on response times.
        Suggested defaults: Zhipu 5, Moonshot 3, others per official docs.
      </p>

      <h2>Provider suddenly unavailable?</h2>
      <p>
        Configure <strong>Failover</strong>: add multiple mapping rules for the same client model
        on the Model Mapping page, select Failover strategy. Primary down → auto-switch to backup.
      </p>

      <h2>Token usage too high?</h2>
      <ul>
        <li>Check Dashboard for per-model token breakdown</li>
        <li>Enable <strong>LLM Loop Detection</strong> to prevent output loops</li>
        <li>Set <strong>per-model stream timeout</strong> to cap long-running requests</li>
      </ul>

      <h2>How to upgrade?</h2>
      <p>Non-Docker:</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">npx llm-simple-router@latest</code>
      </div>
      <p>Docker:</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">docker compose pull && docker compose up -d</code>
      </div>
      <p>Backup <code>~/.llm-simple-router/router.db</code> before upgrading.</p>

      <h2>How to backup and migrate data?</h2>
      <p>All data is in <code>~/.llm-simple-router/</code>. Back up the entire directory:</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300">cp -r ~/.llm-simple-router ~/.llm-simple-router.bak</code>
      </div>

      <h2>Can't login over HTTP?</h2>
      <p>Router auto-detects protocol for cookie security. HTTP access automatically uses non-secure cookies — no extra config needed.</p>
    </template>
  </div>
</template>
