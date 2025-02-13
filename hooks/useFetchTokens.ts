import { TokensResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchTokens = (limit: string) => {
  const CoinRankingURL = "https://api.coinranking.com/v2/coins";

  const fetchCoins = async (): Promise<TokensResponse> => {
    const response = await fetch(`${CoinRankingURL}?limit=${limit}`, {
      headers: {
        "x-access-token": process.env.EXPO_PUBLIC_COINRANKING_KEY || "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch coins");
    }

    return response.json();
  };

  return useQuery<TokensResponse>({
    queryKey: ["tokens", limit],
    queryFn: fetchCoins,
    staleTime: 3600000, // Cache data for 1 hour
    refetchOnWindowFocus: false,
  });
};
