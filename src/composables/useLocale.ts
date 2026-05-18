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
  usageGuide: 'sidebar.usageGuide',
  providers: 'sidebar.providers',
  modelMapping: 'sidebar.modelMapping',
  autoRetry: 'sidebar.autoRetry',
  concurrency: 'sidebar.concurrency',
  multiKey: 'sidebar.multiKey',
  monitor: 'sidebar.monitor',
  otherFeatures: 'sidebar.otherFeatures',
  clientConfig: 'sidebar.clientConfig',
  claudeCode: 'sidebar.claudeCode',
  deploy: 'sidebar.deploy',
  env: 'sidebar.env',
  docker: 'sidebar.docker',
  architecture: 'sidebar.architecture',
  archOverview: 'sidebar.archOverview',
  loggingMetrics: 'sidebar.loggingMetrics',
  logPipeline: 'sidebar.logPipeline',
  faq: 'sidebar.faq',
  faqPage: 'sidebar.faqPage',
  codex: 'sidebar.codex',
  piConfig: 'sidebar.piConfig',
  processMgmt: 'sidebar.processMgmt',
} as const
