<template>
  <header class="site-header">
    <div class="container head">
      <RouterLink class="brand" to="/" aria-label="校园数字教学资源中心，返回首页">
        <span class="logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linejoin="round">
            <path d="M12 20c-3-2.3-6-2.9-10-2.4V4.7c4-.8 7 .3 10 2.3 3-2 6-3.1 10-2.3v12.9c-4-.5-7 .1-10 2.4Z" />
            <path d="M12 7v13" />
          </svg>
        </span>
        <span><strong class="brand-name">校园数字教学资源中心</strong><small class="brand-sub">DIGITAL LEARNING RESOURCES</small></span>
      </RouterLink>
      <nav class="nav" aria-label="主导航">
        <RouterLink to="/" exact-active-class="active">资源总站</RouterLink>
        <RouterLink to="/calligraphy" active-class="active">书法教学</RouterLink>
      </nav>
    </div>
  </header>
</template>
