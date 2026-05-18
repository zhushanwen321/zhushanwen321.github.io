# 文档站与 README 同步 - 实施计划

> 日期: 2026-05-18
> 基准: `llm-simple-router-workspace/refactor-perf-bug-fix/README.md`
> 目标: `zhushanwen321.github.io` 文档站

## 背景

README 包含完整的 LLM Simple Router 使用文档，但文档站存在 3 个缺失页面、1 个内容严重不足页面、1 个路由 bug、以及若干内容同步差距。

## 任务拆分

### Task 1: 修复 router/index.ts 重复路由 bug

**文件**: `src/router/index.ts`
**改动**: 删除 5 个重复的 `/social` 路由定义，只保留 1 个
**预估**: 1 行保留 + 删除 10 行

### Task 2: 扩展 i18n 基础设施

**文件**:
- `src/composables/useLocale.ts` — 添加 3 个 SIDEBAR_KEY: `codex`, `piConfig`, `processManagement`
- `src/locales/zh.ts` — 添加 3 个中文翻译
- `src/locales/en.ts` — 添加 3 个英文翻译
- `src/config/sidebar.ts` — 在 `clientConfig` 组添加 Codex/Pi 条目，在 `deploy` 组添加进程管理条目

**新增 key**:
```
sidebar.codex         = "Codex 配置" / "Codex Setup"
sidebar.piConfig      = "Pi 配置"   / "Pi Setup"
sidebar.processMgmt   = "进程管理"   / "Process Management"
```

**预估**: 每文件改动 ~6 行

### Task 3: 新增 Codex 配置页

**新建文件**: `src/views/project/llm-simple-router/config/Codex.vue`
**路由**: `guide/config/codex`
**内容来源**: README 第 5 节 "配置 Codex"

内容要点:
- `~/.codex/config.toml` 完整模板
- `wire_api = "responses"` 说明（OpenAI Responses API 格式）
- `ROUTER_KEY` 环境变量设置
- 中英双语
- 复用 CodeBlock 组件

**预估**: ~80 行

### Task 4: 新增 Pi Coding Agent 配置页

**新建文件**: `src/views/project/llm-simple-router/config/Pi.vue`
**路由**: `guide/config/pi`
**内容来源**: README 第 6 节 "配置 Pi Coding Agent"

内容要点:
- `~/.pi/agent/models.json` 完整配置模板
- `api: "anthropic-messages"` 连接方式说明
- DeepSeek 模型 compat 配置 (`thinkingFormat: "deepseek"`, `thinkingLevelMap`)
- 模型参数说明（contextWindow, maxTokens, reasoning）
- 中英双语
- 复用 CodeBlock 组件

**预估**: ~100 行

### Task 5: 新增进程管理页

**新建文件**: `src/views/project/llm-simple-router/config/ProcessManagement.vue`
**路由**: `guide/config/process-management`
**内容来源**: README "进程管理" 章节

内容要点:
- PM2: 安装、启动、查看日志、开机自启、升级流程
- systemd: 服务文件模板 (`/etc/systemd/system/llm-simple-router.service`)、启用/启动/查看命令
- npx 手动启动: 注意事项（Ctrl+C 不会恢复）
- 三种方式的升级流程对比
- 中英双语
- 复用 CodeBlock 组件

**预估**: ~130 行

### Task 6: 充实 Docker.vue

**文件**: `src/views/project/llm-simple-router/config/Docker.vue`
**内容来源**: README "Docker 部署" 章节

补充内容:
- `docker run` 完整命令（端口映射、volume、环境变量、restart 策略、镜像地址）
- `ghcr.io/zhushanwen321/llm-simple-router:latest` 镜像说明
- 本地构建方式（注释 image、取消 build 注释）
- 数据目录说明

**预估**: 从 ~30 行扩展到 ~90 行

### Task 7: 补充 OtherFeatures.vue

**文件**: `src/views/project/llm-simple-router/features/OtherFeatures.vue`
**内容来源**: README "其他功能" 表格中用量大盘、升级通知、代理增强描述

补充内容:
- 用量大盘：按时间/模型/密钥维度，5 小时滑动窗口
- 升级通知：新版本自动提醒 + 一键升级
- DeepSeek reasoning_thinking 补丁说明
- proxy_enhance 截图引用

**预估**: +40 行

### Task 8: 补充 ClaudeCode.vue 调试信息

**文件**: `src/views/project/llm-simple-router/config/ClaudeCode.vue`

补充内容:
- `DEBUG=claude:*` 环境变量说明（Tips 部分）
- 当前已有 `--verbose --debug` 参数说明，只需补充 DEBUG 环境变量

**预估**: +4 行

### Task 9: 注册新路由到 router/index.ts

**文件**: `src/router/index.ts`

在 `llm-simple-router` children 中添加 3 个新路由:
- `guide/config/codex` → Codex.vue
- `guide/config/pi` → Pi.vue
- `guide/config/process-management` → ProcessManagement.vue

**预估**: +12 行

## 执行顺序

```
Task 1 (路由 bug) → 独立，优先
Task 2 (i18n 基础) → Task 3/4/5 的前置依赖
Task 3 (Codex 页)  ┐
Task 4 (Pi 页)     ├→ 依赖 Task 2，三者可并行
Task 5 (进程管理)   ┘
Task 6 (Docker)    → 独立
Task 7 (Other)     → 独立
Task 8 (ClaudeCode) → 独立
Task 9 (路由注册)   → 依赖 Task 3/4/5 的文件创建
```

建议执行批次:
- **批次 1**: Task 1 + Task 2 (基础设施)
- **批次 2**: Task 3 + Task 4 + Task 5 (新建页面，可并行 subagent)
- **批次 3**: Task 6 + Task 7 + Task 8 (内容补充，可并行 subagent)
- **批次 4**: Task 9 (路由注册) → 然后 build 验证

## 涉及文件清单

| 操作 | 文件 |
|------|------|
| 修改 | `src/router/index.ts` |
| 修改 | `src/composables/useLocale.ts` |
| 修改 | `src/locales/zh.ts` |
| 修改 | `src/locales/en.ts` |
| 修改 | `src/config/sidebar.ts` |
| 新建 | `src/views/project/llm-simple-router/config/Codex.vue` |
| 新建 | `src/views/project/llm-simple-router/config/Pi.vue` |
| 新建 | `src/views/project/llm-simple-router/config/ProcessManagement.vue` |
| 修改 | `src/views/project/llm-simple-router/config/Docker.vue` |
| 修改 | `src/views/project/llm-simple-router/features/OtherFeatures.vue` |
| 修改 | `src/views/project/llm-simple-router/config/ClaudeCode.vue` |

**总计**: 3 个新文件 + 8 个修改文件

## 验证标准

1. `npm run build` 无 TypeScript 编译错误
2. 所有 sidebar 链接可点击跳转
3. 新页面中英文切换正常
4. 已有页面内容无回归
5. 截图资源正确加载
