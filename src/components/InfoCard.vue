<template>
  <div
    class="rounded-lg bg-card p-4 border border-border hover:shadow-lg transition-all"
  >
    <div class="flex items-center justify-between mb-2">
      <p class="text-sm text-muted-foreground">{{ title }}</p>
      <component
        v-if="icon"
        :is="iconComponent"
        class="w-5 h-5 text-muted-foreground"
      />
    </div>
    <div class="flex items-baseline gap-2">
      <p class="text-lg font-bold overflow-x-auto no-scrollbar">{{ value }}</p>
      <span
        v-if="change !== undefined"
        :class="{ 'text-green-500': change > 0, 'text-red-500': change < 0 }"
        class="text-sm font-medium"
      >
        {{ change > 0 ? "+" : "" }}{{ change.toFixed(2) }}%
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarSquareIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps<{
  title: string;
  value: string;
  change?: number;
  icon?: "trending_up" | "trending_down" | "analytics";
}>();

const iconComponent = computed(() => {
  switch (props.icon) {
    case "trending_up":
      return ArrowTrendingUpIcon;
    case "trending_down":
      return ArrowTrendingDownIcon;
    case "analytics":
      return ChartBarSquareIcon;
    default:
      return null;
  }
});
</script>
