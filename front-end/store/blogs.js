export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    blogs: [],
    error: null,
    loading: false,
  }),

  actions: {
    async fetchBlogs() {
      this.loading = true;
      this.error = null;

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
      } finally {
        this.loading = false;
      }
    },

    async createBlog(blogData) {
      this.loading = true;
      this.error = null;

      try {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.backUrl}/api/blogs`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create blog");
        }

        const createdBlog = await response.json();
        console.log("Blog created successfully:", createdBlog);

        this.blogs.push(createdBlog);

        return { success: true, blog: createdBlog };
      } catch (err) {
        this.error = err.message || "An error occurred while creating the blog";
        console.error("Error creating blog:", err);
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
  },
});
