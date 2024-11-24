<template>
  <Button variant="ghost" size="icon" @click="toggleTheme">
    <SunIcon v-if="colorMode.value === 'dark'" class="h-5 w-5" />
    <MoonIcon v-else class="h-5 w-5" />
  </Button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
