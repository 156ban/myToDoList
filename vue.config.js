module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/generic.scss";`,
      },
    },
  },
};
