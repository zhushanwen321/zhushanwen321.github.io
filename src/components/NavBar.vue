<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t, locale } = useI18n()
const mobileOpen = ref(false)
const projectDropdownOpen = ref(false)

const projects = [
  { name: 'LLM Simple Router', path: '/project/llm-simple-router/' },
]

watch(locale, (val) => { localStorage.setItem('locale', val) })

function toggleMobile() { mobileOpen.value = !mobileOpen.value }
function isActive(path: string): boolean { return route.path.startsWith(path) }
function toggleLocale() { locale.value = locale.value === 'zh' ? 'en' : 'zh' }
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b border-white/10 bg-surface/80 backdrop-blur-md">
    <router-link to="/" class="flex h-14 w-64 shrink-0 items-center px-6 group">
      <svg width="134" height="30" viewBox="0 0 134 30" fill="none" class="transition-opacity group-hover:opacity-80">
        <text x="0"  y="24" font-family="monospace" font-size="20" font-weight="bold" fill="#60a5fa">Z</text>
        <text x="14" y="24" font-family="monospace" font-size="20" font-weight="bold" fill="#60a5fa" opacity="0.9">Z</text>
        <text x="28" y="22" font-family="monospace" font-size="15" fill="#60a5fa" opacity="0.65">z</text>
        <text x="39" y="20" font-family="monospace" font-size="12" fill="#60a5fa" opacity="0.45">z</text>
        <text x="49" y="20" font-family="monospace" font-size="11" fill="#3b82f6" opacity="0.38">s</text>
        <text x="59" y="20" font-family="monospace" font-size="13" fill="#3b82f6" opacity="0.42">w</text>
        <text x="73" y="20" font-family="monospace" font-size="11" fill="#3b82f6" opacity="0.38">s</text>
        <text x="83" y="20" font-family="monospace" font-size="12" fill="#60a5fa" opacity="0.45">z</text>
        <text x="94" y="22" font-family="monospace" font-size="15" fill="#60a5fa" opacity="0.65">z</text>
        <text x="105" y="24" font-family="monospace" font-size="20" font-weight="bold" fill="#60a5fa" opacity="0.9">Z</text>
        <text x="119" y="24" font-family="monospace" font-size="20" font-weight="bold" fill="#60a5fa">Z</text>
      </svg>
    </router-link>

    <div class="hidden flex-1 items-center justify-between pr-6 md:flex">
      <div class="flex items-center gap-1">
        <router-link to="/about" class="rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors">
          {{ t('nav.about') }}
        </router-link>

        <div class="relative" @mouseleave="projectDropdownOpen = false">
          <button
            class="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors"
            :class="isActive('/project') ? 'text-gray-200 bg-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'"
            @mouseenter="projectDropdownOpen = true"
          >
            {{ t('nav.projects') }}
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div v-show="projectDropdownOpen" class="absolute left-0 top-[calc(100%-4px)] z-10" @mouseenter="projectDropdownOpen = true">
            <div class="h-1 w-full" />
            <div class="w-56 rounded-lg border border-white/10 bg-surface-50 py-1 shadow-xl">
              <router-link v-for="p in projects" :key="p.path" :to="p.path" class="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors" @click="projectDropdownOpen = false">{{ p.name }}</router-link>
            </div>
          </div>
        </div>

        <router-link to="/social" class="rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors">
          {{ t('nav.social') }}
        </router-link>
      </div>

      <div class="flex items-center gap-2">
        <!-- Language switcher -->
        <button @click="toggleLocale" class="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors" title="Switch Language">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <span>{{ locale === 'zh' ? 'EN' : '中文' }}</span>
        </button>

        <a href="https://github.com/zhushanwen321" target="_blank" rel="noopener" class="text-gray-500 hover:text-gray-300 transition-colors" aria-label="GitHub">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://gitee.com/zzzzswszzzz" target="_blank" rel="noopener" class="text-gray-500 hover:text-gray-300 transition-colors" aria-label="Gitee">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.926c0 .327.266.592.593.592h5.926c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.149a.592.592 0 0 1-.592-.592v-1.482a.592.592 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H8.37a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h5.85z"/></svg>
        </a>
      </div>
    </div>

    <!-- Mobile hamburger -->
    <div class="flex flex-1 items-center justify-end gap-2 pr-4 md:hidden">
      <button @click="toggleLocale" class="text-xs text-gray-400 hover:text-gray-200 px-1.5 py-1">
        {{ locale === 'zh' ? 'EN' : '中文' }}
      </button>
      <button class="text-gray-400 hover:text-gray-200 transition-colors" @click="toggleMobile" aria-label="Toggle menu">
        <svg v-if="!mobileOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-show="mobileOpen" class="absolute left-0 right-0 top-14 border-t border-white/10 md:hidden bg-surface">
      <div class="space-y-1 px-4 py-3">
        <router-link to="/about" class="block rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/5" @click="mobileOpen = false">{{ t('nav.about') }}</router-link>
        <div class="pl-3">
          <p class="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">{{ t('nav.projects') }}</p>
          <router-link v-for="p in projects" :key="p.path" :to="p.path" class="block rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/5" @click="mobileOpen = false">{{ p.name }}</router-link>
        </div>
        <router-link to="/social" class="block rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/5" @click="mobileOpen = false">{{ t('nav.social') }}</router-link>
      </div>
    </div>
  </nav>
</template>
