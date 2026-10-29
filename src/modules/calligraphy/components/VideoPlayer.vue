<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  src: string | null
  title: string
  emptyMessage: string
}>()

type PlayerStatus = 'missing' | 'loading' | 'ready' | 'error' | 'ended'
const video = ref<HTMLVideoElement | null>(null)
const status = ref<PlayerStatus>('missing')

watch(
  () => props.src,
  () => {
    // 换课时先暂停旧视频，防止后台继续播放，随后由 :key 重建 video。
    video.value?.pause()
    status.value = props.src ? 'loading' : 'missing'
  },
  { immediate: true },
)

function replay() {
  const el = video.value
  if (!el) return
  el.currentTime = 0
  const operation = el.play()
  if (operation) {
    operation.catch(() => {
      // 可能因浏览器自动播放策略拒绝；用户仍可以使用原生播放按钮。
    })
  }
  status.value = 'ready'
}
</script>

<template>
  <div class="video-player">
    <div class="video-stage">
      <video
        v-if="src"
        :key="src"
        ref="video"
        class="video-element"
        :src="src"
        :aria-label="`${title}的书写示范视频`"
        controls
        playsinline
        webkit-playsinline
        preload="metadata"
        @loadedmetadata="status = 'ready'"
        @error="status = 'error'"
        @ended="status = 'ended'"
      >您的浏览器不支持 HTML5 视频播放。</video>
      <div v-if="!src" class="video-overlay" role="status">
        <span class="video-overlay-icon" aria-hidden="true">▶</span>
        <strong>视频尚未接入</strong>
        <small>{{ emptyMessage }}</small>
      </div>
      <div v-else-if="status === 'loading'" class="video-overlay video-overlay-passive" role="status">
        <strong>正在读取视频…</strong>
      </div>
      <div v-else-if="status === 'error'" class="video-overlay video-overlay-error" role="alert">
        <strong>视频无法加载</strong>
        <small>请确认本地 MP4 已复制到指定目录，且文件可正常播放。</small>
      </div>
    </div>
    <div v-if="src" class="video-tools">
      <span class="video-state-text" role="status">
        {{ status === 'error' ? '加载失败' : status === 'ended' ? '播放完成' : status === 'loading' ? '正在加载' : '使用播放器控制播放与暂停' }}
      </span>
      <button class="video-replay" type="button" :disabled="status !== 'ready' && status !== 'ended'" @click="replay">
        ↺ 重新播放
      </button>
    </div>
  </div>
</template>
