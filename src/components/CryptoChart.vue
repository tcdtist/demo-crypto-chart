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
      <InfoCard
        :title="`${crypto.getTimeRangeLabel} High`"
        :value="formatPrice(crypto.getRangeHighPrice)"
        icon="trending_up"
      />
      <InfoCard
        :title="`${crypto.getTimeRangeLabel} Low`"
        :value="formatPrice(crypto.getRangeLowPrice)"
        icon="trending_down"
      />
      <InfoCard
        :title="`${crypto.getTimeRangeLabel} Volume`"
        :value="formatVolume(crypto.getRangeVolume)"
        icon="analytics"
      />
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
  DataZoomComponent,
} from "echarts/components";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useCryptoStore } from "~/composables/useCrypto";
import { ref } from "vue";
import InfoCard from "./InfoCard.vue";

// Register ECharts components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const crypto = useCryptoStore();

const chartOption = computed(() => ({
  grid: {
    left: "3%",
    right: "4%",
    bottom: "15%", // Increased to accommodate data zoom
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
      return `
        <div class="p-2">
          <div class="text-sm text-muted">${date}</div>
          <div class="font-bold">${formatPrice(price)}</div>
        </div>
      `;
    },
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 100,
    },
    {
      start: 0,
      end: 100,
    },
  ],
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
        color: "#10B981", // Customizable theme color
      },
      areaStyle: {
        opacity: 0.2,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#10B981",
          },
          {
            offset: 1,
            color: "rgba(16, 185, 129, 0.1)",
          },
        ]),
      },
    },
  ],
}));

// Formatting functions
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
