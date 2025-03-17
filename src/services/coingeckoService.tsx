export const fetchCoinList = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
    if (!response.ok) throw new Error("Failed to fetch coin list");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
