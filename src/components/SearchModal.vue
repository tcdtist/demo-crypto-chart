<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
    @click="$emit('update:modelValue', false)"
  >
    <div
      class="fixed left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-lg bg-card p-6 shadow-lg bg-white overflow-hidden"
      @click.stop
    >
      <!-- Search Input -->
      <div class="relative">
        <MagnifyingGlassIcon
          class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
        />
        <input
          v-model="searchQuery"
          type="text"
          class="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Search cryptocurrency..."
          @input="debouncedSearch"
        />
      </div>

      <!-- Results List -->
      <div class="max-h-[60vh] space-y-2 overflow-auto">
        <div
          v-for="feed in filteredFeeds"
          :key="feed.symbol"
          class="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-accent"
          @click="selectCrypto(feed.symbol)"
        >
          <div class="space-y-1">
            <p class="text-sm font-medium leading-none">{{ feed.symbol }}</p>
            <p class="text-xs text-muted-foreground">{{ feed.description }}</p>
          </div>
          <ChevronRightIcon class="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="crypto.isLoading"
        class="flex items-center justify-center py-8"
      >
        <div
          class="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"
        ></div>
      </div>

      <!-- No Results -->
      <div
        v-else-if="filteredFeeds.length === 0"
        class="py-8 text-center text-sm text-muted-foreground"
      >
        No cryptocurrencies found.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline";
import { useCryptoStore } from "~/composables/useCrypto";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  select: [symbol: string];
}>();

const crypto = useCryptoStore();
const searchQuery = ref("");

// Debounced search
const debouncedSearch = useDebounceFn(() => {
  // Implementation here if needed
}, 300);

// Computed filtered results
const filteredFeeds = computed(() => {
  if (!searchQuery.value) return crypto.priceFeeds;
  const query = searchQuery.value.toLowerCase();
  return crypto.priceFeeds.filter(
    (feed) =>
      feed.symbol.toLowerCase().includes(query) ||
      feed.description.toLowerCase().includes(query)
  );
});

// Select cryptocurrency
const selectCrypto = (symbol: string) => {
  emit("select", symbol);
  emit("update:modelValue", false);
  searchQuery.value = "";
};

// Clear search on close
watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      searchQuery.value = "";
    }
  }
);
</script>
