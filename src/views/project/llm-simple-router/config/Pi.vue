<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CodeBlock from '../../../../components/CodeBlock.vue'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')

const modelsJson = `{
  "providers": {
    "llm-simple-router": {
      "baseUrl": "http://127.0.0.1:9981",
      "api": "anthropic-messages",
      "apiKey": "<your-router-key>",
      "models": [
        {
          "id": "glm-5.1",
          "name": "glm-5.1",
          "reasoning": true,
          "input": ["text"],
          "contextWindow": 200000,
          "maxTokens": 64000
        },
        {
          "id": "deepseek-v4-flash",
          "name": "deepseek-v4-flash",
          "reasoning": true,
          "input": ["text"],
          "contextWindow": 1000000,
          "maxTokens": 64000,
          "compat": {
            "requiresReasoningContentOnAssistantMessages": true,
            "thinkingFormat": "deepseek"
          },
          "thinkingLevelMap": {
            "off": null,
            "minimal": null,
            "low": null,
            "medium": null,
            "high": "high",
            "xhigh": "max"
          }
        }
      ]
    }
  }
}`
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>Pi Coding Agent 配置</h1>
      <p>编辑 <code>~/.pi/agent/models.json</code>，添加 Router 作为 Provider：</p>
      <CodeBlock :code="modelsJson" language="json" />
      <h2>字段说明</h2>
      <ul>
        <li><code>api: "anthropic-messages"</code> — Pi 通过 Anthropic Messages API 格式连接</li>
        <li><code>baseUrl</code> — Router 地址</li>
        <li><code>apiKey</code> — 管理后台创建的 Router API 密钥</li>
        <li>模型 <code>id</code> — 必须与 Router 模型映射中的客户端模型名称一致</li>
        <li>DeepSeek 专用：<code>compat.thinkingFormat: "deepseek"</code> 和 <code>thinkingLevelMap</code> 用于正确处理推理输出</li>
        <li><code>contextWindow</code> 和 <code>maxTokens</code> 按各模型实际规格填写</li>
      </ul>
      <h2>提示</h2>
      <p>在 Pi 中使用 <code>llm-simple-router/glm-5.1</code> 或 <code>llm-simple-router/deepseek-v4-flash</code> 格式指定模型（provider/model）。</p>
    </template>
    <template v-else>
      <h1>Pi Coding Agent Setup</h1>
      <p>Edit <code>~/.pi/agent/models.json</code> and add the Router as a Provider:</p>
      <CodeBlock :code="modelsJson" language="json" />
      <h2>Field Reference</h2>
      <ul>
        <li><code>api: "anthropic-messages"</code> — Pi connects via Anthropic Messages API format</li>
        <li><code>baseUrl</code> — Router address</li>
        <li><code>apiKey</code> — Router API key created in the admin panel</li>
        <li>Model <code>id</code> — must match a client model name in Router's model mapping</li>
        <li>DeepSeek specific: <code>compat.thinkingFormat: "deepseek"</code> and <code>thinkingLevelMap</code> handle reasoning output correctly</li>
        <li><code>contextWindow</code> and <code>maxTokens</code> should match each model's actual specs</li>
      </ul>
      <h2>Tips</h2>
      <p>Specify models in Pi using the <code>provider/model</code> format, e.g. <code>llm-simple-router/glm-5.1</code> or <code>llm-simple-router/deepseek-v4-flash</code>.</p>
    </template>
  </div>
</template>
