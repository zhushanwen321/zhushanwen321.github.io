# 内容页面实施计划

> 本文档是 [plan.md](plan.md) 的子计划，包含 Tasks 6-10：17 个文档页面的完整内容。

所有页面位于 `src/views/project/llm-simple-router/` 下，统一使用 Tailwind `prose prose-invert` 排版。

共享组件导入路径：
- `CodeBlock` → `../../../components/CodeBlock.vue`（从 features/ 等子目录）
- `ScreenShot` → `../../../components/ScreenShot.vue`

---

## Task 6: Quick Start Pages (2 pages)

**Files:**
- Create: `src/views/project/llm-simple-router/Overview.vue`
- Create: `src/views/project/llm-simple-router/getting-started/Index.vue`

- [ ] **Step 1: 创建 Overview.vue**

```vue
<script setup lang="ts">
import CodeBlock from '../../../components/CodeBlock.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>LLM Simple Router</h1>
    <p class="text-lg text-gray-400">
      LLM API 代理路由器。接收 Claude Code / Cursor 等客户端请求，通过模型映射和路由策略转发到配置的后端 Provider，支持流式（SSE）和非流式代理。
    </p>

    <h2>解决的核心问题</h2>
    <ul>
      <li>国产模型限流频繁，影响开发效率</li>
      <li>多供应商切换麻烦，手动改配置成本高</li>
      <li>并发控制缺失，多项目同时使用容易撞限</li>
    </ul>

    <h2>适合谁</h2>
    <ul>
      <li>用 Claude Code 配合国产模型（智谱、Moonshot、Minimax 等）的开发者</li>
      <li>希望自动重试限流错误、分时段切换模型、控制并发排队</li>
      <li>想要一个开箱即用的方案，不折腾</li>
    </ul>

    <h2>快速体验</h2>
    <CodeBlock code="npx llm-simple-router" language="bash" />
    <p>
      访问 <code>http://localhost:9981/admin</code>，首次进入 Setup 页面设置管理员密码。数据存储在 <code>~/.llm-simple-router/</code>。
    </p>

    <h2>工作原理</h2>
    <div class="not-prose my-6 rounded-lg border border-white/10 bg-surface-50 p-6">
      <code class="text-sm font-mono text-gray-300">
        Claude Code → Router (模型映射 + 自动重试 + 并发控制) → 智谱 GLM / Kimi / 其他供应商
      </code>
    </div>
    <p>
      Router 根据模型映射找到后端供应商 → 转发请求 → 自动重试失败请求 → 记录日志和性能指标 → 返回响应。
    </p>

    <h2>功能一览</h2>
    <table>
      <thead>
        <tr><th>功能</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>自动重试</td><td>对 429/400/网络超时自动指数退避重试</td></tr>
        <tr><td>多供应商支持</td><td>智谱、Moonshot、Minimax、火山引擎、阿里云、腾讯云等</td></tr>
        <tr><td>模型分时段映射</td><td>按时间段自动切换后端模型</td></tr>
        <tr><td>并发队列等待</td><td>按 Provider 配置并发数上限，超限请求排队等待</td></tr>
        <tr><td>Failover 故障转移</td><td>多 Provider 互备，失败自动切换下一个</td></tr>
        <tr><td>实时请求监控</td><td>SSE 推送活跃请求、队列状态、流式输出实时查看</td></tr>
        <tr><td>多密钥管理</td><td>独立密钥 + 模型白名单，支持多用户/多项目</td></tr>
        <tr><td>请求日志</td><td>四阶段完整链路（客户端请求/上游请求/上游响应/客户端响应）</td></tr>
        <tr><td>性能指标</td><td>TTFT、TPS、Token 用量、缓存命中率</td></tr>
      </tbody>
    </table>
  </div>
</template>
```

- [ ] **Step 2: 创建 getting-started/Index.vue**

