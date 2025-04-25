export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    blogs: [],
  }),
  actions: {
    async fetchBlogs() {
      try {
        const res = await fetch("http://localhost:5001/api/blogs");
        const data = await res.json();
        this.blogs = data;
        console.log("Fetched blogs:", data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    },
  },
});
