import { News } from "@/types";
import { CCDATA_KEY } from "@env";
import { useQuery } from "@tanstack/react-query";

export const useFetchNews = (limit: string) => {
  const baseUrl = "https://data-api.cryptocompare.com";

  const fetchCryptoNews = async (): Promise<News> => {
    const response = await fetch(
      `${baseUrl}/news/v1/article/list?lang=EN&limit=${limit}`,
      {
        headers: {
          "x-access-token": CCDATA_KEY || "",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch news");

    return response.json();
  };

  return useQuery<News>({
    queryKey: ["cryptoNews", limit],
    queryFn: fetchCryptoNews,
    staleTime: 3600000, // Cache data for 1 hour
    refetchOnWindowFocus: false,
  });
};
