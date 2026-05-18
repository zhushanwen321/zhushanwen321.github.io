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
  { titleKey: K.usageGuide, items: [
    { titleKey: K.providers, path: '/project/llm-simple-router/guide/features/providers' },
    { titleKey: K.modelMapping, path: '/project/llm-simple-router/guide/features/model-mapping' },
    { titleKey: K.autoRetry, path: '/project/llm-simple-router/guide/features/auto-retry' },
    { titleKey: K.concurrency, path: '/project/llm-simple-router/guide/features/concurrency' },
    { titleKey: K.multiKey, path: '/project/llm-simple-router/guide/features/multi-key' },
    { titleKey: K.monitor, path: '/project/llm-simple-router/guide/features/monitor' },
    { titleKey: K.otherFeatures, path: '/project/llm-simple-router/guide/features/other' },
  ]},
  { titleKey: K.clientConfig, items: [
    { titleKey: K.claudeCode, path: '/project/llm-simple-router/guide/config/claude-code' },
    { titleKey: K.codex, path: '/project/llm-simple-router/guide/config/codex' },
    { titleKey: K.piConfig, path: '/project/llm-simple-router/guide/config/pi' },
  ]},
  { titleKey: K.deploy, items: [
    { titleKey: K.env, path: '/project/llm-simple-router/guide/config/env' },
    { titleKey: K.docker, path: '/project/llm-simple-router/guide/config/docker' },
    { titleKey: K.processMgmt, path: '/project/llm-simple-router/guide/config/process-management' },
  ]},
  { titleKey: K.architecture, items: [
    { titleKey: K.archOverview, path: '/project/llm-simple-router/guide/architecture/overview' },
  ]},
  { titleKey: K.loggingMetrics, items: [
    { titleKey: K.logPipeline, path: '/project/llm-simple-router/guide/logging/pipeline' },
  ]},
  { titleKey: K.faq, items: [
    { titleKey: K.faqPage, path: '/project/llm-simple-router/guide/faq' },
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
