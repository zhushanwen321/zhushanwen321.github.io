<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')

const qrSize = 180

const items = [
  {
    name: 'QQ',
    label: '541815155',
    qr: `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=https%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Fk%3D541815155%26jump_from%3Dwebapi`,
    link: 'https://qm.qq.com/cgi-bin/qm/qr?k=541815155&jump_from=webapi',
    color: '#00B4FF',
  },
  {
    name: '飞书',
    label: '添加飞书联系人',
    qr: `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=https%3A%2F%2Fwww.feishu.cn%2Finvitation%2Fpage%2Fadd_contact%2F%3Ftoken%3D7ccp43ba-47a2-4337-b9d6-b706d713cc42%26unique_id%3Dnjim8puWP3aFvs9haj9E2Q%3D%3D`,
    link: 'https://www.feishu.cn/invitation/page/add_contact/?token=7ccp43ba-47a2-4337-b9d6-b706d713cc42&unique_id=njim8puWP3aFvs9haj9E2Q==',
    color: '#3370FF',
  },
  {
    name: '飞书交流群',
    label: '扫码加入交流群',
    qr: '/images/飞书交流群.png',
    link: '/images/飞书交流群.png',
    color: '#3370FF',
  },
  {
    name: '哔哩哔哩',
    label: 'B站空间',
    qr: `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=https%3A%2F%2Fspace.bilibili.com%2F9377044`,
    link: 'https://space.bilibili.com/9377044',
    color: '#FB7299',
  },
]
</script>

<template>
  <div class="pt-14 min-h-screen">
    <div class="mx-auto max-w-4xl px-8 py-12">
      <!-- Header -->
      <div class="mb-10">
        <template v-if="isZh">
          <h1 class="text-2xl font-bold text-gray-100">社交平台</h1>
          <p class="mt-2 text-gray-500">扫码或点击图标联系我</p>
        </template>
        <template v-else>
          <h1 class="text-2xl font-bold text-gray-100">Social Platforms</h1>
          <p class="mt-2 text-gray-500">Scan QR code or tap to connect</p>
        </template>
      </div>

      <!-- QR cards (same for both languages) -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="item in items"
          :key="item.name"
          :href="item.link"
          target="_blank"
          rel="noopener"
          class="group flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-surface-50 p-8 transition-all hover:border-white/20 hover:bg-surface-100"
        >
          <div class="overflow-hidden rounded-lg border border-white/10">
            <img
              :src="item.qr"
              :alt="item.name"
              :style="{ width: qrSize + 'px', height: qrSize + 'px' }"
              class="block"
            />
          </div>
          <span class="text-lg font-semibold" :style="{ color: item.color }">{{ item.name }}</span>
          <span class="text-sm text-gray-500">{{ item.label }}</span>
        </a>
      </div>

      <!-- GitHub / Gitee quick links (same for both languages) -->
      <div class="mt-12 border-t border-white/10 pt-8">
        <template v-if="isZh">
          <h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">代码仓库</h2>
        </template>
        <template v-else>
          <h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Code Repositories</h2>
        </template>
        <div class="flex gap-4">
          <a
            href="https://github.com/zhushanwen321"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-400 transition-colors hover:border-white/20 hover:text-gray-200"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href="https://gitee.com/zzzzswszzzz"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-400 transition-colors hover:border-white/20 hover:text-gray-200"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.926c0 .327.266.592.593.592h5.926c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.149a.592.592 0 0 1-.592-.592v-1.482a.592.592 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H8.37a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h5.85z"/></svg>
            Gitee
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
