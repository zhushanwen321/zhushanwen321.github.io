<template>
  <div class="prose prose-invert max-w-none">
    <h1>并发控制</h1>
    <p>按 Provider 配置并发数上限，超限请求排队等待。防止同时发送过多请求导致 Provider 限流或报错。</p>
    <h2>工作原理</h2>
    <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
      <code class="text-sm font-mono text-gray-300 block leading-loose">
        请求到达 → 检查 Provider 并发数<br>
        → 未满：立即发送<br>
        → 已满：进入等待队列<br>
        → 队列满：返回 503 Service Unavailable<br>
        → 等待超时：返回 504 Gateway Timeout
      </code>
    </div>
    <h2>配置方式</h2>
    <p>在管理后台 &gt; Provider 页面，为每个 Provider 设置最大并发数。建议根据 Provider 的 API 限制合理配置。</p>
    <h2>信号量机制</h2>
    <p>Router 使用基于 Promise 的信号量机制实现并发控制。每个 Provider 维护独立的信号量，支持 AbortSignal 和超时。</p>
    <h2>监控</h2>
    <p>实时监控页面可以看到每个 Provider 的当前活跃请求数、等待队列长度等状态。详见 <router-link to="/project/llm-simple-router/guide/features/monitor">实时监控</router-link>。</p>
  </div>
</template>
