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
const gradeName = computed(() => `${['一','二','三','四','五'][grade.value-1]}年级下册`)
const rawLessonKey = computed(() => typeof route.params.lessonKey === 'string' ? route.params.lessonKey : null)
const selectedLesson = computed(() => lessons.value.find((item) => item.lessonKey === rawLessonKey.value) || (rawLessonKey.value === null ? lessons.value[0] : undefined))
const lessonNotIndexed = computed(() => rawLessonKey.value !== null && !selectedLesson.value)
const weekPath = computed(() => `/calligraphy/grade/${grade.value}/week/${week.value}`)
</script>

<template>
  <div class="container page-stack">
    <BreadcrumbNav :items="[{ label: '资源总站', to: '/' }, { label: '书法教学', to: '/calligraphy' }, { label: gradeName, to: `/calligraphy/grade/${grade}` }, { label: `第 ${week} 周` }]" />
    <div class="page-heading"><div><p class="eyebrow">CALLIGRAPHY · WEEK {{ String(week).padStart(2, '0') }}</p><h1>{{ details.topic || `第 ${week} 周` }}</h1><p class="page-intro">{{ gradeName }} · 第 {{ week }} 周 · {{ details.expectedLessonCount }} 个视频（目录统计）</p></div><span class="heading-pill">V0.2 · 播放区占位</span></div>
    <div class="lesson-layout">
      <section class="panel video-panel" aria-labelledby="current-lesson">
        <div class="panel-heading"><h2 id="current-lesson">{{ selectedLesson ? selectedLesson.title : (lessonNotIndexed ? '课程尚未收录' : '本周课程预览') }}</h2><span class="small-muted">视频待接入</span></div>
        <div class="video-placeholder" role="img" aria-label="视频播放器尚未接入，V0.3 阶段加入真实视频">
          <div class="placeholder-glyph" aria-hidden="true">▶</div>
          <strong>视频播放区</strong><span>V0.3 将接入真实 MP4 与播放器</span>
          <small>此处仅展示结构，不是可播放的视频</small>
        </div>
        <div class="video-panel-note"><span class="info-dot" aria-hidden="true"></span><span>当前为界面骨架。无需登录，视频上线后在这里播放、暂停和切换课程。</span></div>
      </section>
      <aside class="panel lesson-panel" aria-labelledby="lesson-list-title">
        <div class="panel-heading"><h2 id="lesson-list-title">本周课程</h2><span class="small-muted">预计 {{ details.expectedLessonCount }} 节</span></div>
        <p class="panel-subtitle">{{ lessons.length ? '以下为来源文档已记录的示例课程，暂未连接视频。' : '该周课程的逐条索引将在 V0.4 根据原视频目录生成。' }}</p>
        <div v-if="lessons.length" class="lesson-grid">
          <RouterLink v-for="lesson in lessons" :key="lesson.id" :to="`${weekPath}/lesson/${lesson.lessonKey}`" class="lesson-chip" :class="{ 'lesson-chip-active': selectedLesson?.id === lesson.id }" :aria-current="selectedLesson?.id === lesson.id ? 'page' : undefined"><span>{{ String(lesson.displayOrder).padStart(2, '0') }}</span>{{ lesson.title }}</RouterLink>
        </div>
        <div v-else class="empty-lessons"><span aria-hidden="true">▤</span><strong>课程明细等待导入</strong><p>目前已确认年级、周次和数量，不伪造单个课程或视频地址。</p></div>
        <p v-if="lessonNotIndexed" class="inline-alert" role="status">当前单课链接尚未建立可核实的课程映射，请从周次入口浏览。正式二维码将在课程索引核验后生成。</p>
        <p class="lesson-tip">周次页面地址将长期保持稳定；单课二维码需要等待数据校验与校方确认。</p>
      </aside>
    </div>
    <div class="page-actions"><RouterLink class="button button-secondary" :to="`/calligraphy/grade/${grade}`">← 返回教学周次</RouterLink><RouterLink class="button button-plain" to="/calligraphy">返回年级选择</RouterLink></div>
  </div>
</template>
