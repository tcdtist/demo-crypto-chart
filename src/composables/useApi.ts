import type { Benchmark, SimplePriceFeed } from "~/types/api";

const BASE_URL = `https://benchmarks.pyth.network/v1`;

export function useApi() {
  const getBenchmarkData = async (
    ticker = "BTC/USD",
    duration = 30
  ): Promise<Benchmark> => {
    const now = Date.now() / 1000;
    const startTime = now - duration * 24 * 60 * 60;
    const searchParams = new URLSearchParams({
      symbol: `Crypto.${ticker}`,
      resolution: "60",
      from: startTime.toFixed(0),
      to: now.toFixed(0),
    });

    const url = `${BASE_URL}/shims/tradingview/history?${searchParams.toString()}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };

  const getPriceFeedsData = async (): Promise<SimplePriceFeed[]> => {
    const url = `${BASE_URL}/price_feeds/?asset_type=crypto`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.map((priceFeed: any) => ({
      symbol: priceFeed.attributes.symbol.replace("Crypto.", ""),
      description: priceFeed.attributes.description,
      base: priceFeed.attributes.base,
    }));
  };

  return {
    getBenchmarkData,
    getPriceFeedsData,
  };
}
