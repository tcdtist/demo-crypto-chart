<template>
  <div class="space-y-4">
    <!-- Chart Container -->
    <div
      class="relative h-[50vh] rounded-xl bg-card p-4 shadow-lg border border-border overflow-hidden"
    >
      <ClientOnly>
        <v-chart class="h-full w-full" :option="chartOption" autoresize />
        <div
          v-if="crypto.isLoading"
          class="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm"
        >
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
          ></div>
        </div>
      </ClientOnly>
    </div>
    <!-- Chart Info -->
    <div class="grid grid-cols-3 gap-4">
      <div class="rounded-lg bg-card p-4 border border-border overflow-hidden">
        <p class="text-sm text-muted-foreground">24h Low</p>
        <p class="text-lg font-bold overflow-x-auto no-scrollbar">
          {{ formatPrice(getDayLow) }}
        </p>
      </div>
      <div class="rounded-lg bg-card p-4 border border-border overflow-hidden">
        <p class="text-sm text-muted-foreground">24h High</p>
        <p class="text-lg font-bold overflow-x-auto no-scrollbar">
          {{ formatPrice(getDayHigh) }}
        </p>
      </div>
      <div class="rounded-lg bg-card p-4 border border-border overflow-hidden">
        <p class="text-sm text-muted-foreground">24h Volume</p>
        <p class="text-lg font-bold overflow-x-auto no-scrollbar">
          {{ formatVolume(getDayVolume) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VChart from "vue-echarts";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useCryptoStore } from "~/composables/useCrypto";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const crypto = useCryptoStore();

const chartOption = computed(() => ({
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    formatter: (params: any) => {
      const date = new Date(params[0].value[0]).toLocaleString();
      const price =
        crypto.currency === "USD"
          ? params[0].value[1]
          : params[0].value[1] * crypto.exchangeRate;
      return `${date}<br/>${formatPrice(price)}`;
    },
  },
  xAxis: {
    type: "time",
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
    axisLabel: {
      formatter: (value: number) => {
        const price =
          crypto.currency === "USD" ? value : value * crypto.exchangeRate;
        return formatPrice(price);
      },
    },
  },
  series: [
    {
      data:
        crypto.chartData?.t.map((t, i) => [
          t * 1000,
          crypto.currency === "USD"
            ? crypto.chartData!.c[i]
            : crypto.chartData!.c[i] * crypto.exchangeRate,
        ]) || [],
      type: "line",
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 2,
      },
      areaStyle: {
        opacity: 0.2,
      },
    },
  ],
}));

const getDayLow = computed(() => {
  if (!crypto.chartData?.l.length) return 0;
  const price = Math.min(...crypto.chartData.l);
  return crypto.currency === "USD" ? price : price * crypto.exchangeRate;
});

const getDayHigh = computed(() => {
  if (!crypto.chartData?.h.length) return 0;
  const price = Math.max(...crypto.chartData.h);
  return crypto.currency === "USD" ? price : price * crypto.exchangeRate;
});

const getDayVolume = computed(() => {
  if (!crypto.chartData?.v.length) return 0;
  const volume = crypto.chartData.v.reduce((a, b) => a + b, 0);
  return crypto.currency === "USD" ? volume : volume * crypto.exchangeRate;
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat(crypto.currency === "USD" ? "en-US" : "vi-VN", {
    style: "currency",
    currency: crypto.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: crypto.currency === "USD" ? 2 : 0,
  }).format(price);
};

const formatVolume = (volume: number) => {
  return new Intl.NumberFormat(crypto.currency === "USD" ? "en-US" : "vi-VN", {
    notation: "compact",
    style: "currency",
    currency: crypto.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: crypto.currency === "USD" ? 2 : 0,
  }).format(volume);
};
</script>
