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
  }),

  getters: {
    getCurrentPrice: (state) => {
      if (!state.chartData?.c.length) return 0;
      return state.chartData.c[state.chartData.c.length - 1];
    },
    getPriceChange: (state) => {
      if (!state.chartData?.c.length) return 0;
      const prices = state.chartData.c;
      const firstPrice = prices[0];
      const lastPrice = prices[prices.length - 1];
      return ((lastPrice - firstPrice) / firstPrice) * 100;
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
        const duration = this.getDurationDays();
        this.chartData = await getBenchmarkData(this.currentSymbol, duration);
      } catch (error) {
        this.error = "Failed to fetch chart data";
        console.error(error);
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

    toggleCurrency() {
      this.currency = this.currency === "USD" ? "VND" : "USD";
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
