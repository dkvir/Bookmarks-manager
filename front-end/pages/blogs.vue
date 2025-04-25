<template>
  <div class="blogs-page">Blogs</div>
</template>

<script setup>
import { useBlogStore } from "@/store/blogs";
const blogStore = useBlogStore();

await blogStore.fetchBlogs();
</script>

<style lang="scss" scoped></style>
