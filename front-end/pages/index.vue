<template>
  <div class="home-page page-component">
    <h2 class="title">Welcome to Bookmarks manager</h2>
    <nuxt-link to="/blogs" class="see-bookmarks">See all bookmarks</nuxt-link>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home-page {
  .title {
    margin-bottom: 20px;
    font-size: 48px;
    font-family: var(--ping-regular);
  }
}
</style>
