<script setup lang="ts">
import ScreenShot from '../../../../components/ScreenShot.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>模型映射</h1>
      <p>核心概念：客户端请求携带模型名 A，Router 根据映射规则通过调度层找到后端 Provider，将请求转发到对应模型 B。</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          客户端 → Router → 调度层（匹配时间窗口 + transform_rule）→ 后端 Provider → 返回
        </code>
      </div>

      <h2>调度层架构</h2>
      <p>v0.9.0 重构后，模型映射升级为 <strong>调度层</strong>（Scheduler），删除了轮询/随机策略，统一使用 <strong>Scheduled（分时段）</strong> 和 <strong>Failover（故障转移）</strong> 两种路由策略。</p>
      <table>
        <thead><tr><th>策略</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td>Scheduled（定时调度）</td><td>按时间窗口匹配映射规则，支持多条规则覆盖全天</td></tr>
          <tr><td>Failover（故障转移）</td><td>优先匹配第一个 Provider，失败后自动切换到下一个备用 Provider</td></tr>
        </tbody>
      </table>

      <h2>transform_rule 转换规则</h2>
      <p>每条映射规则支持可选的 <code>transform_rule</code> 配置，用于对请求体进行预处理。例如：</p>
      <ul>
        <li>修改 system prompt / temperature / max_tokens 等参数</li>
        <li>注入特定格式的请求头或字段</li>
        <li>针对不同 Provider 的格式差异做适配</li>
      </ul>

      <h2>可视化 Pipeline 编辑器</h2>
      <p><strong>MappingEntryEditor</strong> 组件以垂直 pipeline 形式展示单条映射链路：客户端模型 → 匹配规则 → 后端模型 → Provider，一目了然。</p>
      <ScreenShot src="/images/llm-simple-router/model_mapping.png" caption="模型映射 Pipeline 编辑器" />

      <h2>内联编辑卡片</h2>
      <p><strong>ModelMappingCard</strong> 提供内联展开-编辑-保存体验。无需跳转页面，点击卡片即可展开编辑表单，修改后即时保存。</p>

      <h2>快速配置草稿模式</h2>
      <p><strong>QuickSetupMappingList</strong> 专为初始配置场景设计，支持草稿模式批量编辑映射规则，配置完成后一次性提交。</p>

      <h2>List Models API</h2>
      <p>Router 内置 <strong>List Models API</strong>，聚合全部 Provider 的可用模型列表。在映射配置页面中，后端模型下拉框会自动拉取各 Provider 的模型清单，无需手动输入模型名。</p>

      <h2>分时段映射示例</h2>
      <p>按时间段自动切换后端模型，例如高峰期切到 Kimi，低谷期切回 GLM：</p>
      <table>
        <thead><tr><th>客户端模型</th><th>后端模型</th><th>供应商</th><th>时间窗口</th></tr></thead>
        <tbody>
          <tr><td>sonnet</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>00:00-14:00</td></tr>
          <tr><td>sonnet</td><td>kimi-for-coding</td><td>Moonshot</td><td>14:00-18:00</td></tr>
          <tr><td>sonnet</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>18:00-24:00</td></tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <h1>Model Mapping</h1>
      <p>Core concept: the client sends a request with model name A. The Router resolves it through the scheduling layer to find the backend Provider and forwards to the corresponding model B.</p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          Client → Router → Scheduler (match time window + transform_rule) → Backend Provider → Return
        </code>
      </div>

      <h2>Scheduling Layer Architecture</h2>
      <p>Since v0.9.0, model mapping has been upgraded to a <strong>Scheduling Layer</strong>. Round-Robin and Random strategies were removed in favor of two clean strategies:</p>
      <table>
        <thead><tr><th>Strategy</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Scheduled</td><td>Match mapping rules by time windows; chain multiple rules for 24h coverage</td></tr>
          <tr><td>Failover</td><td>Try the first matched Provider; auto-fallback to the next on failure</td></tr>
        </tbody>
      </table>

      <h2>transform_rule</h2>
      <p>Each mapping rule supports optional <code>transform_rule</code> configuration for request body preprocessing:</p>
      <ul>
        <li>Modify system prompt / temperature / max_tokens parameters</li>
        <li>Inject specific headers or fields</li>
        <li>Adapt format differences between Providers</li>
      </ul>

      <h2>Visual Pipeline Editor</h2>
      <p>The <strong>MappingEntryEditor</strong> component renders a single mapping chain as a vertical pipeline: Client Model → Match Rule → Backend Model → Provider — clear at a glance.</p>
      <ScreenShot src="/images/llm-simple-router/model_mapping.png" caption="Model Mapping Pipeline Editor" />

      <h2>Inline Edit Cards</h2>
      <p><strong>ModelMappingCard</strong> provides an inline expand-edit-save experience. No page navigation needed — click a card to expand the edit form and save changes immediately.</p>

      <h2>Quick Setup Draft Mode</h2>
      <p><strong>QuickSetupMappingList</strong> is designed for initial configuration, supporting draft-mode batch editing of mapping rules with a single commit when done.</p>

      <h2>List Models API</h2>
      <p>The Router has a built-in <strong>List Models API</strong> that aggregates available models from all Providers. The backend model dropdown in the mapping config page auto-fetches each Provider's model list — no manual model name entry needed.</p>

      <h2>Time-based Mapping Example</h2>
      <p>Auto-switch backend models by time window. e.g. Kimi during peak, GLM during off-peak:</p>
      <table>
        <thead><tr><th>Client Model</th><th>Backend Model</th><th>Provider</th><th>Time Window</th></tr></thead>
        <tbody>
          <tr><td>sonnet</td><td>glm-5.1</td><td>Zhipu Coding Plan</td><td>00:00-14:00</td></tr>
          <tr><td>sonnet</td><td>kimi-for-coding</td><td>Moonshot</td><td>14:00-18:00</td></tr>
          <tr><td>sonnet</td><td>glm-5.1</td><td>Zhipu Coding Plan</td><td>18:00-24:00</td></tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