```vue
<script setup lang="ts">
import CodeBlock from '../../../../components/CodeBlock.vue'
import ScreenShot from '../../../../components/ScreenShot.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>启动 Router</h1>

    <h2>1. 安装并启动</h2>
    <CodeBlock code="npx llm-simple-router" language="bash" />
    <p>
      启动后访问 <code>http://localhost:9981/admin</code>，首次进入 Setup 页面设置管理员密码。数据存储在 <code>~/.llm-simple-router/</code>。
    </p>
    <ScreenShot src="/images/llm-simple-router/dashboard.png" caption="Dashboard 管理面板" />

    <h2>2. 添加 Provider</h2>
    <p>
      管理后台 &gt; Provider 页面 &gt; 添加 Provider。选择 Coding Plan 后会自动填写 Base URL，只需填入 API Key。
    </p>
    <ScreenShot src="/images/llm-simple-router/provider_concurrency.png" caption="Provider 管理 + 并发控制" />

    <h2>3. 配置模型映射</h2>
    <p>
      核心概念：客户端请求携带模型名 A，Router 根据映射规则将其替换为后端 Provider 支持的模型名 B，然后转发请求：
    </p>
    <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
      <code class="text-sm font-mono text-gray-300">
        Claude Code (模型 A) → Router (A → B) → Provider API (模型 B)
      </code>
    </div>
    <ScreenShot src="/images/llm-simple-router/model_mapping.png" caption="模型映射配置" />

    <p>Claude Code 未设置环境变量时，默认使用模型名 <code>opus</code>、<code>sonnet</code>、<code>haiku</code>。典型映射配置：</p>
    <table>
      <thead>
        <tr><th>客户端模型</th><th>后端模型</th><th>供应商</th><th>时间窗口</th></tr>
      </thead>
      <tbody>
        <tr><td>opus</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>全天</td></tr>
        <tr><td>sonnet</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>全天</td></tr>
        <tr><td>haiku</td><td>glm-5-turbo</td><td>智谱 Coding Plan</td><td>全天</td></tr>
      </tbody>
    </table>

    <h2>4. 配置 Claude Code</h2>
    <p>在管理后台创建 Router API 密钥，然后选择一种方式配置。详见 <router-link to="/project/llm-simple-router/guide/config/claude-code">Claude Code 配置</router-link> 页面。</p>

    <h2>5. 开始使用</h2>
    <CodeBlock code="# 方式一（shell alias）&#10;clode&#10;&#10;# 方式二（settings.json）&#10;claude" language="bash" />
  </div>
</template>
```

- [ ] **Step 3: 验证两个页面**

```bash
npm run dev
```

Expected: 概览页显示完整表格和代码块，启动页显示步骤引导和截图占位

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Overview and Getting Started pages"
```

---

## Task 7: Feature Pages (7 pages)

**Files:**
- Create: `src/views/project/llm-simple-router/features/AutoRetry.vue`
- Create: `src/views/project/llm-simple-router/features/Providers.vue`
- Create: `src/views/project/llm-simple-router/features/ModelMapping.vue`
- Create: `src/views/project/llm-simple-router/features/Concurrency.vue`
- Create: `src/views/project/llm-simple-router/features/Failover.vue`
- Create: `src/views/project/llm-simple-router/features/Monitor.vue`
- Create: `src/views/project/llm-simple-router/features/MultiKey.vue`

- [ ] **Step 1: 创建 AutoRetry.vue**

```vue
<script setup lang="ts">
import CodeBlock from '../../../components/CodeBlock.vue'
import ScreenShot from '../../../components/ScreenShot.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>自动重试</h1>
    <p>
      当后端 Provider 返回 429（限流）、400（特定错误）或网络超时时，Router 自动按重试规则进行指数退避重试，无需手动干预。
    </p>

    <h2>重试策略</h2>
    <table>
      <thead>
        <tr><th>策略</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Fixed（固定间隔）</td><td>每次重试等待固定时间</td></tr>
        <tr><td>Exponential（指数退避）</td><td>每次重试等待时间翻倍，避免雪崩</td></tr>
      </tbody>
    </table>

    <h2>重试规则配置</h2>
    <p>
      在管理后台的重试规则页面，可以按状态码配置是否重试、重试策略、最大重试次数、基础延迟等参数。默认规则针对智谱模型的常见限流场景配置。
    </p>
    <ScreenShot src="/images/llm-simple-router/retry.png" caption="重试规则配置" />

    <h2>重试流程</h2>
    <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
      <code class="text-sm font-mono text-gray-300 block leading-loose">
        请求发送 → 收到 429/400/超时<br>
        → 判断是否可重试（匹配重试规则）<br>
        → 等待（fixed 或 exponential 退避）<br>
        → 重新发送请求<br>
        → 重复直到成功或达到最大重试次数
      </code>
    </div>

    <h2>相关环境变量</h2>
    <table>
      <thead>
        <tr><th>变量</th><th>默认值</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td><code>RETRY_MAX_ATTEMPTS</code></td><td>3</td><td>最大重试次数</td></tr>
        <tr><td><code>RETRY_BASE_DELAY_MS</code></td><td>1000</td><td>重试基础延迟（ms）</td></tr>
      </tbody>
    </table>
  </div>
