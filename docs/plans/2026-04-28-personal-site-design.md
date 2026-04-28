# 个人主页设计文档

## 概述

为 zhushanwen 构建一个个人主页 + 项目展示网站，以 llm-simple-router 为首个核心项目，采用 SPA 多路由架构，风格类似 Ophel 文档站。

## 技术栈

- **框架**: Vite + Vue 3 + TypeScript
- **样式**: Tailwind CSS
- **路由**: Vue Router 4
- **部署**: GitHub Pages（GitHub Actions 自动部署）
- **视觉风格**: 技术感暗色主题（Vercel / Linear / Raycast 风格）

## 页面布局

### 顶部导航栏（全局固定）

```
zhushanwen        个人介绍   项目介绍 ▾   社交平台       GitHub  Gitee
                                ├─ llm-simple-router
                                └─ (更多项目...)
```

- 左侧：Logo / 名字
- 中间：三个主菜单（下拉式）
  - **个人介绍**：跳转个人页（后续再做）
  - **项目介绍**：下拉菜单，列出所有项目，目前只有 llm-simple-router
  - **社交平台**：跳转社交页（后续再做）
- 右侧：GitHub / Gitee 图标链接

### 项目文档页布局

点击 "llm-simple-router" 后进入文档页：

```
┌─────────────────────────────────────────────────────┐
│  顶部导航栏（全局固定，"项目介绍" 高亮）              │
├────────────┬────────────────────────────────────────┤
│  左侧边栏   │            内容区域                    │
│  (可折叠)   │                                        │
│            │  根据页面展示：                          │
│  快速开始   │  • 文字说明 + 表格                      │
│  ├ 概览    │  • 代码块（终端风格）                    │
│  └ 启动    │  • 截图展示                             │
│            │  • Mermaid 架构图                        │
│  功能特性   │  • 步骤引导                             │
│  ├ 自动重试 │                                        │
│  ├ 多供应商 │                                        │
│  ├ 模型映射 │                                        │
│  ├ 并发控制 │                                        │
│  ├ 故障转移 │                                        │
│  ├ 实时监控 │                                        │
│  └ 多密钥   │                                        │
│            │                                        │
│  配置指南   │                                        │
│  ├ Claude  │                                        │
│  ├ 环境变量 │                                        │
│  └ Docker  │                                        │
│            │                                        │
│  架构原理   │                                        │
│  ├ 系统上下文│                                       │
│  └ 请求流水线│                                       │
│            │                                        │
│  请求日志   │                                        │
│  └ 四阶段链路│                                       │
│            │                                        │
│  性能指标   │                                        │
│  ├ TTFT/TPS│                                        │
│  └ Token   │                                        │
├────────────┤                                        │
│  ← 上一页  → 下一页 │                               │
└────────────┴────────────────────────────────────────┘
```

## 路由结构

### 全局页面（后续开发）

| 路由 | 页面 | 状态 |
|------|------|------|
| `/` | 首页重定向到项目文档 | 先做 |
| `/about` | 个人介绍 | 后续 |
| `/social` | 社交平台 | 后续 |

### llm-simple-router 文档页

| 路由 | 分类 | 页面标题 |
|------|------|----------|
| `/project/llm-simple-router/` | 快速开始 | 概览 |
| `/project/llm-simple-router/guide/getting-started` | 快速开始 | 启动 Router |
| `/project/llm-simple-router/guide/features/auto-retry` | 功能特性 | 自动重试 |
| `/project/llm-simple-router/guide/features/providers` | 功能特性 | 多供应商支持 |
| `/project/llm-simple-router/guide/features/model-mapping` | 功能特性 | 模型映射 |
| `/project/llm-simple-router/guide/features/concurrency` | 功能特性 | 并发控制 |
| `/project/llm-simple-router/guide/features/failover` | 功能特性 | 故障转移 |
| `/project/llm-simple-router/guide/features/monitor` | 功能特性 | 实时监控 |
| `/project/llm-simple-router/guide/features/multi-key` | 功能特性 | 多密钥管理 |
| `/project/llm-simple-router/guide/config/claude-code` | 配置指南 | Claude Code 配置 |
| `/project/llm-simple-router/guide/config/env` | 配置指南 | 环境变量 |
| `/project/llm-simple-router/guide/config/docker` | 配置指南 | Docker 部署 |
| `/project/llm-simple-router/guide/architecture/system-context` | 架构原理 | 系统上下文 |
| `/project/llm-simple-router/guide/architecture/request-pipeline` | 架构原理 | 请求流水线 |
| `/project/llm-simple-router/guide/logging/pipeline` | 请求日志 | 四阶段链路 |
| `/project/llm-simple-router/guide/metrics/ttft-tps` | 性能指标 | TTFT / TPS |
| `/project/llm-simple-router/guide/metrics/tokens` | 性能指标 | Token 用量 |

