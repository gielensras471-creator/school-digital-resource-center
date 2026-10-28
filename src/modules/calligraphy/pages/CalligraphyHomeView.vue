<script setup lang="ts">
import BreadcrumbNav from '../../../components/BreadcrumbNav.vue'
import { grades } from '../data/catalog'
</script>

<template>
  <div class="container page-stack">
    <BreadcrumbNav :items="[{ label: '资源总站', to: '/' }, { label: '书法教学' }]" />
    <div class="page-heading"><div><p class="eyebrow">CALLIGRAPHY</p><h1>书法教学</h1><p class="page-intro">按年级、周次查找规范书写示范。选择年级，开始本周的练习。</p></div><div class="heading-pill">5 个年级 · 65 周</div></div>
    <div class="section-heading"><h2>选择年级</h2><span class="section-side-note">已收录下册课程</span></div>
    <div class="grade-grid">
      <RouterLink v-for="grade in grades" :key="grade" :to="`/calligraphy/grade/${grade}`" class="grade-card">
        <span class="grade-number">{{ grade }}</span><h3>{{ ['一','二','三','四','五'][grade-1] }}年级下册</h3><p>第 2–14 周 · {{ grade <= 2 ? 78 : 195 }} 个视频目录</p><span class="text-action">查看教学周次 →</span>
      </RouterLink>
    </div>
    <div class="info-strip"><span class="info-dot" aria-hidden="true"></span><p>目前为 V0.2 页面预览，课程目录数量来自已有资料；视频将在 V0.3–V0.4 分批接入，尚不可播放。</p></div>
  </div>
</template>
