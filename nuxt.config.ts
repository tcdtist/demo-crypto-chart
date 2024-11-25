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
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      title: "Crypto Chart Tracker",
      meta: [
        {
          name: "description",
          content:
            "Real-time cryptocurrency price charts and market data powered by Pyth Network. Track Bitcoin, Ethereum, and other major cryptocurrencies with advanced visualization tools.",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#000000" },

        // Open Graph / Facebook
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Crypto Chart Tracker - Real-time Cryptocurrency Charts",
        },
        {
          property: "og:description",
          content:
            "Track cryptocurrency prices and market trends with interactive charts. Features include real-time data, multiple timeframes, and USD/VND conversion.",
        },
        { property: "og:image", content: "/og-image.jpg" },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Crypto Chart Tracker - Real-time Cryptocurrency Charts",
        },
        {
          name: "twitter:description",
          content:
            "Track cryptocurrency prices and market trends with interactive charts. Features include real-time data, multiple timeframes, and USD/VND conversion.",
        },
        { name: "twitter:image", content: "/og-image.jpg" },

        // Keywords
        {
          name: "keywords",
          content:
            "cryptocurrency, crypto charts, Bitcoin price, Ethereum price, crypto tracker, crypto market data, real-time crypto prices, cryptocurrency analysis",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },

  srcDir: "src/",

  imports: {
    dirs: ["stores"],
  },

  compatibilityDate: "2024-11-25",
});
