# 部署实施计划

> 本文档是 [plan.md](plan.md) 的子计划，包含 Task 11：截图资源复制 + GitHub Actions 自动部署。

---

## Task 11: Assets + GitHub Actions Deployment

**Files:**
- Create: `public/images/llm-simple-router/` (8 张截图)
- Modify: `.github/workflows/deploy.yml`
- Modify: `vite.config.ts`

- [ ] **Step 1: 创建目录并复制截图**

```bash
mkdir -p public/images/llm-simple-router
cp ~/Code/llm-simple-router-workspace/main/docs/screenshot/dashboard.png public/images/llm-simple-router/
cp ~/Code/llm-simple-router-workspace/main/docs/screenshot/log.png public/images/llm-simple-router/
cp ~/Code/llm-simple-router-workspace/main/docs/screenshot/model_mapping.png public/images/llm-simple-router/
cp ~/Code/llm-simple-router-workspace/main/docs/screenshot/monitor.png public/images/llm-simple-router/
cp ~/Code/llm-simple-router-workspace/main/docs/screenshot/provider_concurrency.png public/images/llm-simple-router/
cp ~/Code/llm-simple-router-workspace/main/docs/screenshot/provider.png public/images/llm-simple-router/
cp ~/Code/llm-simple-router-workspace/main/docs/screenshot/proxy_enhance.png public/images/llm-simple-router/
cp ~/Code/llm-simple-router-workspace/main/docs/screenshot/retry.png public/images/llm-simple-router/
```

- [ ] **Step 2: 验证截图文件**

```bash
ls -la public/images/llm-simple-router/
```

Expected: 8 个 PNG 文件

- [ ] **Step 3: 更新 vite.config.ts，添加 404.html 复制**

将 build 后的 index.html 复制为 404.html，确保 GitHub Pages 的 SPA 路由正常工作：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cpSync } from 'node:fs'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    // build 完成后复制 index.html 为 404.html
    closeBundle() {
      cpSync('dist/index.html', 'dist/404.html')
    },
  },
})
```

- [ ] **Step 4: 替换 .github/workflows/deploy.yml**

删除旧的 Jekyll workflow，创建新的 Vite 部署 workflow：

```bash
rm -f .github/workflows/*.yml
```

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 5: 本地构建验证**

```bash
npm run build
```

Expected: 构建成功，`dist/` 目录包含 index.html、404.html、assets/、images/

```bash
ls dist/
```

Expected 输出包含: `404.html  index.html  assets/  images/`

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add screenshot assets and GitHub Actions deployment workflow"
```

- [ ] **Step 7: 推送并验证部署**

```bash
git push origin main
```

Expected: GitHub Actions 触发部署，几分钟后 https://zhushanwen321.github.io 可访问

验证清单：
1. 首页自动跳转到 /project/llm-simple-router/
2. 侧边栏导航正常
3. 截图图片正常加载
4. 页面切换流畅
5. 直接访问子路由 URL（如 /project/llm-simple-router/guide/features/auto-retry）不会 404
