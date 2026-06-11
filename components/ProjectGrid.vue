<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <div class="sec-header">
        <span class="sec-label">projects</span>
        <div class="sec-line" />
      </div>
      <div class="grid">
        <ProjectCard
          v-for="project in projects"
          :key="project.slug"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '~/types'
import projectsData from '~/data/projects.json'

const projects = projectsData as Project[]
</script>

<style scoped>
.projects-section {
  padding: 56px 0;
}

.sec-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
</style>
