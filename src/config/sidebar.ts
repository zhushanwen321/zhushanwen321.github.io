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

export function getAllPages(sidebar: SidebarGroup[]): SidebarItem[] {
  return sidebar.flatMap((group) => group.items)
}

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
