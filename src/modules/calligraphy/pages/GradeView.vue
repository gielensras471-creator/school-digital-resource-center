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
  <div class="container page">
    <BreadcrumbNav :items="[{ label: '资源总站', to: '/' }, { label: '书法教学', to: '/calligraphy' }, { label: gradeName }]" />
    <div class="weak-heading">
      <div><h1 class="page-title">{{ gradeName }}</h1><p class="page-sub">选择教学周次，查看对应的书写示范课程。</p></div>
      <span class="pill">13 个教学周 · {{ grade <= 2 ? 78 : 195 }} 个视频目录</span>
    </div>
    <section aria-label="教学周次列表">
      <div class="week-grid">
        <RouterLink v-for="item in weeks" :key="item.id" class="week-card" :to="`/calligraphy/grade/${grade}/week/${item.week}`">
          <div class="week-num">
            <span class="week-label">第 {{ item.week }} 周</span>
            <h3>{{ item.topic || `第 ${item.week} 周` }}</h3>
            <p>{{ item.expectedLessonCount }} 个视频目录{{ item.topic ? '' : ' · 教学主题待确认' }}</p>
          </div>
          <span class="week-arrow" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>
    <div class="back-actions"><RouterLink class="btn btn-outline" to="/calligraphy">← 返回年级选择</RouterLink></div>
  </div>
</template>
