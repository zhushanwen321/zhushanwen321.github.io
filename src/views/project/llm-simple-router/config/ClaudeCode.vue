<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CodeBlock from '../../../../components/CodeBlock.vue'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')

const aliasMinimal = `alias clode='\\
export ANTHROPIC_AUTH_TOKEN="<your-router-key>" && \\
export ANTHROPIC_BASE_URL="http://127.0.0.1:9981" && \\
claude'`

const aliasFull = `alias clode='\\
export ANTHROPIC_AUTH_TOKEN="sk-router-xxxxxxxx" && \\
export ANTHROPIC_BASE_URL="http://192.168.1.111:9981" && \\
export ANTHROPIC_MODEL="glm-5" && \\
export ANTHROPIC_DEFAULT_OPUS_MODEL="glm-5.1" && \\
export ANTHROPIC_DEFAULT_SONNET_MODEL="glm-5" && \\
export ANTHROPIC_DEFAULT_HAIKU_MODEL="glm-5-turbo" && \\
export ANTHROPIC_SMALL_FAST_MODEL="glm-5-turbo" && \\
claude'`

const settingsMinimal = `{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "<your-router-key>",
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:9981"
  }
}`

const settingsFull = `{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-router-xxxxxxxx",
    "ANTHROPIC_BASE_URL": "http://192.168.1.111:9981",
    "ANTHROPIC_MODEL": "glm-5",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5.1",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-5-turbo",
    "ANTHROPIC_SMALL_FAST_MODEL": "glm-5-turbo"
  }
}`
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>Claude Code 配置</h1>
      <p>在管理后台创建 Router API 密钥后，选择一种方式配置 Claude Code。<strong>两种方式只需选其一。</strong></p>
      <h2>方式一：shell alias（推荐）</h2>
      <p>最小配置，Claude Code 使用默认模型名（opus / sonnet / haiku），Router 通过映射表转换：</p>
      <CodeBlock :code="aliasMinimal" language="bash" />
      <p>也可以通过环境变量直接指定模型名，绕过 Router 映射：</p>
      <CodeBlock :code="aliasFull" language="bash" />
      <h2>方式二：~/.claude/settings.json</h2>
      <p>在 <code>~/.claude/settings.json</code> 的 <code>env</code> 字段中配置。最小配置：</p>
      <CodeBlock :code="settingsMinimal" language="json" />
      <p>覆盖模型名：</p>
      <CodeBlock :code="settingsFull" language="json" />
      <h2>提示</h2>
      <ul>
        <li><code>settings.json</code> 中的环境变量对所有项目生效</li>
        <li>如果只想对当前项目生效，可放在 <code>.claude/settings.json</code>（项目根目录下）</li>
        <li>调试时可加参数：<code>claude --dangerously-skip-permissions --verbose --debug</code></li>
      </ul>
    </template>
    <template v-else>
      <h1>Claude Code Setup</h1>
      <p>After creating a Router API key in the admin panel, choose one method to configure Claude Code. <strong>Only one method is needed.</strong></p>
      <h2>Method 1: Shell Alias (Recommended)</h2>
      <p>Minimal config — Claude Code uses default model names (opus / sonnet / haiku), Router maps them via the mapping table:</p>
      <CodeBlock :code="aliasMinimal" language="bash" />
      <p>You can also specify model names directly via environment variables, bypassing Router mapping:</p>
      <CodeBlock :code="aliasFull" language="bash" />
      <h2>Method 2: ~/.claude/settings.json</h2>
      <p>Configure under the <code>env</code> field in <code>~/.claude/settings.json</code>. Minimal config:</p>
      <CodeBlock :code="settingsMinimal" language="json" />
      <p>Override model names:</p>
      <CodeBlock :code="settingsFull" language="json" />
      <h2>Tips</h2>
      <ul>
        <li>Environment variables in <code>settings.json</code> apply to all projects</li>
        <li>To limit to the current project only, place them in <code>.claude/settings.json</code> (project root)</li>
        <li>For debugging, add flags: <code>claude --dangerously-skip-permissions --verbose --debug</code></li>
      </ul>
    </template>
  </div>
</template>
