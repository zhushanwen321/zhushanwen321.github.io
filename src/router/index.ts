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
          path: 'guide/features/auto-retry',
          component: () => import('../views/project/llm-simple-router/features/AutoRetry.vue'),
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
          path: 'guide/features/concurrency',
          component: () => import('../views/project/llm-simple-router/features/Concurrency.vue'),
        },
        {
          path: 'guide/features/failover',
          component: () => import('../views/project/llm-simple-router/features/Failover.vue'),
        },
        {
          path: 'guide/features/monitor',
          component: () => import('../views/project/llm-simple-router/features/Monitor.vue'),
        },
        {
          path: 'guide/features/multi-key',
          component: () => import('../views/project/llm-simple-router/features/MultiKey.vue'),
        },
        {
          path: 'guide/config/claude-code',
          component: () => import('../views/project/llm-simple-router/config/ClaudeCode.vue'),
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
          path: 'guide/architecture/system-context',
          component: () => import('../views/project/llm-simple-router/architecture/SystemContext.vue'),
        },
        {
          path: 'guide/architecture/request-pipeline',
          component: () => import('../views/project/llm-simple-router/architecture/RequestPipeline.vue'),
        },
        {
          path: 'guide/logging/pipeline',
          component: () => import('../views/project/llm-simple-router/logging/Pipeline.vue'),
        },
        {
          path: 'guide/metrics/ttft-tps',
          component: () => import('../views/project/llm-simple-router/metrics/TtftTps.vue'),
        },
        {
          path: 'guide/metrics/tokens',
          component: () => import('../views/project/llm-simple-router/metrics/Tokens.vue'),
        },
      ],
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

export default router
