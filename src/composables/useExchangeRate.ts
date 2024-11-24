const EXCHANGE_API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

export function useExchangeRate() {
  const rate = ref(23500); // Default fallback rate
  const isLoading = ref(false);

  const fetchRate = async () => {
    try {
      isLoading.value = true;
      const response = await fetch(EXCHANGE_API_URL);
      const data = await response.json();
      rate.value = data.rates.VND;
    } catch (error) {
      console.error("Failed to fetch exchange rate:", error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchRate();
  });

  return {
    rate,
    isLoading,
    fetchRate,
  };
}
