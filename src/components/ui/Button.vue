<template>
  <button
    :class="[buttonVariants({ variant, size, className })]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { buttonVariants } from "./buttonVariants";

const props = defineProps<{
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}>();
</script>