</template>
```

- [ ] **Step 2: 创建 Providers.vue**

```vue
<template>
  <div class="prose prose-invert max-w-none">
    <h1>多供应商支持</h1>
    <p>
      Router 支持配置多个后端 Provider，统一管理不同的 LLM API 供应商。每个 Provider 独立配置 Base URL、API Key、并发数等参数。
    </p>

    <h2>支持的供应商</h2>
    <table>
      <thead>
        <tr><th>供应商</th><th>说明</th><th>备注</th></tr>
      </thead>
      <tbody>
        <tr><td>智谱（Zhipu）</td><td>GLM 系列模型</td><td>Coding Plan 自动填写 Base URL</td></tr>
        <tr><td>Moonshot</td><td>Kimi 系列模型</td><td>支持 kimi-for-coding</td></tr>
        <tr><td>Minimax</td><td>MiniMax 系列模型</td><td></td></tr>
        <tr><td>火山引擎</td><td>字节跳动云服务</td><td></td></tr>
        <tr><td>阿里云</td><td>通义千问系列</td><td></td></tr>
        <tr><td>腾讯云</td><td>混元系列</td><td></td></tr>
        <tr><td>OpenAI</td><td>GPT 系列</td><td></td></tr>
        <tr><td>Anthropic</td><td>Claude 系列</td><td></td></tr>
      </tbody>
    </table>

    <h2>添加 Provider</h2>
    <p>
      在管理后台 &gt; Provider 页面 &gt; 添加 Provider。选择 Coding Plan 后会自动填写 Base URL，只需填入 API Key。
    </p>

    <h2>并发控制</h2>
    <p>
      每个 Provider 可独立配置并发数上限。超过并发限制的请求会排队等待，不会丢失。队列满时返回 503，等待超时返回 504。
    </p>
  </div>
</template>
```

- [ ] **Step 3: 创建 ModelMapping.vue**

```vue
<script setup lang="ts">
import ScreenShot from '../../../components/ScreenShot.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>模型映射</h1>
    <p>
      核心概念：客户端请求携带模型名 A，Router 根据映射规则将其替换为后端 Provider 支持的模型名 B，然后转发请求。
    </p>
    <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
      <code class="text-sm font-mono text-gray-300">
        Claude Code (模型 A) → Router (A → B) → Provider API (模型 B)
      </code>
    </div>

    <h2>基础映射</h2>
    <p>只需在映射表中配置「客户端模型 = A，后端模型 = B，选择供应商」即可。</p>
    <p>Claude Code 未设置环境变量时，默认使用模型名 <code>opus</code>、<code>sonnet</code>、<code>haiku</code>。</p>
    <ScreenShot src="/images/llm-simple-router/model_mapping.png" caption="模型映射配置" />

    <h2>分时段映射</h2>
    <p>
      利用分时段功能，可以按时间段自动切换后端模型。例如高峰期（智谱限流频繁时段）切到 Kimi，低谷期切回 GLM：
    </p>
    <table>
      <thead>
        <tr><th>客户端模型</th><th>后端模型</th><th>供应商</th><th>时间窗口</th></tr>
      </thead>
      <tbody>
        <tr><td>sonnet</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>00:00-14:00</td></tr>
        <tr><td>sonnet</td><td>kimi-for-coding</td><td>Moonshot</td><td>14:00-18:00</td></tr>
        <tr><td>sonnet</td><td>glm-5.1</td><td>智谱 Coding Plan</td><td>18:00-24:00</td></tr>
      </tbody>
    </table>

    <h2>路由策略</h2>
    <p>同一个客户端模型可以配置多个映射规则，Router 通过路由策略选择使用哪个：</p>
    <table>
      <thead>
        <tr><th>策略</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Scheduled（定时）</td><td>按时间窗口切换，适合分时段映射</td></tr>
        <tr><td>Round-Robin（轮询）</td><td>依次轮换各 Provider，均匀分摊负载</td></tr>
        <tr><td>Random（随机）</td><td>随机选择 Provider</td></tr>
        <tr><td>Failover（故障转移）</td><td>优先使用第一个，失败自动切换下一个</td></tr>
      </tbody>
    </table>
  </div>
