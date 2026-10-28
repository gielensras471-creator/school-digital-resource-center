<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BreadcrumbNav from '../../../components/BreadcrumbNav.vue'
import { getWeeks } from '../data/catalog'
import type { Grade } from '../types/catalog'

const route = useRoute()
const grade = computed(() => Number(route.params.grade) as Grade)
const weeks = computed(() => getWeeks(grade.value))
const gradeName = computed(() => `${['一','二','三','四','五'][grade.value-1]}年级下册`)
</script>

<template>
  <div class="container page-stack">
    <BreadcrumbNav :items="[{ label: '资源总站', to: '/' }, { label: '书法教学', to: '/calligraphy' }, { label: gradeName }]" />
    <div class="page-heading"><div><p class="eyebrow">CALLIGRAPHY · GRADE {{ grade }}</p><h1>{{ gradeName }}</h1><p class="page-intro">选择教学周次，查看对应的书写示范。周次按照第 2 周至第 14 周排列。</p></div><div class="heading-pill">13 个教学周 · {{ grade <= 2 ? 78 : 195 }} 个视频目录</div></div>
    <div class="section-heading"><h2>教学周次</h2><span class="section-side-note">共 13 周</span></div>
    <div class="week-grid">
      <RouterLink v-for="item in weeks" :key="item.id" :to="`/calligraphy/grade/${grade}/week/${item.week}`" class="week-card">
        <span class="week-index">WEEK {{ String(item.week).padStart(2, '0') }}</span>
        <div class="week-content"><h3>第 {{ item.week }} 周</h3><p>{{ item.topic || '教学主题待学校补充' }}</p></div>
        <div class="week-bottom"><span>{{ item.expectedLessonCount }} 个示范视频（目录统计）</span><span aria-hidden="true">→</span></div>
      </RouterLink>
    </div>
    <RouterLink class="button button-secondary back-link" to="/calligraphy">← 返回年级选择</RouterLink>
  </div>
</template>
