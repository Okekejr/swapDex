import { quote } from "@/types";
import { INCH_KEY } from "@env";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

const API_KEY = INCH_KEY;
const BASE_URL = "https://api.1inch.dev/swap/v6.0";

interface SwapQuoteProps {
  fromToken: string;
  toToken: string;
  amount: string;
}

export const useSwapQuote = ({
  fromToken,
  toToken,
  amount,
}: SwapQuoteProps) => {
  const { chainId } = useAccount();

  return useQuery<quote>({
    queryKey: ["swapQuote", chainId, fromToken, toToken, amount],
    queryFn: async () => {
      const url = `${BASE_URL}/${chainId}/quote?src=${fromToken}&dst=${toToken}&amount=${amount}&includeTokensInfo=true&includeProtocols=true&includeGas=true`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch swap quote");
      }

      return response.json();
    },
    staleTime: 3600000, // Cache for 1 hour
    refetchOnWindowFocus: false,
  });
};