</template>
```

- [ ] **Step 4: 创建 Concurrency.vue**

```vue
<template>
  <div class="prose prose-invert max-w-none">
    <h1>并发控制</h1>
    <p>
      按 Provider 配置并发数上限，超限请求排队等待。防止同时发送过多请求导致 Provider 限流或报错。
    </p>

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
    <p>
      在管理后台 &gt; Provider 页面，为每个 Provider 设置最大并发数。建议根据 Provider 的 API 限制合理配置，避免触发限流。
    </p>

    <h2>信号量机制</h2>
    <p>
      Router 使用基于 Promise 的信号量机制实现并发控制。每个 Provider 维护独立的信号量，互不影响。支持 AbortSignal 和超时，确保请求不会无限等待。
    </p>

    <h2>监控</h2>
    <p>
      实时监控页面可以看到每个 Provider 的当前活跃请求数、等待队列长度等状态。详见 <router-link to="/project/llm-simple-router/guide/features/monitor">实时监控</router-link>。
    </p>
  </div>
</template>
```

- [ ] **Step 5: 创建 Failover.vue**

```vue
<template>
  <div class="prose prose-invert max-w-none">
    <h1>故障转移（Failover）</h1>
    <p>
      配置 Failover 路由策略后，多个 Provider 互为备份。请求失败时自动排除当前 Provider，切换到下一个可用的 Provider 重试。
    </p>

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
    <p>
      在模型映射页面，为同一个客户端模型配置多个映射规则，路由策略选择「Failover」。Router 会按配置顺序依次尝试。
    </p>

    <h2>典型场景</h2>
    <p>
      主力 Provider（如智谱）偶尔限流或不可用时，自动切换到备用 Provider（如 Moonshot），确保开发不中断。当主力 Provider 恢复后，下次请求自动回到主力。
    </p>
  </div>
</template>
```

- [ ] **Step 6: 创建 Monitor.vue**

```vue
<script setup lang="ts">
import ScreenShot from '../../../components/ScreenShot.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>实时监控</h1>
    <p>
      管理后台提供实时请求监控功能，通过 SSE（Server-Sent Events）推送活跃请求、队列状态、流式输出等内容，无需刷新页面。
    </p>
    <ScreenShot src="/images/llm-simple-router/monitor.png" caption="实时请求监控" />

    <h2>监控内容</h2>
    <table>
      <thead>
        <tr><th>指标</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>活跃请求</td><td>当前正在处理的请求数量和详情</td></tr>
        <tr><td>队列状态</td><td>各 Provider 的等待队列长度</td></tr>
        <tr><td>流式输出</td><td>实时查看 SSE 流式代理的输出内容</td></tr>
        <tr><td>请求统计</td><td>成功率、平均延迟等汇总数据</td></tr>
      </tbody>
    </table>

    <h2>访问方式</h2>
    <p>
      管理后台 &gt; 监控页面。页面自动通过 SSE 连接后端，实时推送更新数据。
    </p>
  </div>
</template>
```

- [ ] **Step 7: 创建 MultiKey.vue**

```vue
<template>
  <div class="prose prose-invert max-w-none">
    <h1>多密钥管理</h1>
    <p>
      Router 支持创建多个独立的 API 密钥，每个密钥可以配置模型白名单。适合多用户、多项目共享同一个 Router 实例的场景。
    </p>

    <h2>密钥特性</h2>
    <table>
      <thead>
        <tr><th>特性</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>独立密钥</td><td>每个密钥格式为 <code>sk-router-xxx</code>，独立认证</td></tr>
        <tr><td>模型白名单</td><td>限制密钥只能访问指定的模型</td></tr>
        <tr><td>多用户支持</td><td>不同用户使用不同密钥，互不干扰</td></tr>
        <tr><td>多项目支持</td><td>不同项目使用不同密钥，便于追踪用量</td></tr>
      </tbody>
    </table>

    <h2>创建密钥</h2>
    <p>
      管理后台 &gt; 密钥管理页面 &gt; 创建密钥。设置密钥名称、模型白名单（可选）后自动生成密钥字符串。
    </p>

    <h2>认证方式</h2>
    <p>
      客户端请求通过 <code>Authorization: Bearer sk-router-xxx</code> 头携带密钥。Router 对密钥进行 SHA256 哈希后查询数据库验证。
    </p>
  </div>
