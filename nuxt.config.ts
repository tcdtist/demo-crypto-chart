export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@pinia/nuxt"],

  css: ["~/assets/css/main.css"],

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  components: {
    global: true,
    dirs: ["~/components"],
  },

  build: {
    transpile: ["echarts", "vue-echarts"],
  },

  typescript: {
    strict: true,
  },

  app: {
    head: {
      title: "Crypto Chart",
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
    },
  },

  srcDir: "src/",

  imports: {
    dirs: ["stores"],
  },

  compatibilityDate: "2024-11-25",
});
