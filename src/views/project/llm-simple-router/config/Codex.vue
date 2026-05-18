<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CodeBlock from '../../../../components/CodeBlock.vue'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')

const configToml = `model_provider = "llm-simple-router"
model = "deepseek-v4-flash"
preferred_auth_method = "apikey"

[model_providers.llm-simple-router]
name = "LLMSimpleRouter"
base_url = "http://127.0.0.1:9981/v1"
env_key = "ROUTER_KEY"
wire_api = "responses"`

const envExport = `export ROUTER_KEY="<your-router-key>"`
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>Codex 配置</h1>
      <p>编辑 <code>~/.codex/config.toml</code>，将 Router 配置为自定义 Provider。</p>
      <CodeBlock :code="configToml" language="toml" />
      <h2>字段说明</h2>
      <ul>
        <li><code>model_provider</code> — 指定使用自定义 Provider 的名称</li>
        <li><code>model</code> — 客户端使用的模型名称，需与 Router 模型映射页配置的客户端模型名一致</li>
        <li><code>wire_api = "responses"</code> — Codex 通过 OpenAI Responses API 格式与 Router 通信</li>
        <li><code>env_key</code> — Router API 密钥对应的环境变量名</li>
      </ul>
      <h2>环境变量</h2>
      <p>在 shell 中设置 Router API 密钥：</p>
      <CodeBlock :code="envExport" language="bash" />
      <h2>提示</h2>
      <ul>
        <li><code>model</code> 字段应与 Router 模型映射页面中配置的客户端模型名匹配</li>
        <li>Codex 通过 OpenAI Responses API 与 Router 通信</li>
      </ul>
    </template>
    <template v-else>
      <h1>Codex Setup</h1>
      <p>Edit <code>~/.codex/config.toml</code> to configure Router as a custom provider.</p>
      <CodeBlock :code="configToml" language="toml" />
      <h2>Field Reference</h2>
      <ul>
        <li><code>model_provider</code> — Name of the custom provider to use</li>
        <li><code>model</code> — Client model name, must match a client model name configured in the Router model mapping page</li>
        <li><code>wire_api = "responses"</code> — Codex communicates with Router via the OpenAI Responses API format</li>
        <li><code>env_key</code> — Environment variable name for the Router API key</li>
      </ul>
      <h2>Environment Variable</h2>
      <p>Set the Router API key in your shell:</p>
      <CodeBlock :code="envExport" language="bash" />
      <h2>Tips</h2>
      <ul>
        <li>The <code>model</code> field should match a client model name configured in the Router model mapping page</li>
        <li>Codex communicates with Router via the OpenAI Responses API</li>
      </ul>
    </template>
  </div>
</template>