</template>
```

- [ ] **Step 8: 验证功能页面**

```bash
npm run dev
```

Expected: 7 个功能页面均可通过侧边栏导航访问，内容、表格、截图正常渲染

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add 7 feature documentation pages"
```

---

## Task 8: Config Pages (3 pages)

**Files:**
- Create: `src/views/project/llm-simple-router/config/ClaudeCode.vue`
- Create: `src/views/project/llm-simple-router/config/Env.vue`
- Create: `src/views/project/llm-simple-router/config/Docker.vue`

- [ ] **Step 1: 创建 ClaudeCode.vue**

```vue
<script setup lang="ts">
import CodeBlock from '../../../components/CodeBlock.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>Claude Code 配置</h1>
    <p>
      在管理后台创建 Router API 密钥后，选择一种方式配置 Claude Code。<strong>两种方式只需选其一。</strong>
    </p>

    <h2>方式一：shell alias（推荐）</h2>
    <p>最小配置，Claude Code 使用默认模型名（opus / sonnet / haiku），Router 通过映射表转换为后端模型：</p>
    <CodeBlock :code="'alias clode=\'\\\nexport ANTHROPIC_AUTH_TOKEN=\"<your-router-key>\" && \\\nexport ANTHROPIC_BASE_URL=\"http://127.0.0.1:9981\" && \\\nclaude\'" language="bash" />
    <p>也可以通过环境变量直接指定模型名，绕过 Router 映射：</p>
    <CodeBlock :code="'alias clode=\'\\\nexport ANTHROPIC_AUTH_TOKEN=\"sk-router-xxxxxxxx\" && \\\nexport ANTHROPIC_BASE_URL=\"http://192.168.1.111:9981\" && \\\nexport ANTHROPIC_MODEL=\"glm-5\" && \\\nexport ANTHROPIC_DEFAULT_OPUS_MODEL=\"glm-5.1\" && \\\nexport ANTHROPIC_DEFAULT_SONNET_MODEL=\"glm-5\" && \\\nexport ANTHROPIC_DEFAULT_HAIKU_MODEL=\"glm-5-turbo\" && \\\nexport ANTHROPIC_SMALL_FAST_MODEL=\"glm-5-turbo\" && \\\nclaude\'" language="bash" />

    <h2>方式二：~/.claude/settings.json</h2>
    <p>在 <code>~/.claude/settings.json</code> 的 <code>env</code> 字段中配置，效果与 export 环境变量相同。</p>
    <p>最小配置：</p>
    <CodeBlock :code="'{\n  \"env\": {\n    \"ANTHROPIC_AUTH_TOKEN\": \"<your-router-key>\",\n    \"ANTHROPIC_BASE_URL\": \"http://127.0.0.1:9981\"\n  }\n}'" language="json" />
    <p>覆盖模型名：</p>
    <CodeBlock :code="'{\n  \"env\": {\n    \"ANTHROPIC_AUTH_TOKEN\": \"sk-router-xxxxxxxx\",\n    \"ANTHROPIC_BASE_URL\": \"http://192.168.1.111:9981\",\n    \"ANTHROPIC_MODEL\": \"glm-5\",\n    \"ANTHROPIC_DEFAULT_OPUS_MODEL\": \"glm-5.1\",\n    \"ANTHROPIC_DEFAULT_SONNET_MODEL\": \"glm-5\",\n    \"ANTHROPIC_DEFAULT_HAIKU_MODEL\": \"glm-5-turbo\",\n    \"ANTHROPIC_SMALL_FAST_MODEL\": \"glm-5-turbo\"\n  }\n}'" language="json" />

    <h2>提示</h2>
    <ul>
      <li><code>settings.json</code> 中的环境变量对所有项目生效</li>
      <li>如果只想对当前项目生效，可放在 <code>.claude/settings.json</code>（项目根目录下）</li>
      <li>调试时可加参数：<code>claude --dangerously-skip-permissions --verbose --debug</code></li>
    </ul>
  </div>
</template>
```

