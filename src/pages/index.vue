<template>
  <div class="flex-1 space-y-4">
    <!-- Crypto Header -->
    <div class="flex items-center justify-between">
      <div
        class="flex items-center gap-2 cursor-pointer"
        @click="showSearch = true"
      >
        <h1 class="text-2xl font-bold">{{ crypto.currentSymbol }}</h1>
        <ChevronDownIcon class="h-5 w-5 text-muted-foreground" />
      </div>
      <TimeRangeSelector />
    </div>

    <!-- Price Info -->
    <div class="flex items-center gap-4">
      <div class="text-3xl font-bold">
        {{ formatPrice(crypto.getCurrentPrice) }}
      </div>
      <div
        :class="[
          'flex items-center gap-1 text-sm font-medium',
          crypto.getPriceChange >= 0 ? 'text-green-500' : 'text-red-500',
        ]"
      >
        <ArrowUpIcon v-if="crypto.getPriceChange >= 0" class="h-4 w-4" />
        <ArrowDownIcon v-else class="h-4 w-4" />
        {{ Math.abs(crypto.getPriceChange).toFixed(2) }}%
      </div>
    </div>

    <!-- Chart -->
    <CryptoChart />

    <!-- Search Modal -->
    <SearchModal v-model="showSearch" @select="handleCryptoSelect" />
  </div>
</template>

<script setup lang="ts">
import {
  ChevronDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/vue/24/outline";
import { useCryptoStore } from "~/composables/useCrypto";

const crypto = useCryptoStore();
const showSearch = ref(false);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: crypto.currency,
  }).format(price);
};

const handleCryptoSelect = (symbol: string) => {
  const router = useRouter();
  const route = useRoute();
  router.push({ query: { ...route.query, symbol } });
  crypto.setCurrentSymbol(symbol);
};

onMounted(async () => {
  await crypto.fetchPriceFeeds();

  const route = useRoute();
  if (route.query.symbol) {
    crypto.setCurrentSymbol(route.query.symbol as string);
  }

  await crypto.fetchChartData();
});
</script>
