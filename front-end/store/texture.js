export const useTextureStore = defineStore("useTextureStore", {
  state: () => ({
    textureIndex: null,
  }),
  actions: {
    changeTextureIndex(index) {
      this.textureIndex = index;
    },
  },
});
