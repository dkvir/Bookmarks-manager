export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
  },

  actions: {
    async fetchCurrentUser() {
      const config = useRuntimeConfig();

      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(
          `${config.public.backUrl}/api/current_user`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData = await response.json();
        this.user = userData;
        return userData;
      } catch (err) {
        this.error = err.message;
        this.user = null;
      } finally {
        this.loading = false;
      }
    },

    clearUser() {
      this.user = null;
    },
  },
});
