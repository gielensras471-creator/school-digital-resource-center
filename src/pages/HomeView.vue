<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="container page-stack">
    <section class="home-hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">WELCOME TO LEARN · 校园学习资源</p>
        <h1 id="hero-title">让每一次练习，<br />都有清晰的示范。</h1>
        <p class="hero-description">汇集学校教学所需的数字学习资源。从书法笔画到每一周课程，让学习有迹可循。</p>
        <RouterLink to="/calligraphy" class="button button-primary">进入书法教学 <span aria-hidden="true">↗</span></RouterLink>
      </div>
      <div class="hero-illustration" aria-hidden="true">
        <div class="paper-back"></div><div class="paper-front"><span>硬笔书法</span><strong>永</strong><small>一笔一画 · 规范书写</small></div>
        <div class="floating-note">✦ 书写示范</div>
      </div>
    </section>
    <section aria-labelledby="resource-title" class="resource-section">
      <div class="section-heading"><div><p class="eyebrow">OUR RESOURCES</p><h2 id="resource-title">教学资源</h2></div><span class="section-side-note">从基础开始，循序渐进</span></div>
      <div class="resource-grid">
        <RouterLink to="/calligraphy" class="resource-card resource-card-active">
          <span class="resource-icon" aria-hidden="true">书</span><div class="resource-copy"><h3>书法教学</h3><p>一年级至五年级下册 · 65 个教学周</p><span class="text-action">查看课程 <span aria-hidden="true">→</span></span></div>
          <span class="card-arrow" aria-hidden="true">↗</span>
        </RouterLink>
        <div class="resource-card resource-card-planned">
          <span class="planned-icon" aria-hidden="true">✧</span><div class="resource-copy"><h3>更多教学资源</h3><p>朗读音频、科学实验等模块按需逐步扩展。</p><span class="planned-label">后续规划 · 暂未开放</span></div>
        </div>
      </div>
    </section>
  </div>
</template>
