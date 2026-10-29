<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BreadcrumbNav from '../../../components/BreadcrumbNav.vue'
import { getSampleLessons, getWeek } from '../data/catalog'
import type { Grade } from '../types/catalog'

const route = useRoute()
const grade = computed(() => Number(route.params.grade) as Grade)
const week = computed(() => Number(route.params.week))
const details = computed(() => getWeek(grade.value, week.value)!)
const lessons = computed(() => getSampleLessons(grade.value, week.value))
const gradeName = computed(() => `${['一','二','三','四','五'][grade.value - 1]}年级下册`)
const rawLessonKey = computed(() => typeof route.params.lessonKey === 'string' ? route.params.lessonKey : null)
const selectedLesson = computed(() => lessons.value.find((item) => item.lessonKey === rawLessonKey.value) || (rawLessonKey.value === null ? lessons.value[0] : undefined))
const lessonNotIndexed = computed(() => rawLessonKey.value !== null && !selectedLesson.value)
const weekPath = computed(() => `/calligraphy/grade/${grade.value}/week/${week.value}`)
</script>

<template>
  <div class="container page">
    <BreadcrumbNav :items="[{ label: '资源总站', to: '/' }, { label: '书法教学', to: '/calligraphy' }, { label: gradeName, to: `/calligraphy/grade/${grade}` }, { label: `第 ${week} 周` }]" />
    <section class="lesson-header" aria-labelledby="week-title">
      <h1 id="week-title" class="page-title">第 {{ week }} 周 · {{ details.topic || '教学主题待确认' }}</h1>
      <p class="page-sub">{{ gradeName }} · 第 {{ week }} 周 · {{ details.expectedLessonCount }} 个视频目录</p>
    </section>
    <div class="player-grid">
      <section class="player-panel" aria-labelledby="current-lesson">
        <div class="video-box" role="img" aria-label="视频尚未接入，当前为视觉占位，不可播放">
          <span class="video-symbol" aria-hidden="true">▶</span>
          <strong>视频尚未接入</strong>
          <small>V0.3 将接入真实视频播放器</small>
          <span class="video-stub" aria-hidden="true"></span>
        </div>
        <div class="chosen">
          <h2 id="current-lesson">{{ selectedLesson ? selectedLesson.title : (lessonNotIndexed ? '课程尚未收录' : '本周课程预览') }}</h2>
          <p>{{ selectedLesson ? `${gradeName} · 第 ${week} 周 · 第 ${selectedLesson.displayOrder} 节` : `${gradeName} · 第 ${week} 周` }}</p>
          <div class="stub-note">当前仅展示课程页面结构。后续阶段接入视频后，可在此播放、暂停、重播及切换课程。</div>
        </div>
      </section>
      <aside class="playlist" aria-labelledby="lesson-list-title">
        <div class="playlist-top"><h2 id="lesson-list-title">本周课程</h2><span>预计 {{ details.expectedLessonCount }} 节</span></div>
        <div v-if="lessons.length" class="playlist-inner">
          <RouterLink v-for="lesson in lessons" :key="lesson.id" class="lesson-item" :class="{ active: selectedLesson?.id === lesson.id }" :to="`${weekPath}/lesson/${lesson.lessonKey}`" :aria-current="selectedLesson?.id === lesson.id ? 'page' : undefined">
            <span class="lesson-thumb" aria-hidden="true">{{ lesson.title.slice(0, 1) }}</span>
            <span class="lesson-copy"><strong>{{ lesson.displayOrder }} · {{ lesson.title }}</strong><small>书写示范 · 视频未接入</small></span>
            <span class="lesson-indicator" aria-hidden="true">›</span>
          </RouterLink>
        </div>
        <div v-else class="lesson-empty"><strong>课程明细等待导入</strong>目前仅有本周主题和数量；逐条课程将在 V0.4 根据原始目录生成。</div>
        <p v-if="lessonNotIndexed" class="lesson-alert" role="status">当前单课链接尚未建立可核实的课程映射，请从本周课程入口浏览。</p>
        <p class="lesson-footnote">课程导航为预览状态，尚未接入 MP4；原始目录的异常待校方核实。</p>
      </aside>
    </div>
    <div class="back-actions">
      <RouterLink class="btn btn-outline" :to="`/calligraphy/grade/${grade}`">← 返回教学周次</RouterLink>
      <RouterLink class="btn btn-outline" to="/calligraphy">返回年级选择</RouterLink>
    </div>
  </div>
</template>
