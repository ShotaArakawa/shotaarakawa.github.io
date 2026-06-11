<template>
  <section id="about" class="hero-section">
    <div class="container">
      <div class="hero-inner">
        <div class="badge">
          <span class="badge-dot" />
          open to work
        </div>
        <p class="hero-role">// Fullstack Engineer</p>
        <div class="name-row">
          <div class="avatar-wrap">
            <img src="/profile.jpg" alt="荒川 奨太">
          </div>
          <h1 class="hero-name">荒川 奨太</h1>
        </div>
        <p class="hero-bio">
          フルスタックエンジニア。Javaを軸に、Androidアプリケーション開発から、Web開発まで幅広い技術スタックを持っています。チーム開発・個人開発どちらも経験あり。
        </p>
        <div class="skill-row">
          <span v-for="skill in skills" :key="skill" class="stag">{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skills = [
  'Java', 'Kotlin', 'Android', 'Spring Boot',
  'PHP', 'Laravel',
  'JavaScript', 'TypeScript', 'Vue.js', 'jQuery',
  'HTML', 'CSS', 'SCSS',
  'C++', 'JUCE',
  'MySQL', 'PostgreSQL',
  'Docker', 'Git',
]
</script>

<style scoped>
.hero-section {
  padding: 72px 0 56px;
  border-bottom: 0.5px solid var(--border);
}

.hero-inner {
  display: flex;
  flex-direction: column;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  background: var(--cyan-dim);
  color: var(--cyan);
  border: 0.5px solid var(--cyan-bd);
  padding: 3px 11px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--cyan);
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

.hero-role {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--cyan);
  margin-bottom: 10px;
  letter-spacing: 0.04em;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.avatar-wrap {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1.5px solid var(--cyan-bd);
  overflow: hidden;
  background: #13202a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-name {
  font-size: clamp(22px, 4vw, 30px);
  font-weight: 500;
  color: #f0f4f8;
  letter-spacing: -0.01em;
  margin: 0;
}

.hero-bio {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.8;
  max-width: 480px;
  margin-bottom: 20px;
}

.skill-row {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}

.stag {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  border: 0.5px solid var(--border-2);
  color: var(--text-3);
  transition: color 0.18s, border-color 0.18s;
  cursor: default;
}

.stag:hover {
  color: var(--text-2);
  border-color: rgba(255, 255, 255, 0.22);
}
</style>
