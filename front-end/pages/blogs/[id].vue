<template>
  <div class="blog-details">
    <h1 class="title">{{ blogDetailsStore.blog?.title || "Loading..." }}</h1>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else-if="loading" class="loading">Loading blog details...</div>
    <div v-else class="content">
      <p class="date" v-if="blogDetailsStore.blog?.createdAt">
        {{ new Date(blogDetailsStore.blog.createdAt).toLocaleDateString() }}
      </p>
      <div class="blog-content">
        {{ blogDetailsStore.blog?.content }}
      </div>
    </div>
    <nuxt-link to="/blogs" class="back-link">Back to Blogs</nuxt-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBlogDetailsStore } from "@/store/blog-details";

const blogDetailsStore = useBlogDetailsStore();
const route = useRoute();
const error = ref(null);
const loading = ref(true);

const blogId = route.params.id;

async function fetchBlogDetails() {
  try {
    loading.value = true;
    await blogDetailsStore.getBlogDetails(blogId);
    loading.value = false;
  } catch (err) {
    error.value = "Failed to load blog details";
    loading.value = false;
    console.error("Error loading blog details:", err);
  }
}

onMounted(() => {
  fetchBlogDetails();
});
</script>

<style lang="scss" scoped>
.blog-details {
  width: 100vw;
  min-height: 100vh;
  padding: var(--page-offset-padding);

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
