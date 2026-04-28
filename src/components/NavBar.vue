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
      <!-- Logo: ZZzzswszzZZ -->
      <router-link to="/" class="flex items-center gap-1 group">
        <svg width="100" height="28" viewBox="0 0 100 28" fill="none" class="transition-opacity group-hover:opacity-80">
          <text x="0" y="18" font-family="monospace" font-size="18" font-weight="bold" fill="#60a5fa">Z</text>
          <text x="18" y="15" font-family="monospace" font-size="11" fill="#60a5fa" opacity="0.7">z</text>
          <text x="28" y="12" font-family="monospace" font-size="8" fill="#60a5fa" opacity="0.4">z</text>
          <text x="36" y="16" font-family="monospace" font-size="9" fill="#666">sws</text>
          <text x="60" y="12" font-family="monospace" font-size="8" fill="#60a5fa" opacity="0.4">z</text>
          <text x="68" y="15" font-family="monospace" font-size="11" fill="#60a5fa" opacity="0.7">z</text>
          <text x="78" y="18" font-family="monospace" font-size="18" font-weight="bold" fill="#60a5fa">Z</text>
          <circle cx="94" cy="8" r="1.5" fill="#60a5fa" opacity="0.25"/>
        </svg>
      </router-link>

      <!-- Desktop Nav -->
      <div class="hidden items-center gap-1 md:flex">
        <router-link
          to="/about"
          class="rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors"
        >
          个人介绍
        </router-link>

        <!-- 项目介绍 dropdown: no gap between button and menu -->
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
          <!-- 透明桥接层消除空隙 -->
          <div
            v-show="projectDropdownOpen"
            class="absolute left-0 top-[calc(100%-4px)] z-10"
            @mouseenter="projectDropdownOpen = true"
          >
            <!-- 透明搭桥（覆盖按钮底部到菜单顶部的空隙） -->
            <div class="h-1 w-full" />
            <div class="w-56 rounded-lg border border-white/10 bg-surface-50 py-1 shadow-xl">
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
        </div>

        <router-link
          to="/social"
          class="rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors"
        >
          社交平台
        </router-link>
      </div>

      <!-- Right icons -->
      <div class="flex items-center gap-3">
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
        <a
          href="https://gitee.com/zzzzswszzzz"
          target="_blank"
          rel="noopener"
          class="text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Gitee"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.926c0 .327.266.592.593.592h5.926c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.149a.592.592 0 0 1-.592-.592v-1.482a.592.592 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H8.37a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h5.85z"/>
          </svg>
        </a>

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
