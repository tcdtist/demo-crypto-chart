import { defineStore } from "pinia";
import type { CryptoState, TimeRange } from "~/types/api";
import { useApi } from "./useApi";

export const useCryptoStore = defineStore("crypto", {
  state: (): CryptoState => ({
    currentSymbol: "BTC/USD",
    timeRange: "1M",
    currency: "USD",
    priceFeeds: [],
    chartData: null,
    isLoading: false,
    error: null,
    exchangeRate: 23500,
  }),

  getters: {
    getCurrentPrice: (state) => {
      if (!state.chartData?.c?.length) return 0;
      const price = state.chartData.c[state.chartData.c.length - 1];
      return state.currency === "USD" ? price : price * state.exchangeRate;
    },

    getPriceChange: (state) => {
      if (!state.chartData?.c?.length) return 0;
      const prices = state.chartData.c;
      const firstPrice = prices[0];
      const lastPrice = prices[prices.length - 1];
      return ((lastPrice - firstPrice) / firstPrice) * 100;
    },

    getRangeHighPrice: (state) => {
      if (!state.chartData?.h?.length) return 0;
      const price = Math.max(...state.chartData.h);
      return state.currency === "USD" ? price : price * state.exchangeRate;
    },

    getRangeLowPrice: (state) => {
      if (!state.chartData?.l?.length) return 0;
      const price = Math.min(...state.chartData.l);
      return state.currency === "USD" ? price : price * state.exchangeRate;
    },

    getRangeVolume: (state) => {
      if (!state.chartData?.v?.length) return 0;
      const volume = state.chartData.v.reduce((a, b) => a + b, 0);
      return state.currency === "USD" ? volume : volume * state.exchangeRate;
    },

    getTimeRangeLabel: (state) => {
      const labels = {
        "1D": "Past 24h",
        "1M": "Past Month",
        "3M": "Past 3 Months",
        "6M": "Past 6 Months",
        "1Y": "Past Year",
      };
      return labels[state.timeRange] || "Custom Range";
    },
  },

  actions: {
    async fetchPriceFeeds() {
      const { getPriceFeedsData } = useApi();
      try {
        this.isLoading = true;
        this.priceFeeds = await getPriceFeedsData();
      } catch (error) {
        this.error = "Failed to fetch price feeds";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchChartData() {
      const { getBenchmarkData } = useApi();
      try {
        this.isLoading = true;
        this.error = null; // Reset error state
        const duration = this.getDurationDays();
        this.chartData = await getBenchmarkData(this.currentSymbol, duration);

        if (!this.chartData) {
          throw new Error("No data received");
        }
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to fetch chart data";
        console.error("Chart data fetch error:", error);
      } finally {
        this.isLoading = false;
      }
    },

    setTimeRange(range: TimeRange) {
      this.timeRange = range;
      this.fetchChartData();
    },

    setCurrentSymbol(symbol: string) {
      this.currentSymbol = symbol;
      this.fetchChartData();
    },

    async toggleCurrency() {
      try {
        if (this.currency === "USD") {
          const { rate } = useExchangeRate();
          if (!rate.value) {
            throw new Error("Exchange rate not available");
          }
          this.exchangeRate = rate.value;
        }
        this.currency = this.currency === "USD" ? "VND" : "USD";
      } catch (error) {
        this.error = "Failed to update currency";
        console.error("Currency toggle error:", error);
      }
    },

    getDurationDays(): number {
      switch (this.timeRange) {
        case "1D":
          return 1;
        case "1M":
          return 30;
        case "3M":
          return 90;
        case "6M":
          return 180;
        case "1Y":
          return 365;
        default:
          return 30;
      }
    },
  },
});
