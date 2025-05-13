<template>
  <div class="new-blog">
    <h1 class="title">Create a New Blog</h1>
    <div v-if="blogStore.error" class="error-message">
      {{ blogStore.error }}
    </div>
    <form class="form" @submit.prevent="createBlog">
      <div class="form-group">
        <label class="label uppercase" for="title">blog title</label>
        <input
          class="input-text input"
          type="text"
          id="title"
          v-model="blog.title"
          placeholder="input title..."
          required
        />
      </div>
      <div class="form-group">
        <label class="label uppercase" for="content">Content</label>
        <textarea
          class="textarea input"
          id="content"
          v-model="blog.content"
          required
          placeholder="input content..."
          rows="10"
        ></textarea>
      </div>
      <button class="button" type="submit" :disabled="blogStore.loading">
        {{ blogStore.loading ? "Creating..." : "Create Blog" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useBlogStore } from "@/store/blogs";

const router = useRouter();
const blogStore = useBlogStore();

const blog = reactive({
  title: "",
  content: "",
});

const createBlog = async () => {
  if (!blog.title || !blog.content) {
    blogStore.error = "Title and content are required";
    return;
  }

  const result = await blogStore.createBlog({
    title: blog.title,
    content: blog.content,
  });

  if (result.success) {
    // Reset form
    blog.title = "";
    blog.content = "";

    // Redirect to blogs list page
    router.push("/blogs");
  }
};
</script>

<style lang="scss" scoped>
.new-blog {
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
  .form {
    width: 100%;
    height: 100%;
    padding: calc(var(--page-offset-padding) / 2);
    border-radius: 8px;
    .form-group {
      @include list-distance(top, 30px);
    }
    .label {
      font-size: 24px;
      font-family: var(--font-ping-regular);
    }
    .input {
      margin-top: 15px;

      &.input-text {
        width: 100%;
        height: 100%;
        border: 1px solid var(--color-black);
        padding: calc(var(--page-offset-padding) / 2);
        border-radius: 8px;
      }
      &.textarea {
        width: 100%;
        height: 100%;
        border: 1px solid var(--color-black);
        padding: calc(var(--page-offset-padding) / 2);
        border-radius: 8px;
      }
    }
    .button {
      margin-top: 30px;
      padding: 20px 40px;
      background-color: var(--button-hover, var(--color-seljuk));
      border-radius: 8px;
      font-size: 18px;
      color: var(--color-white);
      @include default-transitions(background-color);
      cursor: pointer;
      &:hover {
        --button-hover: var(--color-sapphire);
      }
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
}
</style>
