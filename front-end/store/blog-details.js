export const useBlogDetailsStore = defineStore("blogDetailsStore", {
  state: () => ({
    blog: {},
  }),

  actions: {
    getBlogDetails(blogId) {
      const config = useRuntimeConfig();
      return new Promise((resolve, reject) => {
        fetch(`${config.public.backUrl}/api/blogs/${blogId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch blog details");
            }
            return response.json();
          })
          .then((data) => {
            this.blog = data;
            resolve(data);
          })
          .catch((error) => {
            console.error("Error fetching blog details:", error);
            reject(error);
          });
      });
    },
  },
});
