<template>
  <div class="app-header flex-center justify-between">
    <div class="header-container flex-center justify-between">
      <nuxt-link to="/" class="logo">Logo</nuxt-link>
      <div class="auth">
        <ClientOnly>
          <div class="loading" v-if="userStore?.loading">Loading...</div>
          <div class="user" v-else-if="userStore?.user">
            Welcome, {{ userStore?.user?.displayName }}!
            <a :href="`${config.public.backUrl}/auth/logout`">Logout</a>
          </div>
          <div v-else>
            <a :href="`${config.public.backUrl}/auth/google`"
              >Sign In with Google</a
            >
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/user";

const config = useRuntimeConfig();
const userStore = useUserStore();
await userStore.fetchCurrentUser();
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--app-header-height);
  padding: 0 var(--page-offset-padding);
  color: var(--color-dynamic);

  .header-container {
    width: 100%;
    height: inherit;
    border-bottom: 1px solid var(--color-dynamic);
  }

  .logo {
    text-decoration: none;
    color: var(--color-dynamic);
  }
}
</style>
