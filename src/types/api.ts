export type Benchmark = {
  s: string; // symbol
  t: number[]; // timestamps
  o: number[]; // open prices
  h: number[]; // high prices
  l: number[]; // low prices
  c: number[]; // closing prices
  v: number[]; // volumes
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
  priceFeeds: SimplePriceFeed[]; // Should be properly typed
  chartData: Benchmark | null;
  isLoading: boolean;
  error: string | null;
  exchangeRate: number;
}
