export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    blogs: [],
    error: null,
  }),
  actions: {
    async fetchBlogs() {
      try {
        const res = await fetch("http://localhost:5001/api/blogs", {
          credentials: "include", // This ensures cookies are sent with the request
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          this.error = errorData.error || "Failed to fetch blogs";
          console.log("Fetched blogs:", { error: this.error });
          return;
        }

        const data = await res.json();
        this.blogs = data;
        this.error = null;
        console.log("Fetched blogs:", data);
      } catch (err) {
        this.error = err.message || "An error occurred";
        console.error("Error fetching blogs:", err);
      }
    },
  },
});
