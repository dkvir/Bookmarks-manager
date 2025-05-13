<template>
  <div class="blogs-page">
    <h1 class="title">Blogs</h1>
    <ClientOnly>
      <pages-blogs-error v-if="blogStore.error" :error="blogStore.error" />
      <div v-else-if="blogStore.blogs.length === 0" class="no-blogs">
        No blogs found.
        <nuxt-link to="/blogs/new"> Create your first blog! </nuxt-link>
      </div>
      <pages-blogs-list
        v-else
        :blogs="blogStore.blogs"
        :loading="blogStore.loading"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import { useBlogStore } from "@/store/blogs";
const blogStore = useBlogStore();

await blogStore.fetchBlogs();
</script>

<style lang="scss" scoped>
.blogs-page {
  width: 100vw;
  min-height: 100vh;
  padding: var(--page-offset-padding);
  .title {
    margin-bottom: 20px;
    font-size: 48px;
    font-family: var(--ping-regular);
  }
  .no-blogs {
    background-color: var(--color-bird);
    color: var(--color-alligator);
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
}
</style>
