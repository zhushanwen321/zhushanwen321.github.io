<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CodeBlock from '../../../../components/CodeBlock.vue'

const { locale } = useI18n()
const isZh = computed(() => locale.value === 'zh')

const quickStartCmd = 'docker compose up -d'

const dockerRunCmd = `docker run -d \\
  --name llm-router \\
  -p 9981:9981 \\
  -v ~/.llm-simple-router:/app/data \\
  -e DB_PATH=/app/data/router.db \\
  -e TZ=Asia/Shanghai \\
  --restart unless-stopped \\
  ghcr.io/zhushanwen321/llm-simple-router:latest`

const localBuildCmd = 'docker compose up -d --build'
</script>

<template>
  <div class="prose prose-invert max-w-none">
    <template v-if="isZh">
      <h1>Docker 部署</h1>

      <h2>快速启动</h2>
      <CodeBlock :code="quickStartCmd" language="bash" />
      <p>环境变量通过 Setup 页面设置，不需要 <code>.env</code> 文件。</p>

      <h2>数据持久化</h2>
      <p>
        Docker 部署时，数据存储在容器内的 <code>/root/.llm-simple-router/</code>
        目录。通过 Docker volume 挂载确保数据持久化，容器重启后数据不丢失。
      </p>

      <h2>直接拉取镜像（推荐）</h2>
      <p>
        使用 <code>docker compose</code> 是最简单的方式，如上所述执行
        <code>docker compose up -d</code> 即可。也可以直接使用 <code>docker run</code> 命令：
      </p>
      <CodeBlock :code="dockerRunCmd" language="bash" />
      <p>
        数据目录映射到宿主机的 <code>~/.llm-simple-router/</code>，其他环境变量（如 API Key、模型配置等）启动后通过
        Setup 页面设置。
      </p>

      <h2>本地构建</h2>
      <p>
        如果需要自行构建镜像，编辑 <code>docker-compose.yml</code>，注释掉 <code>image</code> 行，取消
        <code>build</code> 部分的注释，然后执行：
      </p>
      <CodeBlock :code="localBuildCmd" language="bash" />
    </template>

    <template v-else>
      <h1>Docker Deployment</h1>

      <h2>Quick Start</h2>
      <CodeBlock :code="quickStartCmd" language="bash" />
      <p>Environment vars are set via the Setup page, no <code>.env</code> file needed.</p>

      <h2>Data Persistence</h2>
      <p>
        In Docker, data is stored at <code>/root/.llm-simple-router/</code> inside the container. Use
        Docker volume mounts for data persistence so data is not lost on container restart.
      </p>

      <h2>Pull Image Directly (Recommended)</h2>
      <p>
        Using <code>docker compose</code> is the simplest approach — just run
        <code>docker compose up -d</code> as shown above. You can also use <code>docker run</code> directly:
      </p>
      <CodeBlock :code="dockerRunCmd" language="bash" />
      <p>
        The data directory is mapped to <code>~/.llm-simple-router/</code> on the host. Other environment
        variables (API keys, model configs, etc.) can be configured via the Setup page after startup.
      </p>

      <h2>Local Build</h2>
      <p>
        To build the image yourself, edit <code>docker-compose.yml</code>: comment out the
        <code>image</code> line and uncomment the <code>build</code> section, then run:
      </p>
      <CodeBlock :code="localBuildCmd" language="bash" />
    </template>
  </div>
</template>
