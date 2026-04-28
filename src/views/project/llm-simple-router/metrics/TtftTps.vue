<template>
  <div class="prose prose-invert max-w-none">
    <h1>TTFT / TPS</h1>
    <p>Router 为每个请求采集关键性能指标，帮助评估后端 Provider 的响应速度和吞吐量。</p>
    <h2>指标说明</h2>
    <table>
      <thead><tr><th>指标</th><th>全称</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>TTFT</td><td>Time To First Token</td><td>从发送请求到收到第一个 Token 的时间（ms）</td></tr>
        <tr><td>TPS</td><td>Tokens Per Second</td><td>每秒生成的 Token 数量</td></tr>
      </tbody>
    </table>
    <h2>采集方式</h2>
    <p>对于 SSE 流式请求，Router 在代理过程中旁路采集 TTFT 和每个 Token 的到达时间。对于非流式请求，记录总响应时间。</p>
    <h2>查看指标</h2>
    <p>指标数据记录在请求日志中。管理后台 &gt; Dashboard 页面提供汇总视图。</p>
  </div>
</template>
