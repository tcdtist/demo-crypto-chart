export type Benchmark = {
  s: string;
  t: number[];
  o: number[];
  h: number[];
  l: number[];
  c: number[];
  v: number[];
};

export type SimplePriceFeed = {
  symbol: string;
  description: string;
  base: string;
};

export type TimeRange = "1D" | "1M" | "3M" | "6M" | "1Y";

export interface CryptoState {
  currentSymbol: string;
  timeRange: TimeRange;
  currency: "USD" | "VND";
  priceFeeds: SimplePriceFeed[];
  chartData: Benchmark | null;
  isLoading: boolean;
  error: string | null;
  exchangeRate: number;
}
