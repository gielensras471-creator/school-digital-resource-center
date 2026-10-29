/**
 * V0.3：只配置一年级下册第 2 周的本地样本。
 * 媒体文件不进入 Git；GitHub Pages 仅展示界面，不请求私有视频。
 * V0.4 再换成统一自动生成的课程索引。
 */
const githubPagesPreview = import.meta.env.BASE_URL === '/school-digital-resource-center/'

export function getSampleVideoUrl(
  grade: number,
  week: number,
  originalFileName?: string,
): string | null {
  if (githubPagesPreview || grade !== 1 || week !== 2 || !originalFileName) return null
  return `${import.meta.env.BASE_URL}videos/calligraphy/g1/w02/${encodeURIComponent(originalFileName)}`
}

export function getMediaHint(grade: number, week: number): string {
  if (grade !== 1 || week !== 2) return '该周逐条课程和视频将在 V0.4 统一导入。'
  if (githubPagesPreview) return '此地址仅用于界面预览；视频保存在本地电脑，不会上传公开 GitHub。'
  return '本地样本模式：如无法播放，请检查六个 MP4 是否位于 public/videos/calligraphy/g1/w02。'
}