- [ ] **Step 2: 创建 Env.vue**

```vue
<template>
  <div class="prose prose-invert max-w-none">
    <h1>环境变量</h1>
    <p>所有密钥通过 Setup 页面设置，以下为可选配置项：</p>
    <table>
      <thead>
        <tr><th>变量</th><th>默认值</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td><code>PORT</code></td><td>9981</td><td>服务端口</td></tr>
        <tr><td><code>DB_PATH</code></td><td><code>~/.llm-simple-router/router.db</code></td><td>SQLite 数据库路径</td></tr>
        <tr><td><code>LOG_LEVEL</code></td><td>info</td><td>日志级别</td></tr>
        <tr><td><code>TZ</code></td><td>Asia/Shanghai</td><td>时区设置</td></tr>
        <tr><td><code>STREAM_TIMEOUT_MS</code></td><td>3000000</td><td>流式代理空闲超时（ms）</td></tr>
        <tr><td><code>RETRY_MAX_ATTEMPTS</code></td><td>3</td><td>最大重试次数</td></tr>
        <tr><td><code>RETRY_BASE_DELAY_MS</code></td><td>1000</td><td>重试基础延迟（ms）</td></tr>
      </tbody>
    </table>

    <h2>使用方式</h2>
    <p>在启动命令前添加环境变量即可：</p>
    <div class="not-prose my-4 rounded-lg border border-white/10 bg-surface-50 p-4">
      <code class="text-sm font-mono text-gray-300">PORT=8080 LOG_LEVEL=debug npx llm-simple-router</code>
    </div>
  </div>
</template>
```

- [ ] **Step 3: 创建 Docker.vue**

```vue
<script setup lang="ts">
import CodeBlock from '../../../components/CodeBlock.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>Docker 部署</h1>

    <h2>快速启动</h2>
    <CodeBlock code="docker compose up -d" language="bash" />
    <p>环境变量通过 Setup 页面设置，不需要 <code>.env</code> 文件。</p>

    <h2>docker-compose.yml</h2>
    <p>项目根目录已包含 <code>docker-compose.yml</code> 文件，开箱即用：</p>
    <CodeBlock :code="'version: \"3\"\nservices:\n  router:\n    build: .\n    ports:\n      - \"9981:9981\"\n    volumes:\n      - router-data:/root/.llm-simple-router\n\nvolumes:\n  router-data:'" language="yaml" />

    <h2>数据持久化</h2>
    <p>
      Docker 部署时，数据存储在容器内的 <code>/root/.llm-simple-router/</code> 目录。通过 Docker volume 挂载确保数据持久化，容器重启后数据不丢失。
    </p>
  </div>
</template>
```

- [ ] **Step 4: 验证配置页面**

```bash
npm run dev
```

