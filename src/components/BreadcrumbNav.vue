<script setup lang="ts">
interface Crumb { label: string; to?: string }
defineProps<{ items: Crumb[] }>()
</script>

<template>
  <nav class="breadcrumb" aria-label="面包屑导航">
    <template v-for="(item, index) in items" :key="`${item.label}-${index}`">
      <span v-if="index" class="breadcrumb-divider" aria-hidden="true">/</span>
      <RouterLink v-if="item.to" :to="item.to">{{ item.label }}</RouterLink>
      <span v-else aria-current="page">{{ item.label }}</span>
    </template>
  </nav>
</template>
