import type { Grade, SampleLesson, WeekSummary } from '../types/catalog'

export const grades: readonly Grade[] = [1, 2, 3, 4, 5]
export const allWeeks: readonly number[] = Array.from({ length: 13 }, (_, i) => i + 2)

// 来自项目来源文档的原始周次主题。五年级无可靠主题，保留 null。
const topics: Record<Grade, readonly (string | null)[]> = {
  1: ['长撇', '斜捺', '平捺', '长提', '竖钩', '弯钩', '竖提', '撇折', '斜钩', '卧钩', '竖弯钩', '横折', '横折直钩'],
  2: ['两点水', '三点水', '言字旁', '人字头', '八字头', '木字头', '木字旁', '单人旁', '双人旁', '提手旁', '竖心旁', '双耳刀（左耳旁）', '双耳刀（右耳旁）'],
  3: ['横平竖直', '横笔等距', '竖笔等距', '撇捺匀称', '左右相称', '上下正对', '重心平稳', '左收右放', '左放右收', '左右相向', '左右相背', '穿插均匀', '内紧外松'],
  4: ['左竖右横', '左竖右撇', '提低捺高', '提短钩长', '字有双撇', '字有双钩', '字形方正', '字长勿短', '字扁勿长', '字斜勿正', '内外包围', '三面包围', '两面包围'],
  5: Array.from({ length: 13 }, () => null),
}

export function isGrade(value: number): value is Grade {
  return Number.isInteger(value) && value >= 1 && value <= 5
}

export function getWeeks(grade: Grade): WeekSummary[] {
  return allWeeks.map((week, index) => ({
    id: `calligraphy-g${grade}-w${String(week).padStart(2, '0')}`,
    grade,
    week,
    topic: topics[grade][index] ?? null,
    expectedLessonCount: grade <= 2 ? 6 : 15,
    dataStatus: 'summary_only' as const,
  }))
}

export function getWeek(grade: Grade, week: number): WeekSummary | undefined {
  return getWeeks(grade).find((item) => item.week === week)
}

export const sampleLessons: readonly SampleLesson[] = [
  { id: 'calligraphy-g1-w02-01', lessonKey: '1', title: '长撇', displayOrder: 1, originalFileName: '1.长撇.mp4', mediaStatus: 'not_connected' },
  { id: 'calligraphy-g1-w02-02', lessonKey: '2', title: '人', displayOrder: 2, originalFileName: '2.人.mp4', mediaStatus: 'not_connected' },
  { id: 'calligraphy-g1-w02-03', lessonKey: '3', title: '广', displayOrder: 3, originalFileName: '3.广.mp4', mediaStatus: 'not_connected' },
  { id: 'calligraphy-g1-w02-04', lessonKey: '4', title: '少', displayOrder: 4, originalFileName: '4.少.mp4', mediaStatus: 'not_connected' },
  { id: 'calligraphy-g1-w02-05', lessonKey: '5', title: '左', displayOrder: 5, originalFileName: '5.左.mp4', mediaStatus: 'not_connected' },
  { id: 'calligraphy-g1-w02-06', lessonKey: '6', title: '在', displayOrder: 6, originalFileName: '6.在.mp4', mediaStatus: 'not_connected' },
]

export function getSampleLessons(grade: Grade, week: number): readonly SampleLesson[] {
  return grade === 1 && week === 2 ? sampleLessons : []
}
