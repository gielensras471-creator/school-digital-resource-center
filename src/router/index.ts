import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { getWeek, isGrade } from '../modules/calligraphy/data/catalog'

// GitHub Pages doesn't offer history-mode rewrites for deep links.
// Use hash routes only in the Pages preview. Tencent Cloud/local stay in history mode.
const history = import.meta.env.BASE_URL === '/school-digital-resource-center/'
  ? createWebHashHistory(import.meta.env.BASE_URL)
  : createWebHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history,
  routes: [
    { path: '/', name: 'home', component: () => import('../pages/HomeView.vue'), meta: { title: '资源总站' } },
    { path: '/calligraphy', name: 'calligraphy', component: () => import('../modules/calligraphy/pages/CalligraphyHomeView.vue'), meta: { title: '书法教学' } },
    { path: '/calligraphy/grade/:grade', name: 'grade', component: () => import('../modules/calligraphy/pages/GradeView.vue'), meta: { title: '年级课程' } },
    { path: '/calligraphy/grade/:grade/week/:week', name: 'week', component: () => import('../modules/calligraphy/pages/WeekView.vue'), meta: { title: '本周课程' } },
    { path: '/calligraphy/grade/:grade/week/:week/lesson/:lessonKey', name: 'lesson', component: () => import('../modules/calligraphy/pages/WeekView.vue'), meta: { title: '课程预览' } },
    { path: '/not-found', name: 'notFound', component: () => import('../pages/NotFoundView.vue'), meta: { title: '页面不存在' } },
    { path: '/:pathMatch(.*)*', name: 'notFoundCatchAll', component: () => import('../pages/NotFoundView.vue'), meta: { title: '页面不存在' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if ((to.name === 'lesson' || to.name === 'week') && (from.name === 'lesson' || from.name === 'week') && to.params.grade === from.params.grade && to.params.week === from.params.week) return undefined
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.name === 'grade' || to.name === 'week' || to.name === 'lesson') {
    const gradeValue = String(to.params.grade)
    if (!/^[1-5]$/.test(gradeValue)) return { name: 'notFound', replace: true }
    const grade = Number(gradeValue)
    if (!isGrade(grade)) return { name: 'notFound', replace: true }
    if (to.name === 'week' || to.name === 'lesson') {
      const weekValue = String(to.params.week)
      if (!/^(?:[2-9]|1[0-4])$/.test(weekValue) || !getWeek(grade, Number(weekValue))) return { name: 'notFound', replace: true }
    }
    if (to.name === 'lesson' && !/^[a-zA-Z0-9_-]+$/.test(String(to.params.lessonKey))) return { name: 'notFound', replace: true }
  }
  return true
})

router.afterEach((to) => {
  document.title = `${String(to.meta.title || '资源总站')} · 校园数字教学资源中心`
})

export default router