Expected: 3 个配置页面正常显示，代码块内容完整

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Claude Code config, environment variables, and Docker deployment pages"
```

---

## Task 9: Architecture Pages (2 pages)

**Files:**
- Create: `src/views/project/llm-simple-router/architecture/SystemContext.vue`
- Create: `src/views/project/llm-simple-router/architecture/RequestPipeline.vue`

- [ ] **Step 1: 创建 SystemContext.vue**

```vue
<template>
  <div class="prose prose-invert max-w-none">
    <h1>系统上下文</h1>
    <p>展示 LLM Simple Router 在整体架构中的位置和与其他系统的关系。</p>

    <h2>系统上下文图</h2>
    <div class="not-prose my-6">
      <div class="flex flex-col items-center gap-6 rounded-lg border border-white/10 bg-surface-50 p-8">
        <div class="flex items-center gap-4">
          <div class="rounded-lg border border-blue-500/30 bg-blue-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-blue-400">Claude Code / Cursor</p>
            <p class="text-xs text-gray-500">API 请求 · Bearer Token</p>
          </div>
          <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div class="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-cyan-400">LLM Simple Router</p>
            <p class="text-xs text-gray-500">映射 · 重试 · 并发控制</p>
          </div>
          <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div class="rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-green-400">智谱 / Moonshot / ...</p>
            <p class="text-xs text-gray-500">SSE 流式 · JSON 响应</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="rounded-lg border border-purple-500/30 bg-purple-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-purple-400">管理员</p>
            <p class="text-xs text-gray-500">管理后台 /admin/</p>
          </div>
          <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div class="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-6 py-4 text-center">
            <p class="text-sm font-semibold text-cyan-400">LLM Simple Router</p>
            <p class="text-xs text-gray-500">配置 · 日志 · 监控</p>
          </div>
        </div>
      </div>
    </div>

    <h2>组件说明</h2>
    <table>
      <thead>
        <tr><th>组件</th><th>角色</th></tr>
      </thead>
      <tbody>
        <tr><td>客户端</td><td>通过 OpenAI 或 Anthropic 格式的 API 发送请求</td></tr>
        <tr><td>管理员</td><td>通过浏览器访问管理后台，配置 Provider、映射规则、密钥，查看日志和监控</td></tr>
        <tr><td>Router</td><td>完成模型映射、并发控制、自动重试、日志记录</td></tr>
        <tr><td>上游 Provider</td><td>接收转发的请求，返回 SSE 流或 JSON 响应</td></tr>
      </tbody>
    </table>
  </div>
</template>
```

- [ ] **Step 2: 创建 RequestPipeline.vue**

```vue
<template>
  <div class="prose prose-invert max-w-none">
    <h1>请求流水线</h1>
    <p>展示请求从接收到响应的核心处理流程。</p>

    <h2>流水线图</h2>
    <div class="not-prose my-6">
      <div class="overflow-x-auto rounded-lg border border-white/10 bg-surface-50 p-8">
        <div class="flex items-center gap-2 min-w-max">
          <div v-for="(stage, i) in stages" :key="i" class="flex items-center gap-2">
            <div class="rounded-lg border border-white/20 bg-surface-100 px-4 py-3 text-center min-w-[100px]">
              <p class="text-sm font-semibold text-gray-200">{{ stage.name }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ stage.desc }}</p>
            </div>
            <svg v-if="i < stages.length - 1" class="h-4 w-4 shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
        <!-- 重试回路 -->
        <div class="mt-4 flex items-center gap-2 pl-[440px]">
          <svg class="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="text-xs text-amber-400">失败重试 / Failover 切换 Provider</span>
        </div>
      </div>
    </div>

    <h2>阶段说明</h2>
    <table>
      <thead>
        <tr><th>阶段</th><th>做什么</th></tr>
      </thead>
      <tbody>
        <tr><td>认证</td><td>Bearer Token SHA256 哈希后查询 router_keys 表</td></tr>
        <tr><td>模型映射 + 路由策略</td><td>客户端模型名映射到后端 Provider 的实际模型；支持分时段/轮询/随机/故障转移</td></tr>
        <tr><td>并发排队</td><td>Provider 级信号量，队列满返回 503，超时返回 504</td></tr>
        <tr><td>调用上游</td><td>原生 HTTP 代理，支持 SSE 流式；失败按规则自动重试，Failover 策略下切换 Provider</td></tr>
        <tr><td>日志 + 指标</td><td>记录完整请求链路，采集 Token 用量、TTFT、TPS</td></tr>
        <tr><td>返回响应</td><td>将上游响应原样返回客户端</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const stages = [
  { name: '认证', desc: 'Token 校验' },
  { name: '模型映射', desc: 'A → B 转换' },
  { name: '并发排队', desc: '信号量控制' },
  { name: '调用上游', desc: 'HTTP 代理' },
  { name: '日志 + 指标', desc: '记录采集' },
  { name: '返回响应', desc: '原样返回' },
]
</script>
```

- [ ] **Step 3: 验证架构页面**

```bash
npm run dev
```

Expected: 系统上下文页显示彩色组件图，请求流水线页显示阶段流程图和重试回路

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add system context and request pipeline architecture pages"
```

---

## Task 10: Logging + Metrics Pages (3 pages)

