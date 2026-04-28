<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import DocFooter from '../components/DocFooter.vue'
</script>

<template>
  <div class="pt-14">
    <SideBar />
    <main class="ml-64 min-h-[calc(100vh-3.5rem)]">
      <div class="mx-auto max-w-4xl px-8 py-10">
        <router-view />
        <DocFooter />
      </div>
    </main>
  </div>
</template>
