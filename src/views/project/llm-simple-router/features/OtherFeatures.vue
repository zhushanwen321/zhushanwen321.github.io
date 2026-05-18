<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ScreenShot from '../../../../components/ScreenShot.vue'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>其他增强功能</h1>

      <h2>LLM 循环检测</h2>
      <p>
        当 LLM 在流式输出中出现重复内容循环时，Router 自动检测并中断，避免浪费 Token。
        在管理后台 <strong>代理增强（实验性）</strong> 菜单中开关控制。
      </p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          SSE 流式输出 → 分析重复模式 → 超过阈值 → 中断输出
        </code>
      </div>

      <h2>OpenAI 兼容 API</h2>
      <p>
        Router 完整兼容 OpenAI API 格式，支持 <code>/v1/chat/completions</code> 和
        <code>/v1/responses</code> 端点。内置 Provider Patch 机制自动转换请求格式，
        无论后端是什么供应商，客户端都以标准 OpenAI SDK 调用。
      </p>
      <p>客户端无需改动，将 <code>base_url</code> 指向 Router（<code>http://localhost:9981/v1</code>）即可。</p>

      <h2>每模型流式超时</h2>
      <p>
        在 Provider 编辑弹窗中，可为每个模型单独设置 <code>stream_timeout_ms</code>（流式响应超时时间）。
        超时后 Router 返回 408 错误。设为 0 表示不限制。在模型映射配置页面可直观看到各模型的超时 badge。
      </p>

      <h2>网络代理</h2>
      <p>
        Provider 级别支持 SOCKS5 / HTTPS 代理，在 Provider 编辑弹窗中配置。
        详见 <router-link to="/project/llm-simple-router/guide/features/providers">供应商管理</router-link>。
      </p>

      <h2>用量大盘</h2>
      <p>在 Dashboard 页面查看按时间、模型、密钥等维度的用量统计。内置 5 小时滑动窗口，适配 Coding Plan 的计量周期。</p>
      <p>支持查看 Token 消耗趋势、请求成功率、按 Provider 分组的详细数据。</p>

      <h2>升级通知</h2>
      <p>新版本发布时自动在管理后台弹出升级提醒。点击一键升级后重启服务即可完成更新。</p>
      <p>升级不会丢失数据，所有配置和日志保存在 <code>~/.llm-simple-router/</code> 目录中。</p>

      <h2>DeepSeek 推理补丁</h2>
      <p>Router 内置 DeepSeek <code>reasoning_thinking</code> 补丁，自动处理 DeepSeek 模型的推理输出格式。支持 DS 和其他模型在同一个映射表中混用切换。</p>
      <p>使用 OpenAI SDK 或 Claude Code 调用 DeepSeek 模型时，无需关心推理格式的差异。</p>

      <ScreenShot src="/images/llm-simple-router/proxy_enhance.png" caption="代理增强（实验性）" />
    </template>

    <template v-else>
      <h1>Additional Features</h1>

      <h2>LLM Loop Detection</h2>
      <p>
        Auto-detects and interrupts repetitive content loops in LLM streaming output to save tokens.
        Toggle on/off in the admin panel under <strong>Proxy Enhancement (Experimental)</strong>.
      </p>
      <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
        <code class="text-sm font-mono text-gray-300 block leading-loose">
          SSE stream → Analyze repetition pattern → Exceeds threshold → Interrupt
        </code>
      </div>

      <h2>OpenAI Compatible API</h2>
      <p>
        Full OpenAI API compatibility, supporting both <code>/v1/chat/completions</code> and
        <code>/v1/responses</code> endpoints. Built-in Provider Patch mechanism auto-converts
        request format — clients use standard OpenAI SDK regardless of backend provider.
      </p>
      <p>No client changes needed — point <code>base_url</code> to Router (<code>http://localhost:9981/v1</code>).</p>

      <h2>Per-Model Stream Timeout</h2>
      <p>
        Set <code>stream_timeout_ms</code> per model in the Provider edit dialog. On timeout,
        Router returns a 408 error. Set to 0 for no limit. Timeout badges display on the
        mapping config page.
      </p>

      <h2>Network Proxy</h2>
      <p>
        Per-Provider SOCKS5/HTTPS proxy — configure in the Provider edit dialog.
        See <router-link to="/project/llm-simple-router/guide/features/providers">Provider Management</router-link>.
      </p>

      <h2>Usage Dashboard</h2>
      <p>View usage statistics by time, model, and key in the Dashboard page. Built-in 5-hour sliding window adapts to Coding Plan billing cycles.</p>
      <p>Supports token consumption trends, request success rates, and detailed per-Provider data.</p>

      <h2>Upgrade Notifications</h2>
      <p>Automatic upgrade notification popup in admin panel when a new version is released. One-click upgrade and service restart to complete the update.</p>
      <p>Upgrades do not lose data — all config and logs are preserved in <code>~/.llm-simple-router/</code>.</p>

      <h2>DeepSeek Reasoning Patch</h2>
      <p>Built-in DeepSeek <code>reasoning_thinking</code> patch automatically handles DeepSeek model reasoning output format. Supports mixing DS and other models in the same mapping table.</p>
      <p>No need to worry about reasoning format differences when calling DeepSeek models via OpenAI SDK or Claude Code.</p>

      <ScreenShot src="/images/llm-simple-router/proxy_enhance.png" caption="Proxy Enhancement (Experimental)" />
    </template>
  </div>
</template>