**Files:**
- Create: `src/views/project/llm-simple-router/logging/Pipeline.vue`
- Create: `src/views/project/llm-simple-router/metrics/TtftTps.vue`
- Create: `src/views/project/llm-simple-router/metrics/Tokens.vue`

- [ ] **Step 1: 创建 logging/Pipeline.vue**

```vue
<script setup lang="ts">
import ScreenShot from '../../../components/ScreenShot.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>四阶段链路日志</h1>
    <p>
      Router 为每个请求记录完整的四阶段链路日志，从客户端请求到客户端响应，覆盖请求的完整生命周期。
    </p>
    <ScreenShot src="/images/llm-simple-router/log.png" caption="请求日志页面" />

    <h2>四个阶段</h2>
    <table>
      <thead>
        <tr><th>阶段</th><th>记录内容</th></tr>
      </thead>
      <tbody>
        <tr><td>1. 客户端请求</td><td>请求时间、客户端模型名、请求 Token 数</td></tr>
        <tr><td>2. 上游请求</td><td>实际转发到的 Provider、后端模型名、请求头</td></tr>
        <tr><td>3. 上游响应</td><td>响应状态码、响应 Token 数、TTFT</td></tr>
        <tr><td>4. 客户端响应</td><td>最终返回给客户端的状态、总耗时、重试次数</td></tr>
      </tbody>
    </table>

    <h2>日志查看</h2>
    <p>
      管理后台 &gt; 请求日志页面。支持按时间范围、状态码、模型名等条件过滤。每条日志可展开查看四个阶段的详细信息。
    </p>

    <h2>重试和 Failover 标记</h2>
    <p>
      当请求经过重试或 Failover 时，日志会标记重试次数和切换的 Provider 信息，方便排查问题。
    </p>
  </div>
</template>
```

- [ ] **Step 2: 创建 metrics/TtftTps.vue**

```vue
<template>
  <div class="prose prose-invert max-w-none">
    <h1>TTFT / TPS</h1>
    <p>
      Router 为每个请求采集关键性能指标，帮助评估后端 Provider 的响应速度和吞吐量。
    </p>

    <h2>指标说明</h2>
    <table>
      <thead>
        <tr><th>指标</th><th>全称</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>TTFT</td><td>Time To First Token</td><td>从发送请求到收到第一个 Token 的时间（ms），反映模型响应速度</td></tr>
        <tr><td>TPS</td><td>Tokens Per Second</td><td>每秒生成的 Token 数量，反映模型吞吐量</td></tr>
      </tbody>
    </table>

    <h2>采集方式</h2>
    <p>
      对于 SSE 流式请求，Router 在代理过程中旁路采集 TTFT 和每个 Token 的到达时间，计算 TPS。对于非流式请求，记录总响应时间。
    </p>

    <h2>查看指标</h2>
    <p>
      指标数据记录在请求日志中。管理后台 &gt; Dashboard 页面提供汇总视图，可按 Provider、模型、时间范围查看平均指标。
    </p>
  </div>
</template>
```

- [ ] **Step 3: 创建 metrics/Tokens.vue**

```vue
<template>
  <div class="prose prose-invert max-w-none">
    <h1>Token 用量</h1>
    <p>
      Router 记录每个请求的 Token 用量，包括输入 Token 和输出 Token，支持按密钥、模型、时间范围统计。
    </p>

    <h2>记录内容</h2>
    <table>
      <thead>
        <tr><th>字段</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>输入 Token</td><td>客户端请求中的 prompt / messages 占用的 Token 数</td></tr>
        <tr><td>输出 Token</td><td>模型生成的 completion 占用的 Token 数</td></tr>
        <tr><td>缓存命中率</td><td>Provider 返回的缓存命中信息（如支持）</td></tr>
        <tr><td>关联密钥</td><td>用于追踪不同用户/项目的用量</td></tr>
      </tbody>
    </table>

    <h2>用量统计</h2>
    <p>
      管理后台 &gt; Dashboard 页面提供 Token 用量汇总。可以按密钥、Provider、模型维度查看用量趋势，便于成本控制。
    </p>
  </div>
</template>
```

- [ ] **Step 4: 验证日志和指标页面**

```bash
npm run dev
```

Expected: 3 个页面正常显示，日志页含截图，指标页含表格

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add logging pipeline and metrics documentation pages"
```
