<template>
  <ul class="blogs-list">
    <li
      v-for="(blog, index) in blogStore.blogs"
      :key="blog._id"
      class="blog-item"
    >
      <h2 class="blog-title">{{ blog.title }}</h2>
      <p class="content">{{ blog.content }}</p>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  blogs: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.blogs-list {
  .blog-item {
    background-color: var(--color-doctor);
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 15px;

    .blog-title {
      margin-top: 0;
    }
  }
}
</style>
