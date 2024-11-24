<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog
      as="div"
      @close="$emit('update:modelValue', false)"
      class="relative z-50"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-card p-6 shadow-xl transition-all"
            >
              <DialogTitle class="text-lg font-medium mb-4">
                Search Cryptocurrency
              </DialogTitle>

              <!-- Search Input -->
              <div class="relative mb-4">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by name or symbol..."
                  class="w-full rounded-lg border border-input bg-background px-4 py-2 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  @input="debouncedSearch"
                />
                <MagnifyingGlassIcon
                  class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                />
              </div>

              <!-- Results -->
              <div class="max-h-[60vh] space-y-2 overflow-y-auto">
                <button
                  v-for="feed in filteredFeeds"
                  :key="feed.symbol"
                  class="w-full flex items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-accent"
                  @click="selectCrypto(feed.symbol)"
                >
                  <div>
                    <p class="font-medium">{{ feed.symbol }}</p>
                    <p class="text-sm text-muted-foreground">
                      {{ feed.description }}
                    </p>
                  </div>
                  <ChevronRightIcon class="h-5 w-5 text-muted-foreground" />
                </button>

                <div
                  v-if="filteredFeeds.length === 0"
                  class="py-8 text-center text-sm text-muted-foreground"
                >
                  No results found
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
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
}>();

const crypto = useCryptoStore();
const searchQuery = ref("");

// Debounced search
const debouncedSearch = useDebounceFn(() => {
  // Implementation here if needed
}, 300);

// Filtered results
const filteredFeeds = computed(() => {
  if (!searchQuery.value) return crypto.priceFeeds;
  const query = searchQuery.value.toLowerCase();
  return crypto.priceFeeds.filter(
    (feed) =>
      feed.symbol.toLowerCase().includes(query) ||
      feed.description.toLowerCase().includes(query)
  );
});

// Select crypto
const selectCrypto = (symbol: string) => {
  crypto.setCurrentSymbol(symbol);
  emit("update:modelValue", false);
  const router = useRouter();
  const route = useRoute();
  router.push({ query: { ...route.query, symbol } });
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
