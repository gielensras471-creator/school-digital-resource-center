<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="brand" to="/" aria-label="校园数字教学资源中心，返回首页">
        <span class="brand-mark" aria-hidden="true">学</span>
        <span class="brand-copy"><strong>校园数字教学资源中心</strong><small>DIGITAL LEARNING RESOURCES</small></span>
      </RouterLink>
      <nav class="top-nav" aria-label="主导航">
        <RouterLink to="/" exact-active-class="nav-active">资源总站</RouterLink>
        <RouterLink to="/calligraphy" active-class="nav-active">书法教学</RouterLink>
      </nav>
    </div>
  </header>
</template>
