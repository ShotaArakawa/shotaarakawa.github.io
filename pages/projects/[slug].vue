<template>
  <div>
    <AppNav />
    <main>
      <article :style="pageStyle">

        <!-- Back + WIP -->
        <div class="container">
          <div class="meta-row">
            <NuxtLink to="/" class="back-link">
              <i class="ti ti-arrow-left" />
              ポートフォリオに戻る
            </NuxtLink>
            <span v-if="project.wip" class="wip-badge">
              <i class="ti ti-tool" style="font-size: 10px" />
              coming soon
            </span>
          </div>
        </div>

        <!-- Thumbnail -->
        <div class="thumb">
          <div class="thumb-inner">
            <i :class="project.icon" />
            <span>{{ project.thumbLabel }}</span>
          </div>
          <div class="thumb-fade" />
        </div>

        <!-- Body -->
        <div class="container">
          <div class="body">

            <!-- Title + action buttons -->
            <div class="head">
              <h1 class="title">{{ project.title }}</h1>
              <div class="actions">
                <a
                  v-if="project.siteUrl"
                  :href="project.siteUrl"
                  target="_blank"
                  rel="noopener"
                  class="btn"
                >
                  <i class="ti ti-external-link" />
                  サイトを開く
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener"
                  class="btn btn--ghost"
                >
                  <i class="ti ti-brand-github" />
                  GitHub
                </a>
              </div>
            </div>

            <!-- Description -->
            <p class="desc">{{ project.description }}</p>

            <!-- Tech stack -->
            <div class="sec-header">
              <span class="sec-label">tech stack</span>
              <div class="sec-line" />
            </div>
            <div class="tag-row">
              <span v-for="tag in project.tags" :key="tag" class="ctag">{{ tag }}</span>
            </div>

            <!-- README -->
            <template v-if="readmeHtml">
              <div class="sec-header" style="margin-top: 40px">
                <span class="sec-label">readme</span>
                <div class="sec-line" />
              </div>
              <div class="readme prose" v-html="readmeHtml" />
            </template>

          </div>
        </div>

      </article>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import type { Project } from '~/types'
import projectsData from '~/data/projects.json'

const route = useRoute()
const project = (projectsData as Project[]).find(p => p.slug === route.params.slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useHead({
  title: `${project.title} | Shota Arakawa`,
  meta: [{ name: 'description', content: project.description }],
})

const colorMap = {
  cyan:  { bg: '#0d1a22', accent: '#22d3ee', dim: 'rgba(34,211,238,0.12)', bd: 'rgba(34,211,238,0.22)' },
  green: { bg: '#0f1a14', accent: '#4ade80', dim: 'rgba(74,222,128,0.10)', bd: 'rgba(74,222,128,0.20)' },
  amber: { bg: '#140f0a', accent: '#f59e0b', dim: 'rgba(245,158,11,0.10)', bd: 'rgba(245,158,11,0.20)' },
}

const c = colorMap[project.color]

// v-bind targets for scoped CSS
const accentColor  = c.accent
const accentDim    = c.dim
const accentBd     = c.bd
const thumbFadeBg  = c.bg

const pageStyle = { '--card-accent': c.accent, '--card-dim': c.dim, '--card-bd': c.bd }

const repoPath = project.githubUrl
  ? project.githubUrl.match(/github\.com\/(.+?)(?:\.git)?\/?$/)?.[1] ?? null
  : null

const { data: readmeHtml } = await useAsyncData(`readme-${project.slug}`, async () => {
  if (!repoPath) return null
  try {
    const res = await $fetch<{ content: string }>(
      `https://api.github.com/repos/${repoPath}/readme`,
      { headers: { Accept: 'application/vnd.github+json' } }
    )
    const base64 = res.content.replace(/\n/g, '')
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
    const decoded = new TextDecoder('utf-8').decode(bytes)
    return marked.parse(decoded) as string
  } catch {
    return null
  }
})
</script>

<style scoped>
/* ── Layout ── */
article {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 0 20px;
}

/* ── Back link ── */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-2);
  text-decoration: none;
  transition: color 0.18s;
}

.back-link i {
  font-size: 14px;
}

