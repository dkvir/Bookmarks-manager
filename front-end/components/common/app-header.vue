<template>
  <div class="app-header flex-center justify-between">
    <div class="logo">Logo</div>
    <div class="auth">
      <div class="loading" v-if="userStore.loading">Loading...</div>
      <div class="user" v-else-if="userStore.user">
        Welcome, {{ userStore.user.displayName }}!
        <a :href="`${config.public.backUrl}/auth/logout`">Logout</a>
      </div>
      <div v-else>
        <a :href="`${config.public.backUrl}/auth/google`"
          >Sign In with Google</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/user";

const config = useRuntimeConfig();
const userStore = useUserStore();

onMounted(() => {
  userStore.fetchCurrentUser();
});
</script>

<style lang="scss" scoped>
.app-header {
  padding: var(--page-offset-padding);
}
</style>
