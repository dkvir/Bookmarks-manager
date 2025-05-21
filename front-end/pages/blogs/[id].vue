<template>
  <div class="blog-details page-component">
    <h1 class="title">{{ blogsStore.blog?.title }}</h1>
    <div class="content">
      <p class="date" v-if="blogsStore.blog?.createdAt">
        {{ new Date(blogsStore.blog?.createdAt).toLocaleDateString() }}
      </p>
      <div class="blog-content">
        {{ blogsStore.blog?.content }}
      </div>
    </div>
    <nuxt-link to="/blogs" class="back-link">Back to Blogs</nuxt-link>
  </div>
</template>

<script setup>
import { useBlogStore } from "@/store/blogs";

const blogsStore = useBlogStore();
const route = useRoute();

await blogsStore.getBlogDetails(route.params.id);
</script>

<style lang="scss" scoped>
.blog-details {
  .title {
    margin-bottom: 20px;
    font-size: 48px;
    font-family: var(--ping-regular);
  }

  .error-message {
    background-color: var(--color-bird);
    color: var(--color-alligator);
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .loading {
    padding: 20px;
    font-style: italic;
  }

  .content {
    margin-top: 20px;

    .date {
      font-size: 14px;
      color: #666;
      margin-bottom: 15px;
    }

    .blog-content {
      line-height: 1.6;
      white-space: pre-wrap;
    }
  }

  .back-link {
    display: inline-block;
    margin-top: 30px;
    padding: 10px 20px;
    background-color: var(--button-hover, var(--color-seljuk));
    border-radius: 8px;
    color: var(--color-white);
    @include default-transitions(background-color);
    &:hover {
      --button-hover: var(--color-sapphire);
    }
  }
}
</style>
