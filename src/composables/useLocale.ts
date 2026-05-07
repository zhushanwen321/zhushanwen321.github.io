import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

/** 可用的语言列表 */
export const availableLocales = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
] as const

export type LocaleCode = (typeof availableLocales)[number]['code']

/** 获取当前语言 */
export function useLocale() {
  const { locale, t } = useI18n()
  const current = computed(() => availableLocales.find((l) => l.code === locale.value)!)
  const other = computed(() => availableLocales.find((l) => l.code !== locale.value)!)

  function switchLocale() {
    locale.value = other.value.code
  }

  return { locale, current, other, switchLocale, t }
}

/** SideBar keys 常量 */
export const SIDEBAR_KEYS = {
  quickStart: 'sidebar.quickStart',
  overview: 'sidebar.overview',
  startRouter: 'sidebar.startRouter',
  features: 'sidebar.features',
  autoRetry: 'sidebar.autoRetry',
  providers: 'sidebar.providers',
  modelMapping: 'sidebar.modelMapping',
  concurrency: 'sidebar.concurrency',
  loopDetection: 'sidebar.loopDetection',
  proxy: 'sidebar.proxy',
  failover: 'sidebar.failover',
  monitor: 'sidebar.monitor',
  multiKey: 'sidebar.multiKey',
  openaiCompat: 'sidebar.openaiCompat',
  config: 'sidebar.config',
  claudeCode: 'sidebar.claudeCode',
  env: 'sidebar.env',
  docker: 'sidebar.docker',
  architecture: 'sidebar.architecture',
  systemContext: 'sidebar.systemContext',
  requestPipeline: 'sidebar.requestPipeline',
  logging: 'sidebar.logging',
  pipeline: 'sidebar.pipeline',
  metrics: 'sidebar.metrics',
  ttftTps: 'sidebar.ttftTps',
  tokens: 'sidebar.tokens',
} as const
