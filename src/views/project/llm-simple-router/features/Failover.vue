<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>故障转移（Failover）</h1>
      <p>配置 Failover 路由策略后，多个 Provider 互为备份。请求失败时自动排除当前 Provider，切换到下一个可用的 Provider 重试。</p>
      <h2>工作流程</h2>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          请求到达 → 选择 Provider A → 发送请求<br>
          → A 返回错误 → 排除 A<br>
          → 重新解析映射 → 选择 Provider B → 发送请求<br>
          → B 返回成功 → 返回响应<br>
          → 所有 Provider 均失败 → 返回最后一个错误
        </code>
      </div>
      <h2>配置方式</h2>
      <p>在模型映射页面，为同一个客户端模型配置多个映射规则，路由策略选择「Failover」。Router 会按配置顺序依次尝试。</p>
      <h2>典型场景</h2>
      <p>主力 Provider（如智谱）偶尔限流或不可用时，自动切换到备用 Provider（如 Moonshot），确保开发不中断。主力恢复后自动回到主力。</p>
    </template>
    <template v-else>
      <h1>Failover</h1>
      <p>When Failover routing strategy is configured, multiple Providers back each other up. On failure, the current Provider is automatically excluded and the next available Provider is tried.</p>
      <h2>Workflow</h2>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          Request arrives → Select Provider A → Send request<br>
          → A returns error → Exclude A<br>
          → Re-resolve mapping → Select Provider B → Send request<br>
          → B returns success → Return response<br>
          → All Providers failed → Return last error
        </code>
      </div>
      <h2>Configuration</h2>
      <p>On the Model Mapping page, configure multiple mapping rules for the same client model, select "Failover" strategy.</p>
      <h2>Typical Scenario</h2>
      <p>When the primary Provider (e.g. Zhipu) occasionally rate-limits or goes unavailable, auto-switch to backup Provider (e.g. Moonshot).</p>
    </template>
  </div>
</template>
