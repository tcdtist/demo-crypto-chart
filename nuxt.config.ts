// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  css: ["~/assets/css/main.css"],

  typescript: {
    strict: true,
  },

  app: {
    head: {
      title: "Crypto Chart",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  srcDir: "src/",
  compatibilityDate: "2024-11-25",
});