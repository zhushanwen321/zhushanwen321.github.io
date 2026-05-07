import { SIDEBAR_KEYS as K } from '../composables/useLocale'

export interface SidebarItem {
  titleKey: string
  path: string
}

export interface SidebarGroup {
  titleKey: string
  items: SidebarItem[]
}

export const llmSimpleRouterSidebar: SidebarGroup[] = [
  { titleKey: K.quickStart, items: [
    { titleKey: K.overview, path: '/project/llm-simple-router/' },
    { titleKey: K.startRouter, path: '/project/llm-simple-router/guide/getting-started' },
  ]},
  { titleKey: K.features, items: [
    { titleKey: K.autoRetry, path: '/project/llm-simple-router/guide/features/auto-retry' },
    { titleKey: K.providers, path: '/project/llm-simple-router/guide/features/providers' },
    { titleKey: K.modelMapping, path: '/project/llm-simple-router/guide/features/model-mapping' },
    { titleKey: K.concurrency, path: '/project/llm-simple-router/guide/features/concurrency' },
    { titleKey: K.loopDetection, path: '/project/llm-simple-router/guide/features/loop-detection' },
    { titleKey: K.proxy, path: '/project/llm-simple-router/guide/features/proxy' },
    { titleKey: K.failover, path: '/project/llm-simple-router/guide/features/failover' },
    { titleKey: K.openaiCompat, path: '/project/llm-simple-router/guide/features/openai-compat' },
    { titleKey: K.monitor, path: '/project/llm-simple-router/guide/features/monitor' },
    { titleKey: K.multiKey, path: '/project/llm-simple-router/guide/features/multi-key' },
  ]},
  { titleKey: K.config, items: [
    { titleKey: K.claudeCode, path: '/project/llm-simple-router/guide/config/claude-code' },
    { titleKey: K.env, path: '/project/llm-simple-router/guide/config/env' },
    { titleKey: K.docker, path: '/project/llm-simple-router/guide/config/docker' },
  ]},
  { titleKey: K.architecture, items: [
    { titleKey: K.systemContext, path: '/project/llm-simple-router/guide/architecture/system-context' },
    { titleKey: K.requestPipeline, path: '/project/llm-simple-router/guide/architecture/request-pipeline' },
  ]},
  { titleKey: K.logging, items: [
    { titleKey: K.pipeline, path: '/project/llm-simple-router/guide/logging/pipeline' },
  ]},
  { titleKey: K.metrics, items: [
    { titleKey: K.ttftTps, path: '/project/llm-simple-router/guide/metrics/ttft-tps' },
    { titleKey: K.tokens, path: '/project/llm-simple-router/guide/metrics/tokens' },
  ]},
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
