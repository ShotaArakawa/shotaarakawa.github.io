<template>
  <nav class="nav">
    <a class="nav-logo" href="#">SA.dev</a>
    <div class="nav-links">
      <a href="#about">about</a>
      <a href="#projects">projects</a>
      <a href="https://github.com/ShotaArakawa" target="_blank" rel="noopener">GitHub</a>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(24px, 5vw, 64px);
  height: 56px;
  background: rgba(11, 15, 18, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 0.5px solid var(--border);
}

.nav-logo {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  color: var(--cyan);
  letter-spacing: 0.06em;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-links a {
  font-size: 13px;
  color: var(--text-2);
  text-decoration: none;
  transition: color 0.18s;
}

.nav-links a:hover {
  color: var(--text);
}

@media (max-width: 600px) {
  .nav-links {
    gap: 18px;
  }
}
</style>
