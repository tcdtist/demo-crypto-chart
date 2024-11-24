<template>
  <button
    class="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-colors"
    :class="crypto.currency === 'USD' ? 'text-green-500' : 'text-blue-500'"
    @click="crypto.toggleCurrency"
  >
    {{ crypto.currency }}
  </button>
</template>

<script setup lang="ts">
import { useCryptoStore } from "~/composables/useCrypto";

const crypto = useCryptoStore();
</script>
