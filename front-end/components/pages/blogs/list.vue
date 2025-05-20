<template>
  <ul class="blogs-list">
    <li v-for="(blog, index) in blogs" :key="blog._id" class="blog-item">
      <nuxt-link class="blog-link" :to="`blogs/${blog._id}`">
        <h2 class="blog-title">{{ blog.title }}</h2>
        <p class="content">{{ blog.content }}</p>
      </nuxt-link>
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

    .blog-link {
      text-decoration: none;
      color: var(--color-dynamic);
    }

    .blog-title {
      font-size: 24px;
    }
    .content {
      font-size: 18px;
      color: var(--color-gray);
    }
  }
}
</style>