.back-link:hover {
  color: var(--card-accent);
}

/* ── WIP badge ── */
.wip-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 0.5px solid rgba(245, 158, 11, 0.2);
  padding: 3px 9px;
  border-radius: 20px;
}

/* ── Thumbnail ── */
.thumb {
  width: 100%;
  height: 240px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-top: 0.5px solid var(--border);
  border-bottom: 0.5px solid var(--border);
}

.thumb-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: absolute;
  inset: 0;
}

.thumb-inner i {
  font-size: 56px;
  color: v-bind(accentColor);
  opacity: 0.6;
}

.thumb-inner span {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: v-bind(accentColor);
  opacity: 0.45;
}

.thumb-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to top, v-bind(thumbFadeBg), transparent);
  pointer-events: none;
}

/* ── Body ── */
.body {
  padding: 36px 0 64px;
  max-width: 620px;
}

/* ── Head: title + buttons ── */
.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.title {
  font-size: clamp(22px, 4vw, 28px);
  font-weight: 500;
  color: #f0f4f8;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
}

/* ── Buttons ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  padding: 7px 14px;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.18s, border-color 0.18s, color 0.18s;
  background: v-bind(accentDim);
  color: v-bind(accentColor);
  border: 0.5px solid v-bind(accentBd);
}

.btn:hover {
  background: v-bind(accentBd);
}

.btn--ghost {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-2);
  border-color: var(--border-2);
}

.btn--ghost:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
  border-color: rgba(255, 255, 255, 0.22);
}

/* ── Description ── */
.desc {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.85;
  margin-bottom: 36px;
}

/* ── Section header ── */
.sec-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.sec-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: rgba(34, 211, 238, 0.6);
  white-space: nowrap;
}

.sec-line {
  flex: 1;
  height: 0.5px;
  background: var(--border);
}

/* ── Tags ── */
.tag-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.ctag {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  border: 0.5px solid var(--border-2);
  color: var(--text-3);
  transition: color 0.18s, border-color 0.18s;
}

.ctag:hover {
  color: var(--text-2);
  border-color: rgba(255, 255, 255, 0.22);
}

/* ── README prose ── */
.readme {
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-2);
}

.readme :deep(h1),
.readme :deep(h2),
.readme :deep(h3),
.readme :deep(h4) {
  color: #e2e8f0;
  font-weight: 500;
  margin: 1.4em 0 0.5em;
  line-height: 1.4;
}

.readme :deep(h1) { font-size: 18px; }
.readme :deep(h2) { font-size: 15px; }
.readme :deep(h3) { font-size: 13px; }

.readme :deep(p) {
  margin: 0.75em 0;
}

.readme :deep(a) {
  color: v-bind(accentColor);
  text-decoration: none;
}

.readme :deep(a:hover) {
  text-decoration: underline;
}

.readme :deep(code) {
  font-family: var(--font-mono);
  font-size: 11px;
  background: rgba(255, 255, 255, 0.06);
  border: 0.5px solid var(--border-2);
  padding: 1px 5px;
  border-radius: 3px;
}

.readme :deep(pre) {
  background: rgba(0, 0, 0, 0.3);
  border: 0.5px solid var(--border);
  border-radius: 6px;
  padding: 14px 16px;
  overflow-x: auto;
  margin: 1em 0;
}

.readme :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
}

.readme :deep(ul),
.readme :deep(ol) {
  padding-left: 1.4em;
  margin: 0.6em 0;
}

.readme :deep(li) {
  margin: 0.3em 0;
}

.readme :deep(blockquote) {
  border-left: 2px solid v-bind(accentBd);
  padding-left: 12px;
  margin: 1em 0;
  color: var(--text-3);
}

.readme :deep(img) {
  max-width: 100%;
  border-radius: 4px;
}

.readme :deep(hr) {
  border: none;
  border-top: 0.5px solid var(--border);
  margin: 1.5em 0;
}

.readme :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.readme :deep(th),
.readme :deep(td) {
  border: 0.5px solid var(--border);
  padding: 6px 10px;
  text-align: left;
}

.readme :deep(th) {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
}
</style>
