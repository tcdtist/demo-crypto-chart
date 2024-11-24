<template>
  <div class="min-h-screen bg-gradient-to-b from-background to-muted">
    <div class="mx-auto min-h-screen max-w-[768px] flex flex-col">
      <!-- iPhone Frame -->
      <div
        class="mx-auto w-full max-w-[428px] min-h-screen relative bg-background shadow-2xl"
      >
        <!-- Notch -->
        <div
          class="absolute top-0 left-1/2 transform -translate-x-1/2 w-[158px] h-[34px] bg-black rounded-b-3xl z-50"
        ></div>
        <!-- Header -->
        <header
          class="sticky top-0 w-full bg-background/80 backdrop-blur-md z-40 border-b border-border"
        >
          <div class="flex items-center justify-between px-4 h-16 mt-8">
            <ThemeToggle />
            <h1
              class="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
            >
              Crypto Chart
            </h1>
            <CurrencyToggle />
          </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 px-4 pb-20 pt-4">
          <slot />
        </main>

        <!-- Footer -->
        <footer
          class="fixed bottom-0 w-full max-w-[428px] bg-background/80 backdrop-blur-md border-t"
        >
          <nav class="flex items-center justify-around h-16">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="flex flex-col items-center space-y-1 px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              active-class="text-primary"
            >
              <component :is="item.icon" class="h-5 w-5" />
              <span>{{ item.name }}</span>
            </NuxtLink>
          </nav>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, ChartBarIcon, CogIcon } from "@heroicons/vue/24/outline";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Charts", href: "/", icon: ChartBarIcon },
  { name: "Settings", href: "/", icon: CogIcon },
];

useHead({
  htmlAttrs: {
    class: "scroll-smooth",
  },
});
</script>
