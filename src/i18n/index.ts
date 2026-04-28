import { createI18n } from 'vue-i18n'
import zh from '../locales/zh'
import en from '../locales/en'

const saved = localStorage.getItem('locale')
const locale = saved === 'en' ? 'en' : 'zh'

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'zh',
  messages: { zh, en },
})

export default i18n
