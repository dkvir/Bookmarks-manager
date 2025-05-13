<template>
  <div class="new-blog">
    <h1 class="title">Create a New Blog</h1>
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
      <button class="button" type="submit">Create Blog</button>
    </form>
  </div>
</template>

<script setup>
const blog = reactive({
  title: "",
  content: "",
});

const createBlog = () => {};
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
    }
  }
}
</style>
