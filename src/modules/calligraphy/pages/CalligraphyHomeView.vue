<script setup lang="ts">
import BreadcrumbNav from '../../../components/BreadcrumbNav.vue'
import { grades } from '../data/catalog'
</script>

<template>
  <div class="container page">
    <BreadcrumbNav :items="[{ label: '资源总站', to: '/' }, { label: '书法教学' }]" />
    <section class="intro" aria-labelledby="calligraphy-title">
      <div>
        <p class="eyebrow">CALLIGRAPHY</p>
        <h1 id="calligraphy-title" class="page-title">书法教学</h1>
        <p class="page-sub">选择年级，开始学习规范书写示范课程。</p>
      </div>
      <span class="pill">5 个年级 · 65 个教学周 · 741 个视频目录</span>
    </section>
    <section class="section-gap" aria-labelledby="grades-title">
      <div class="section-heading"><h2 id="grades-title">选择年级</h2><span>一年级至五年级下册</span></div>
      <div class="grade-grid">
        <RouterLink v-for="grade in grades" :key="grade" class="grade-card" :to="`/calligraphy/grade/${grade}`">
          <div class="grade-cover"><span>下册 · GRADE {{ grade }}</span><strong aria-hidden="true">{{ ['一','二','三','四','五'][grade - 1] }}</strong></div>
          <div class="grade-card-body">
            <h3>{{ ['一','二','三','四','五'][grade - 1] }}年级下册</h3>
            <p>13 个教学周 · {{ grade <= 2 ? 78 : 195 }} 个视频目录</p>
            <div class="grade-card-bottom"><span>查看教学周次</span><span class="arrow" aria-hidden="true">→</span></div>
          </div>
        </RouterLink>
      </div>
    </section>
    <p class="preview-note">当前为 V0.2.1 界面预览，视频将在后续阶段接入；目录数量不代表已完成媒体校验。</p>
  </div>
</template>
