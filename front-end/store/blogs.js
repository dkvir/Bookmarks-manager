export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    blogs: [],
    blog: null,
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
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create blog");
        }

        const data = await res.json();
        this.blogs = data;
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    },

    async createBlog(blogData) {
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
        this.blogs.push(createdBlog);

        return { success: true, blog: createdBlog };
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    },

    async getBlogDetails(blogId) {
      if (this.blogs.length > 0) {
        const blog = this.blogs.find((blog) => blog._id === blogId);
        if (blog) {
          this.blog = blog;
          return blog;
        }
      } else {
        try {
          const res = await fetch(`http://localhost:5001/api/blogs/${blogId}`, {
            credentials: "include", // This ensures cookies are sent with the request
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create blog");
          }

          const data = await res.json();
          this.blog = data;
        } catch (err) {
          console.error("Error fetching blogs:", err);
        }
      }
    },
  },
});