## 内容数据来源

| 内容 | 来源 |
|------|------|
| 概览、快速开始 | README.md 的「适合谁」「快速开始」部分 |
| 功能特性 7 个页面 | README.md 的「功能一览」表格 + 管理后台截图 |
| Claude Code 配置 | README.md 的步骤 3、4 |
| 环境变量 | README.md 的「环境变量」表格 |
| Docker 部署 | README.md 的「Docker 部署」部分 |
| 系统上下文 | `docs/system-context.md` |
| 请求流水线 | `docs/request-pipeline.md` |
| 截图素材 | `docs/screenshot/` 目录下的 7 张 PNG |

## 视觉设计规范

| 元素 | 规范 |
|------|------|
| 背景色 | `#0a0a0a` 深色 |
| 导航栏 | 半透明毛玻璃效果，`backdrop-blur` |
| 侧边栏 | `#111111` 背景，活跃项左侧高亮条 |
| 代码块 | 终端风格，深色背景 + 绿色/白色文字 |
| 卡片 | 微光边框/渐变，hover 时亮度提升 |
| 字体 | 等宽（代码）+ 无衬线（正文） |
| 页面切换 | fade + slight slide 过渡动画 |
| 移动端 | 侧边栏折叠为汉堡菜单 |

## 项目结构（规划）

```
zhushanwen321.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署
├── src/
│   ├── App.vue                 # 根组件（NavBar + RouterView）
│   ├── main.ts                 # 入口
│   ├── router/
│   │   └── index.ts            # 路由配置
│   ├── layouts/
│   │   ├── DefaultLayout.vue   # 无侧边栏布局（about/social）
│   │   └── DocLayout.vue       # 侧边栏 + 内容布局
│   ├── components/
│   │   ├── NavBar.vue          # 顶部导航
│   │   ├── SideBar.vue         # 左侧边栏
│   │   ├── DocFooter.vue       # 上一页/下一页
│   │   ├── CodeBlock.vue       # 代码块组件
│   │   ├── ScreenShot.vue      # 截图展示
│   │   └── FeatureCard.vue     # 功能卡片
│   └── views/
│       ├── project/
│       │   └── llm-simple-router/
│       │       ├── Overview.vue
│       │       ├── getting-started/
│       │       │   └── Index.vue
│       │       ├── features/
│       │       │   ├── AutoRetry.vue
│       │       │   ├── Providers.vue
│       │       │   ├── ModelMapping.vue
│       │       │   ├── Concurrency.vue
│       │       │   ├── Failover.vue
│       │       │   ├── Monitor.vue
│       │       │   └── MultiKey.vue
│       │       ├── config/
│       │       │   ├── ClaudeCode.vue
│       │       │   ├── Env.vue
│       │       │   └── Docker.vue
│       │       ├── architecture/
│       │       │   ├── SystemContext.vue
│       │       │   └── RequestPipeline.vue
│       │       ├── logging/
│       │       │   └── Pipeline.vue
│       │       └── metrics/
│       │           ├── TtftTps.vue
│       │           └── Tokens.vue
│       └── (about/social 后续添加)
├── public/
│   └── images/
│       └── llm-simple-router/  # 截图资源
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── docs/
    └── plans/                  # 设计文档
```

## 开发阶段

### Phase 1（当前）：核心框架 + llm-simple-router 文档

1. 初始化 Vite + Vue 3 + TypeScript + Tailwind 项目
2. 实现全局 NavBar（含下拉菜单）
3. 实现 DocLayout（侧边栏 + 内容区 + 页脚导航）
4. 实现 Vue Router 配置
5. 编写 llm-simple-router 17 个文档页面
6. 配置 GitHub Actions 自动部署
7. 复制截图资源到 public/images/

### Phase 2（后续）：个人页面

- `/about` 个人介绍页
- `/social` 社交平台页
- 首页重定向优化
