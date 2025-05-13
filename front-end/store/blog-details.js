export const useBlogDetailsStore = defineStore("blogDetailsStore", {
  state: () => ({
    blog: null,
    loading: false,
    error: null,
  }),

  actions: {
    async getBlogDetails(blogId) {
      this.loading = true;
      this.error = null;

      try {
        const config = useRuntimeConfig();
        const response = await fetch(
          `${config.public.backUrl}/api/blogs/${blogId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }

        const data = await response.json();
        this.blog = data;
        return data;
      } catch (error) {
        console.error("Error fetching blog details:", error);
        this.error = error.message || "Failed to load blog";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
