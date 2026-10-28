export type Grade = 1 | 2 | 3 | 4 | 5

export interface WeekSummary {
  id: string
  grade: Grade
  week: number
  topic: string | null
  expectedLessonCount: number
  /** V0.2 用于界面导航的周次概要，不代表对应视频已完成媒体校验。 */
  dataStatus: 'summary_only'
}

export interface SampleLesson {
  id: string
  lessonKey: string
  title: string
  displayOrder: number
  originalFileName: string
  /** 此数据来自文档，V0.3 视频路径接入前不提供伪造的 videoUrl。 */
  mediaStatus: 'not_connected'
}
