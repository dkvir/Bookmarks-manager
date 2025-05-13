<template>
  <div class="blog-details">blog details</div>
</template>

<script setup>
import { useBlogDetailsStore } from "@/store/blog-details";

const blogDetailsStore = useBlogDetailsStore();
const route = useRoute();

console.log(route.params.slug);

await blogDetailsStore.getBlogDetails(route.params.slug);
</script>

<style lang="scss" scoped></style>
