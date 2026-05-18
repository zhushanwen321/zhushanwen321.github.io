<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CodeBlock from '../../../../components/CodeBlock.vue'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')

const pm2Code = `# 安装 PM2
npm install -g pm2

# 全局安装 Router
npm install -g llm-simple-router

# 启动
pm2 start llm-simple-router --name llm-router

# 查看日志
pm2 logs llm-router

# 设置开机自启
pm2 startup
pm2 save`

const systemdServiceCode = `[Unit]
Description=LLM Simple Router
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/llm-simple-router
Restart=always
RestartSec=3
Environment=PORT=9981
Environment=LOG_LEVEL=info

[Install]
WantedBy=multi-user.target`

const systemdCommandsCode = `sudo systemctl enable llm-simple-router
sudo systemctl start llm-simple-router
sudo systemctl status llm-simple-router
journalctl -u llm-simple-router -f`
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>进程管理</h1>
      <p>通过 Web UI 一键升级后，服务需要重启才能生效。推荐使用以下方式部署，确保进程崩溃或升级重启后自动恢复。</p>

      <h2>PM2（推荐）</h2>
      <CodeBlock :code="pm2Code" language="bash" />
      <h3>升级流程</h3>
      <p>Web UI 一键升级 → 点击重启 → PM2 自动拉起新进程（&lt; 1s 中断）</p>

      <h2>systemd（Linux 服务器）</h2>
      <p>创建服务文件 <code>/etc/systemd/system/llm-simple-router.service</code>：</p>
      <CodeBlock :code="systemdServiceCode" language="ini" />
      <p><code>ExecStart</code> 路径取决于 Node.js 的安装方式，使用 <code>which llm-simple-router</code> 确认实际路径。</p>
      <CodeBlock :code="systemdCommandsCode" language="bash" />
      <h3>升级流程</h3>
      <p>Web UI 一键升级 → 点击重启 → systemd 自动重启（&lt; 1s 中断）</p>

      <h2>npx / 手动启动</h2>
      <p>无需额外配置。Web UI 升级并点击重启后，Router 会自动 spawn 新进程并退出旧进程。短暂中断约 1-2 秒。</p>
      <p>注意：如果直接 <code>Ctrl+C</code> 或终端关闭，服务不会自动恢复。建议生产环境使用 PM2 或 systemd。</p>
    </template>
    <template v-else>
      <h1>Process Management</h1>
      <p>After upgrading via the Web UI, the service needs to restart for changes to take effect. Use one of the following deployment methods to ensure automatic recovery after process crashes or upgrade restarts.</p>

      <h2>PM2 (Recommended)</h2>
      <CodeBlock :code="pm2Code" language="bash" />
      <h3>Upgrade Flow</h3>
      <p>Web UI one-click upgrade → click restart → PM2 automatically spawns a new process (&lt; 1s downtime)</p>

      <h2>systemd (Linux Servers)</h2>
      <p>Create a service file at <code>/etc/systemd/system/llm-simple-router.service</code>:</p>
      <CodeBlock :code="systemdServiceCode" language="ini" />
      <p>The <code>ExecStart</code> path depends on how Node.js is installed. Use <code>which llm-simple-router</code> to confirm the actual path.</p>
      <CodeBlock :code="systemdCommandsCode" language="bash" />
      <h3>Upgrade Flow</h3>
      <p>Web UI one-click upgrade → click restart → systemd automatically restarts (&lt; 1s downtime)</p>

      <h2>npx / Manual Start</h2>
      <p>No extra configuration needed. After upgrading via the Web UI and clicking restart, the Router will automatically spawn a new process and exit the old one. Brief downtime of about 1-2 seconds.</p>
      <p>Note: If you use <code>Ctrl+C</code> or close the terminal, the service will not automatically recover. For production, use PM2 or systemd.</p>
    </template>
  </div>
</template>
