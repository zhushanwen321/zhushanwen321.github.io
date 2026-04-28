# 个人主页实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建 zhushanwen 个人主页 + 项目文档展示站，以 llm-simple-router 为首个核心项目。

**Architecture:** SPA 架构，Vite + Vue 3 + TypeScript + Tailwind CSS。顶部 NavBar 提供全局导航（个人介绍 / 项目介绍下拉 / 社交平台 / GitHub+Gitee）。项目文档页使用 DocLayout（左侧 SideBar + 内容区 + 页脚翻页）。内容页面为 Vue SFC，使用 Tailwind Typography 排版。

**Tech Stack:** Vite 5, Vue 3, TypeScript, Vue Router 4, Tailwind CSS 3, @tailwindcss/typography

**子计划文档：**
- [主计划（本文件）](plan.md) — Tasks 1-5: 项目脚手架、路由、布局组件、共享组件
- [内容页面](content-pages.md) — Tasks 6-10: 17 个文档页面的完整内容和代码
- [部署](deployment.md) — Task 11: 截图资源 + GitHub Actions 自动部署

---

## File Structure

```
zhushanwen321.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── images/
│       └── llm-simple-router/
│           ├── dashboard.png
│           ├── log.png
│           ├── model_mapping.png
│           ├── monitor.png
│           ├── provider_concurrency.png
│           ├── provider.png
│           ├── proxy_enhance.png
│           └── retry.png
├── src/
│   ├── App.vue
│   ├── main.ts
│   ├── style.css
│   ├── vite-env.d.ts
│   ├── config/
│   │   └── sidebar.ts
│   ├── router/
│   │   └── index.ts
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── SideBar.vue
│   │   ├── DocFooter.vue
│   │   ├── CodeBlock.vue
│   │   └── ScreenShot.vue
│   ├── layouts/
│   │   └── DocLayout.vue
│   └── views/
│       └── project/
│           └── llm-simple-router/
│               ├── Overview.vue
│               ├── getting-started/
│               │   └── Index.vue
│               ├── features/
│               │   ├── AutoRetry.vue
│               │   ├── Providers.vue
│               │   ├── ModelMapping.vue
│               │   ├── Concurrency.vue
│               │   ├── Failover.vue
│               │   ├── Monitor.vue
│               │   └── MultiKey.vue
│               ├── config/
│               │   ├── ClaudeCode.vue
│               │   ├── Env.vue
│               │   └── Docker.vue
│               ├── architecture/
│               │   ├── SystemContext.vue
│               │   └── RequestPipeline.vue
│               ├── logging/
│               │   └── Pipeline.vue
│               └── metrics/
│                   ├── TtftTps.vue
│                   └── Tokens.vue
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── tsconfig.node.json
```

---

## Task 1: Project Scaffold

**Files:**
- Delete: `_config.yml`
- Delete: `index.html` (old Jekyll)
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.ts`
- Create: `src/App.vue`
- Create: `src/style.css`
- Create: `src/vite-env.d.ts`

- [ ] **Step 1: 删除 Jekyll 旧文件**

```bash
cd /Users/zhushanwen/Code/zhushanwen321.github.io
rm -f _config.yml index.html
```

- [ ] **Step 2: 创建 package.json**

```json
{
  "name": "zhushanwen321-github-io",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.13",
    "vue-router": "^4.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.3",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.3",
    "tailwindcss": "^3.4.17",
    "@tailwindcss/typography": "^0.5.16",
    "typescript": "~5.7.3",
    "vite": "^6.3.2",
    "vue-tsc": "^2.2.8"
  }
}
```

- [ ] **Step 3: 安装依赖**

```bash
npm install
```

- [ ] **Step 4: 创建 vite.config.ts**

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/',
})
```

