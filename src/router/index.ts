import { createRouter, createWebHistory } from 'vue-router'
import DocLayout from '../layouts/DocLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/project/llm-simple-router/',
    },
    {
      path: '/social',
      component: () => import('../views/social/SocialPage.vue'),
    },
    {
      path: '/project/llm-simple-router',
      component: DocLayout,
      children: [
        {
          path: '',
          component: () => import('../views/project/llm-simple-router/Overview.vue'),
        },
        {
          path: 'guide/getting-started',
          component: () => import('../views/project/llm-simple-router/getting-started/Index.vue'),
        },
        {
          path: 'guide/features/providers',
          component: () => import('../views/project/llm-simple-router/features/Providers.vue'),
        },
        {
          path: 'guide/features/model-mapping',
          component: () => import('../views/project/llm-simple-router/features/ModelMapping.vue'),
        },
        {
          path: 'guide/features/auto-retry',
          component: () => import('../views/project/llm-simple-router/features/AutoRetry.vue'),
        },
        {
          path: 'guide/features/concurrency',
          component: () => import('../views/project/llm-simple-router/features/Concurrency.vue'),
        },
        {
          path: 'guide/features/multi-key',
          component: () => import('../views/project/llm-simple-router/features/MultiKey.vue'),
        },
        {
          path: 'guide/features/monitor',
          component: () => import('../views/project/llm-simple-router/features/Monitor.vue'),
        },
        {
          path: 'guide/features/other',
          component: () => import('../views/project/llm-simple-router/features/OtherFeatures.vue'),
        },
        {
          path: 'guide/config/claude-code',
          component: () => import('../views/project/llm-simple-router/config/ClaudeCode.vue'),
        },
        {
          path: 'guide/config/codex',
          component: () => import('../views/project/llm-simple-router/config/Codex.vue'),
        },
        {
          path: 'guide/config/pi',
          component: () => import('../views/project/llm-simple-router/config/Pi.vue'),
        },
        {
          path: 'guide/config/process-management',
          component: () => import('../views/project/llm-simple-router/config/ProcessManagement.vue'),
        },
        {
          path: 'guide/config/env',
          component: () => import('../views/project/llm-simple-router/config/Env.vue'),
        },
        {
          path: 'guide/config/docker',
          component: () => import('../views/project/llm-simple-router/config/Docker.vue'),
        },
        {
          path: 'guide/architecture/overview',
          component: () => import('../views/project/llm-simple-router/architecture/Architecture.vue'),
        },
        {
          path: 'guide/logging/pipeline',
          component: () => import('../views/project/llm-simple-router/logging/Pipeline.vue'),
        },
        {
          path: 'guide/faq',
          component: () => import('../views/project/llm-simple-router/FAQ.vue'),
        },
      ],
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

export default router
