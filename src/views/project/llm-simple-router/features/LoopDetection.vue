<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>LLM 循环检测</h1>
      <p>
        当 LLM 在流式输出中出现重复内容循环时，Router 自动检测并中断，避免浪费 Token 和请求时长。
        基于 N-gram 算法，分析输出内容中的重复模式。
      </p>

      <h2>检测原理</h2>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          SSE 流式输出 → 实时拼接完整文本<br>
          → 提取 N-gram（连续 N 个 token）<br>
          → 计算重复率（重复 N-gram 占比）<br>
          → 超过阈值 → 判定为循环，中断输出
        </code>
      </div>

      <h2>配置方式</h2>
      <p>
        在管理后台 <strong>代理增强（实验性）</strong> 菜单中，可以按开关控制循环检测的启用/禁用。
        支持配置 N-gram 窗口大小和重复阈值。
      </p>

      <h2>使用场景</h2>
      <ul>
        <li>模型在长文本生成时陷入重复（如反复输出相同段落）</li>
        <li>工具调用来回循环，模型反复尝试同一操作</li>
        <li>代码生成中出现死循环模式</li>
      </ul>

      <h2>与并发控制的关系</h2>
      <p>
        循环检测配合并发控制使用效果更佳：循环检测中断后释放并发槽位，避免长时间占用资源。
        循环检测和自适应并发控制都已插件化到 <code>@llm-router/core</code> 中，供 pi-extension 使用。
      </p>
    </template>

    <template v-else>
      <h1>LLM Loop Detection</h1>
      <p>
        When an LLM starts repeating content in streaming output, the Router automatically detects and interrupts
        the loop to save tokens and request time. Powered by an N-gram algorithm that analyzes repetition patterns.
      </p>

      <h2>How It Works</h2>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          SSE stream → Real-time full text assembly<br>
          → Extract N-grams (consecutive N tokens)<br>
          → Calculate repetition ratio (duplicate N-gram percentage)<br>
          → Exceeds threshold → Detect loop, interrupt output
        </code>
      </div>

      <h2>Configuration</h2>
      <p>
        In the admin panel under <strong>Proxy Enhancement (Experimental)</strong>, toggle loop detection on/off.
        Configure N-gram window size and repetition threshold as needed.
      </p>

      <h2>Use Cases</h2>
      <ul>
        <li>Model gets stuck repeating the same paragraphs in long text generation</li>
        <li>Tool calls looping — model repeatedly attempts the same operation</li>
        <li>Infinite loop patterns in code generation</li>
      </ul>

      <h2>Integration</h2>
      <p>
        Loop detection and adaptive concurrency have been modularized into <code>@llm-router/core</code>
        for use by the pi-extension as reusable building blocks.
      </p>
    </template>
  </div>
</template>
