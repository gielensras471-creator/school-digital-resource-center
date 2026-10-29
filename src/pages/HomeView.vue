<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="container page">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-content">
        <p class="hero-kicker">DIGITAL LEARNING RESOURCES</p>
        <h1 id="hero-title">校园数字教学资源中心</h1>
        <p>汇集清晰、易用的教学资源，让每一次自主学习都有迹可循。</p>
        <RouterLink to="/calligraphy" class="btn">进入书法教学 <span aria-hidden="true">→</span></RouterLink>
      </div>
      <div class="hero-art" aria-hidden="true">
        <span class="orb one"></span><span class="orb two"></span>
        <div class="art-tiles">
          <div class="small-art"><i></i><i></i><div class="art-play">▷</div></div>
          <div class="book-graphic"><span class="art-title">书法教学</span><div class="art-main">永</div><div class="art-line"></div><div class="art-line sm"></div></div>
        </div>
      </div>
    </section>

    <section class="module-section" aria-labelledby="modules-title">
      <div class="section-heading"><h2 id="modules-title">教学资源</h2><span>首期开放 1 个模块</span></div>
      <div class="modules">
        <RouterLink class="module module-active" to="/calligraphy">
          <div>
            <div class="module-top">
              <span class="module-icon" aria-hidden="true">✎</span>
              <span class="arrow" aria-hidden="true">→</span>
            </div>
            <h3>书法教学</h3><p>一年级至五年级下册 · 65 个教学周</p>
          </div>
          <div class="module-footer"><span>课程目录已开放 · 视频待接入</span><span>探索课程 →</span></div>
        </RouterLink>
        <div class="module locked" aria-label="朗读与听力，规划中，暂未开放">
          <div><div class="module-top"><span class="module-icon disabled" aria-hidden="true">♫</span></div><h3>朗读与听力</h3><p>后续资源方向，暂未开放</p></div>
          <div class="module-footer"><span>规划中</span></div>
        </div>
        <div class="module locked" aria-label="科学实验，规划中，暂未开放">
          <div><div class="module-top"><span class="module-icon disabled" aria-hidden="true">⚗</span></div><h3>科学实验</h3><p>后续资源方向，暂未开放</p></div>
          <div class="module-footer"><span>规划中</span></div>
        </div>
      </div>
    </section>
  </div>
</template>