- [ ] **Step 5: 创建 tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0a0a0a',
          50: '#111111',
          100: '#1a1a1a',
          200: '#222222',
        },
        accent: {
          DEFAULT: '#3b82f6',
          dim: '#60a5fa',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

- [ ] **Step 6: 创建 postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 7: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

- [ ] **Step 8: 创建 tsconfig.node.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 9: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>zhushanwen</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
  </head>
  <body class="bg-surface text-gray-100 antialiased">
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 10: 创建 src/vite-env.d.ts**

```ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

- [ ] **Step 11: 创建 src/style.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  /* 自定义滚动条 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #0a0a0a;
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

@layer components {
  /* prose 暗色主题链接颜色 */
  .prose-invert a {
    color: #60a5fa;
  }
  .prose-invert a:hover {
    color: #93bbfd;
  }
  /* 表格暗色样式 */
  .prose-invert table thead {
    border-bottom-color: #333;
  }
  .prose-invert table tbody tr {
    border-bottom-color: #222;
  }
  /* 代码块暗色样式 */
  .prose-invert code {
    color: #a5f3fc;
    background: #1a1a1a;
  }
  .prose-invert code::before,
  .prose-invert code::after {
    content: none;
  }
  .prose-invert pre code {
    background: transparent;
    color: #e2e8f0;
  }
}
```

- [ ] **Step 12: 创建 src/main.ts**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

createApp(App).use(router).mount('#app')
```

- [ ] **Step 13: 创建 src/App.vue**

```vue
<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <router-view />
</template>
```

- [ ] **Step 14: 验证项目启动**

```bash
npm run dev
```

Expected: Vite dev server 启动，浏览器访问 http://localhost:5173 无报错（页面空白但无 console 错误）

- [ ] **Step 15: Commit**

```bash
git add -A
git commit -m "feat: init Vite + Vue 3 + TS + Tailwind project scaffold"
```

---

## Task 2: Sidebar Config + Router

**Files:**
- Create: `src/config/sidebar.ts`
- Create: `src/router/index.ts`

- [ ] **Step 1: 创建 src/config/sidebar.ts**

```ts
export interface SidebarItem {
  title: string
  path: string
}

export interface SidebarGroup {
  title: string
  items: SidebarItem[]
}

export const llmSimpleRouterSidebar: SidebarGroup[] = [
  {
    title: '快速开始',
    items: [
      { title: '概览', path: '/project/llm-simple-router/' },
      { title: '启动 Router', path: '/project/llm-simple-router/guide/getting-started' },
    ],
  },
  {
    title: '功能特性',
    items: [
      { title: '自动重试', path: '/project/llm-simple-router/guide/features/auto-retry' },
      { title: '多供应商支持', path: '/project/llm-simple-router/guide/features/providers' },
      { title: '模型映射', path: '/project/llm-simple-router/guide/features/model-mapping' },
      { title: '并发控制', path: '/project/llm-simple-router/guide/features/concurrency' },
      { title: '故障转移', path: '/project/llm-simple-router/guide/features/failover' },
      { title: '实时监控', path: '/project/llm-simple-router/guide/features/monitor' },
      { title: '多密钥管理', path: '/project/llm-simple-router/guide/features/multi-key' },
    ],
  },
  {
    title: '配置指南',
    items: [
      { title: 'Claude Code 配置', path: '/project/llm-simple-router/guide/config/claude-code' },
      { title: '环境变量', path: '/project/llm-simple-router/guide/config/env' },
      { title: 'Docker 部署', path: '/project/llm-simple-router/guide/config/docker' },
    ],
  },
  {
    title: '架构原理',
    items: [
      { title: '系统上下文', path: '/project/llm-simple-router/guide/architecture/system-context' },
      { title: '请求流水线', path: '/project/llm-simple-router/guide/architecture/request-pipeline' },
    ],
  },
  {
    title: '请求日志',
    items: [
      { title: '四阶段链路', path: '/project/llm-simple-router/guide/logging/pipeline' },
    ],
  },
  {
    title: '性能指标',
    items: [
      { title: 'TTFT / TPS', path: '/project/llm-simple-router/guide/metrics/ttft-tps' },
      { title: 'Token 用量', path: '/project/llm-simple-router/guide/metrics/tokens' },
    ],
  },
]

/** 展平所有页面路径 */
export function getAllPages(sidebar: SidebarGroup[]): SidebarItem[] {
  return sidebar.flatMap((group) => group.items)
}

/** 获取当前路径的上一页和下一页 */
export function getPrevNext(
  sidebar: SidebarGroup[],
  currentPath: string,
): { prev?: SidebarItem; next?: SidebarItem } {
  const pages = getAllPages(sidebar)
  const index = pages.findIndex((page) => page.path === currentPath)
  return {
    prev: index > 0 ? pages[index - 1] : undefined,
    next: index < pages.length - 1 ? pages[index + 1] : undefined,
  }
}
```

- [ ] **Step 2: 创建 src/router/index.ts**

```ts
import { createRouter, createWebHistory } from 'vue-router'
import DocLayout from '../layouts/DocLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/project/llm-simple-router/',
    },
    {
      path: '/project/llm-simple-router',
      component: DocLayout,
      children: [
        {
          path: '',
          component: () => import('../views/project/llm-simple-router/Overview.vue'),
        },
        {
          path: 'guide/getting-started',
          component: () => import('../views/project/llm-simple-router/getting-started/Index.vue'),
        },
        // 功能特性
        {
          path: 'guide/features/auto-retry',
          component: () => import('../views/project/llm-simple-router/features/AutoRetry.vue'),
        },
        {
          path: 'guide/features/providers',
          component: () => import('../views/project/llm-simple-router/features/Providers.vue'),
        },
        {
          path: 'guide/features/model-mapping',
          component: () => import('../views/project/llm-simple-router/features/ModelMapping.vue'),
        },
        {
          path: 'guide/features/concurrency',
          component: () => import('../views/project/llm-simple-router/features/Concurrency.vue'),
        },
        {
          path: 'guide/features/failover',
          component: () => import('../views/project/llm-simple-router/features/Failover.vue'),
        },
        {
          path: 'guide/features/monitor',
          component: () => import('../views/project/llm-simple-router/features/Monitor.vue'),
        },
        {
          path: 'guide/features/multi-key',
          component: () => import('../views/project/llm-simple-router/features/MultiKey.vue'),
        },
        // 配置指南
        {
          path: 'guide/config/claude-code',
          component: () => import('../views/project/llm-simple-router/config/ClaudeCode.vue'),
        },
        {
          path: 'guide/config/env',
          component: () => import('../views/project/llm-simple-router/config/Env.vue'),
        },
        {
          path: 'guide/config/docker',
          component: () => import('../views/project/llm-simple-router/config/Docker.vue'),
        },
        // 架构原理
        {
          path: 'guide/architecture/system-context',
          component: () => import('../views/project/llm-simple-router/architecture/SystemContext.vue'),
        },
        {
          path: 'guide/architecture/request-pipeline',
          component: () => import('../views/project/llm-simple-router/architecture/RequestPipeline.vue'),
        },
        // 请求日志
        {
          path: 'guide/logging/pipeline',
          component: () => import('../views/project/llm-simple-router/logging/Pipeline.vue'),
        },
        // 性能指标
        {
          path: 'guide/metrics/ttft-tps',
          component: () => import('../views/project/llm-simple-router/metrics/TtftTps.vue'),
        },
        {
          path: 'guide/metrics/tokens',
          component: () => import('../views/project/llm-simple-router/metrics/Tokens.vue'),
        },
      ],
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

export default router
```

- [ ] **Step 3: 创建占位 DocLayout（Task 4 会替换）**

创建 `src/layouts/DocLayout.vue`:

```vue
<template>
  <div class="pt-16">
    <div class="mx-auto max-w-7xl px-6 py-8">
      <router-view />
    </div>
  </div>
</template>
```

- [ ] **Step 4: 创建一个占位 Overview 页面**

创建 `src/views/project/llm-simple-router/Overview.vue`:

```vue
<template>
  <div class="prose prose-invert max-w-none">
    <h1>LLM Simple Router</h1>
    <p>LLM API 代理路由器。内容即将填充。</p>
  </div>
</template>
```

- [ ] **Step 5: 验证路由**

```bash
npm run dev
```

Expected: 访问 http://localhost:5173 自动跳转到 /project/llm-simple-router/，显示占位内容

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add sidebar config and vue-router with all routes"
```

---

## Task 3: NavBar Component

**Files:**
- Create: `src/components/NavBar.vue`
- Modify: `src/App.vue`

- [ ] **Step 1: 创建 src/components/NavBar.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileOpen = ref(false)
const projectDropdownOpen = ref(false)

const projects = [
  { name: 'LLM Simple Router', path: '/project/llm-simple-router/' },
]

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

function isActive(path: string): boolean {
  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-surface/80 backdrop-blur-md">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
      <!-- Logo -->
      <router-link to="/" class="font-mono text-lg font-bold tracking-tight text-gray-100 hover:text-accent-dim transition-colors">
        zhushanwen
      </router-link>

      <!-- Desktop Nav -->
      <div class="hidden items-center gap-1 md:flex">
        <!-- 个人介绍 -->
        <router-link
          to="/about"
          class="rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors"
        >
          个人介绍
        </router-link>

        <!-- 项目介绍 dropdown -->
        <div class="relative" @mouseleave="projectDropdownOpen = false">
          <button
            class="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors"
            :class="isActive('/project') ? 'text-gray-200 bg-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'"
            @mouseenter="projectDropdownOpen = true"
          >
            项目介绍
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-show="projectDropdownOpen"
            class="absolute left-0 top-full mt-1 w-56 rounded-lg border border-white/10 bg-surface-50 py-1 shadow-xl"
          >
            <router-link
              v-for="project in projects"
              :key="project.path"
              :to="project.path"
              class="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
              @click="projectDropdownOpen = false"
            >
              {{ project.name }}
            </router-link>
          </div>
        </div>

        <!-- 社交平台 -->
        <router-link
          to="/social"
          class="rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors"
        >
          社交平台
        </router-link>
      </div>

      <!-- Right icons -->
      <div class="flex items-center gap-3">
        <!-- GitHub -->
        <a
          href="https://github.com/zhushanwen321"
          target="_blank"
          rel="noopener"
          class="text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="GitHub"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <!-- Gitee -->
        <a
          href="https://gitee.com/zhushanwen321"
          target="_blank"
          rel="noopener"
          class="text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Gitee"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.926c0 .327.266.592.593.592h5.926c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.149a.592.592 0 0 1-.592-.592v-1.482a.592.592 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H8.37a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h5.85z"/>
          </svg>
        </a>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden text-gray-400 hover:text-gray-200 transition-colors"
          @click="toggleMobile"
          aria-label="Toggle menu"
        >
          <svg v-if="!mobileOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="mobileOpen" class="border-t border-white/10 md:hidden">
      <div class="space-y-1 px-4 py-3">
        <router-link to="/about" class="block rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/5" @click="mobileOpen = false">
          个人介绍
        </router-link>
        <div class="pl-3">
          <p class="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">项目介绍</p>
          <router-link
            v-for="project in projects"
            :key="project.path"
            :to="project.path"
            class="block rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/5"
            @click="mobileOpen = false"
          >
            {{ project.name }}
          </router-link>
        </div>
        <router-link to="/social" class="block rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/5" @click="mobileOpen = false">
          社交平台
        </router-link>
      </div>
    </div>
  </nav>
</template>
```

- [ ] **Step 2: 更新 src/App.vue，添加过渡动画**

```vue
<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

- [ ] **Step 3: 验证 NavBar**

```bash
npm run dev
```

Expected: 顶部固定导航栏显示，下拉菜单悬停展开，GitHub/Gitee 图标可见，移动端汉堡菜单可点击

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add NavBar with dropdown menus and mobile support"
```

---

## Task 4: DocLayout + SideBar + DocFooter

**Files:**
- Create: `src/components/SideBar.vue`
- Create: `src/components/DocFooter.vue`
- Modify: `src/layouts/DocLayout.vue`（替换占位版本）

- [ ] **Step 1: 创建 src/components/SideBar.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { llmSimpleRouterSidebar } from '../config/sidebar'

const route = useRoute()
const collapsed = ref(false)
const mobileOpen = ref(false)
const sidebar = llmSimpleRouterSidebar
const expandedGroups = ref<Record<string, boolean>>({})

function toggleGroup(title: string) {
  expandedGroups.value[title] = !expandedGroups.value[title]
}

function isActive(path: string): boolean {
  if (path === '/project/llm-simple-router/') {
    return route.path === '/project/llm-simple-router/' || route.path === '/project/llm-simple-router'
  }
  return route.path === path
}

function isGroupActive(group: { items: { path: string }[] }): boolean {
  return group.items.some((item) => isActive(item.path))
}
</script>

<template>
  <aside
    class="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] border-r border-white/10 bg-surface-50 overflow-y-auto transition-all duration-200"
    :class="collapsed ? 'w-0 md:w-16' : 'w-64'"
  >
    <nav class="p-4">
      <div
        v-for="group in sidebar"
        :key="group.title"
        class="mb-4"
      >
        <button
          class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-300 transition-colors"
          @click="toggleGroup(group.title)"
        >
          {{ group.title }}
          <svg
            class="h-3.5 w-3.5 transition-transform"
            :class="{ 'rotate-90': !expandedGroups[group.title] }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div v-show="expandedGroups[group.title] !== false">
          <router-link
            v-for="item in group.items"
            :key="item.path"
            :to="item.path"
            class="group relative flex items-center rounded-md px-3 py-1.5 text-sm transition-colors"
            :class="isActive(item.path)
              ? 'text-white bg-white/5'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'"
          >
            <!-- 左侧活跃指示条 -->
            <span
              class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r transition-colors"
              :class="isActive(item.path) ? 'bg-accent' : 'bg-transparent'"
            />
            {{ item.title }}
          </router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>
```

- [ ] **Step 2: 创建 src/components/DocFooter.vue**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPrevNext } from '../config/sidebar'
import { llmSimpleRouterSidebar } from '../config/sidebar'

const route = useRoute()

const navigation = computed(() => getPrevNext(llmSimpleRouterSidebar, route.path))
</script>

<template>
  <div class="flex items-center justify-between border-t border-white/10 pt-6 mt-12">
    <router-link
      v-if="navigation.prev"
      :to="navigation.prev.path"
      class="group flex flex-col items-start rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/5"
    >
      <span class="text-xs text-gray-500">上一页</span>
      <span class="text-sm text-gray-300 group-hover:text-white transition-colors">
        {{ navigation.prev.title }}
      </span>
    </router-link>
    <div v-else />

    <router-link
      v-if="navigation.next"
      :to="navigation.next.path"
      class="group flex flex-col items-end rounded-lg border border-white/10 px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/5"
    >
      <span class="text-xs text-gray-500">下一页</span>
      <span class="text-sm text-gray-300 group-hover:text-white transition-colors">
        {{ navigation.next.title }}
      </span>
    </router-link>
    <div v-else />
  </div>
</template>
```

- [ ] **Step 3: 替换 src/layouts/DocLayout.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SideBar from '../components/SideBar.vue'
import DocFooter from '../components/DocFooter.vue'

const sidebarOpen = ref(true)
</script>

<template>
  <div class="pt-14">
    <SideBar />
    <main
      class="min-h-[calc(100vh-3.5rem)] transition-all duration-200"
      :class="sidebarOpen ? 'ml-64' : 'ml-0 md:ml-16'"
    >
      <div class="mx-auto max-w-4xl px-8 py-10">
        <router-view />
        <DocFooter />
      </div>
    </main>
  </div>
</template>
```

- [ ] **Step 4: 验证布局**

```bash
npm run dev
```

Expected: 左侧侧边栏显示分组导航，点击可跳转，活跃页面高亮，底部显示上一页/下一页

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add DocLayout with SideBar and DocFooter"
```

---

## Task 5: Shared Components

**Files:**
- Create: `src/components/CodeBlock.vue`
- Create: `src/components/ScreenShot.vue`

- [ ] **Step 1: 创建 src/components/CodeBlock.vue**

```vue
<script setup lang="ts">
defineProps<{
  code: string
  language?: string
}>()
</script>

<template>
  <div class="my-4 overflow-hidden rounded-lg border border-white/10">
    <div class="flex items-center justify-between border-b border-white/10 bg-surface-100 px-4 py-2">
      <span class="text-xs text-gray-500">{{ language || 'bash' }}</span>
      <button
        class="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        @click="navigator.clipboard.writeText(code)"
      >
        复制
      </button>
    </div>
    <pre class="overflow-x-auto bg-surface-50 p-4 text-sm leading-relaxed"><code class="text-gray-300 font-mono">{{ code }}</code></pre>
  </div>
</template>
```

- [ ] **Step 2: 创建 src/components/ScreenShot.vue**

```vue
<script setup lang="ts">
defineProps<{
  src: string
  caption?: string
}>()
</script>

<template>
  <figure class="my-6">
    <div class="overflow-hidden rounded-lg border border-white/10">
      <img :src="src" :alt="caption || ''" class="w-full" />
    </div>
    <figcaption v-if="caption" class="mt-2 text-center text-sm text-gray-500">
      {{ caption }}
    </figcaption>
  </figure>
</template>
```

- [ ] **Step 3: 验证组件可用**

在 Overview.vue 中临时引用测试：

```vue
<script setup lang="ts">
import CodeBlock from '../../../components/CodeBlock.vue'
import ScreenShot from '../../../components/ScreenShot.vue'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <h1>LLM Simple Router</h1>
    <CodeBlock code="npx llm-simple-router" language="bash" />
    <ScreenShot src="/images/llm-simple-router/dashboard.png" caption="Dashboard" />
  </div>
</template>
```

```bash
npm run dev
```

Expected: 代码块显示终端风格，截图框显示（图片暂时 404 不影响布局）

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add CodeBlock and ScreenShot shared components"
```

---

## 后续任务

内容页面（Tasks 6-10）见 [content-pages.md](content-pages.md)
部署配置（Task 11）见 [deployment.md](deployment.md)
