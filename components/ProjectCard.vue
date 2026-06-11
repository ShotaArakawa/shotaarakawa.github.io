<template>
  <div class="card" :style="cardStyle">
    <div class="card-thumb">
      <div class="thumb-inner">
        <i :class="project.icon" />
        <span>{{ project.thumbLabel }}</span>
      </div>
      <div class="thumb-fade" />
    </div>
    <div class="card-body">
      <div class="card-head">
        <NuxtLink :to="`/projects/${project.slug}`" class="card-title">{{ project.title }}</NuxtLink>
        <div class="card-actions">
          <span v-if="project.wip" class="wip-badge">
            <i class="ti ti-tool" style="font-size: 10px" />
            coming soon
          </span>
          <template v-else>
            <a
              v-if="project.siteUrl"
              :href="project.siteUrl"
              target="_blank"
              rel="noopener"
              :aria-label="`${project.title}のサイトを開く`"
              title="サイトを開く"
            >
              <i class="ti ti-external-link" />
            </a>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener"
              :aria-label="`${project.title}のGitHubリポジトリ`"
              title="GitHub"
            >
              <i class="ti ti-brand-github" />
            </a>
          </template>
        </div>
      </div>
      <p class="card-desc">{{ project.description }}</p>
      <div class="card-tags">
        <span v-for="tag in project.tags" :key="tag" class="ctag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{ project: Project }>()

const colorMap = {
  cyan:  { bg: '#0d1a22', accent: '#22d3ee', dim: 'rgba(34,211,238,0.12)',  bd: 'rgba(34,211,238,0.22)'  },
  green: { bg: '#0f1a14', accent: '#4ade80', dim: 'rgba(74,222,128,0.10)',  bd: 'rgba(74,222,128,0.20)'  },
  amber: { bg: '#140f0a', accent: '#f59e0b', dim: 'rgba(245,158,11,0.10)', bd: 'rgba(245,158,11,0.20)' },
}

const c = computed(() => colorMap[props.project.color])
const thumbFadeBg = computed(() => c.value.bg)

const cardStyle = computed(() => ({
  '--card-accent': c.value.accent,
  '--card-dim':    c.value.dim,
  '--card-bd':     c.value.bd,
  background:      c.value.bg,
}))
</script>

<style scoped>
.card {
  border: 0.5px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.22s, transform 0.22s;
}

.card:hover {
  transform: translateY(-3px);
  border-color: var(--card-bd);
}

.card-thumb {
  width: 100%;
  height: 130px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.thumb-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: absolute;
  inset: 0;
}

.thumb-inner i {
  font-size: 32px;
  color: var(--card-accent);
  opacity: 0.65;
}

.thumb-inner span {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--card-accent);
  opacity: 0.55;
}

.thumb-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: linear-gradient(to top, v-bind(thumbFadeBg), transparent);
  pointer-events: none;
}

.card-body {
  padding: 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  transition: color 0.18s;
}

.card-title:hover {
  color: var(--card-accent);
}

.card-actions {
  display: flex;
  gap: 4px;
  align-items: center;
}

.card-actions a {
  font-size: 16px;
  color: var(--text-3);
  text-decoration: none;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.18s, background 0.18s;
}

.card-actions a:hover {
  color: var(--card-accent);
  background: var(--card-dim);
}

.card-desc {
  font-size: 12px;
  color: var(--text-2);
  line-height: 1.7;
  flex: 1;
}

.card-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 14px;
}

.ctag {
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.04);
  border: 0.5px solid var(--border);
  color: var(--text-3);
}

.wip-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 0.5px solid rgba(245, 158, 11, 0.2);
  padding: 2px 7px;
  border-radius: 20px;
}
</style>
