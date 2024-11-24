<template>
  <div class="space-y-4">
    <!-- Chart Container -->
    <div
      class="relative h-[500px] rounded-xl bg-card p-4 shadow-lg border border-border overflow-hidden"
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
      <div class="rounded-lg bg-card p-4 border border-border">
        <p class="text-sm text-muted-foreground">24h Low</p>
        <p class="text-lg font-bold">{{ formatPrice(getDayLow) }}</p>
      </div>
      <div class="rounded-lg bg-card p-4 border border-border">
        <p class="text-sm text-muted-foreground">24h High</p>
        <p class="text-lg font-bold">{{ formatPrice(getDayHigh) }}</p>
      </div>
      <div class="rounded-lg bg-card p-4 border border-border">
        <p class="text-sm text-muted-foreground">24h Volume</p>
        <p class="text-lg font-bold">{{ formatVolume(getDayVolume) }}</p>
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
      const price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: crypto.currency,
      }).format(params[0].value[1]);
      return `${date}<br/>${price}`;
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
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: crypto.currency,
          notation: "compact",
        }).format(value);
      },
    },
  },
  series: [
    {
      data:
        crypto.chartData?.t.map((t, i) => [t * 1000, crypto.chartData!.c[i]]) ||
        [],
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
  return Math.min(...crypto.chartData.l);
});

const getDayHigh = computed(() => {
  if (!crypto.chartData?.h.length) return 0;
  return Math.max(...crypto.chartData.h);
});

const getDayVolume = computed(() => {
  if (!crypto.chartData?.v.length) return 0;
  return crypto.chartData.v.reduce((a, b) => a + b, 0);
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: crypto.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const formatVolume = (volume: number) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(volume);
};
</script>
