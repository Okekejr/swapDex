import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";

interface PriceFeedProps {
  rpcUrl: string;
  address: string;
}

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

async function fetchPriceFeed({
  rpcUrl,
  address,
}: PriceFeedProps): Promise<number> {
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const priceFeed = new ethers.Contract(
      address,
      aggregatorV3InterfaceABI,
      provider
    );

    const roundData = await priceFeed.latestRoundData();
    const decimals = await priceFeed.decimals();

    // Convert BigInt to a string first, then to a float
    const price =
      parseFloat(roundData.answer.toString()) / 10 ** Number(decimals);

    return parseFloat(price.toFixed(5));
  } catch (error) {
    console.error("Error fetching price feed:", error);
    throw new Error("Failed to fetch price feed");
  }
}

// React Query Hook for fetching Chainlink price feeds
export function usePriceFeed(rpcUrl: string, address: string) {
  return useQuery({
    queryKey: ["priceFeed", address], // Caches data based on address
    queryFn: () => fetchPriceFeed({ rpcUrl, address }),
    // staleTime: 60000, // Cache data for 60 seconds
    // refetchInterval: 30000, // Auto-refetch every 30 seconds
    staleTime: 3600000, // Cache data for 1 hour (3,600,000 ms)
    refetchOnWindowFocus: false, // Disable refetch when the window refocuses
  });
}
