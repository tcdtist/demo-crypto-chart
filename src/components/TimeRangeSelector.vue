<template>
  <div class="flex items-center gap-1.5 p-1 bg-muted rounded-lg">
    <button
      v-for="range in timeRanges"
      :key="range"
      class="relative p-1.5 text-sm font-medium transition-colors rounded-md hover:text-primary"
      :class="[
        crypto.timeRange === range
          ? 'text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground',
      ]"
      @click="crypto.setTimeRange(range)"
    >
      {{ range }}
      <div
        v-if="crypto.timeRange === range"
        class="absolute inset-0 bg-primary rounded-md -z-10 animate-in fade-in zoom-in-95"
      ></div>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TimeRange } from "~/types/api";
import { useCryptoStore } from "~/composables/useCrypto";

const crypto = useCryptoStore();
const timeRanges: TimeRange[] = ["1D", "1M", "3M", "6M", "1Y"];
</script>
