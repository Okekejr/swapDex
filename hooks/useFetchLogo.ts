import { getAlchemyNetwork } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Alchemy, AssetTransfersResult } from "alchemy-sdk";
import { useAccount } from "wagmi";

type ContractAddress = NonNullable<
  AssetTransfersResult["rawContract"]
>["address"];

export const useFetchLogo = (Address: ContractAddress | null | undefined) => {
  const { chainId } = useAccount();
  const network = getAlchemyNetwork(chainId);

  const alchemyConfig = {
    apiKey: process.env.EXPO_PUBLIC_ALCHEMY_KEY,
    network: network,
  };

  const alchemy = new Alchemy(alchemyConfig);

  const fetchLogos = async () => {
    if (!Address) return null;

    const response = await alchemy.core.getTokenMetadata(Address);

    return response.logo || null;
  };

  return useQuery({
    queryKey: ["assetLogos", Address],
    queryFn: fetchLogos,
    enabled: !!Address,
    staleTime: 3600000,
    refetchOnWindowFocus: false,
  });
};
