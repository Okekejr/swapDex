import { getAlchemyNetwork } from "@/utils/alchemy";
import { ALCHEMY_KEY } from "@env";
import { useQuery } from "@tanstack/react-query";
import { Alchemy, AssetTransfersCategory } from "alchemy-sdk";
import { useAccount } from "wagmi";

export const useFetchTransactions = () => {
  const { chainId, address } = useAccount();
  const network = getAlchemyNetwork(chainId);

  const alchemyConfig = {
    apiKey: ALCHEMY_KEY,
    network: network,
  };

  const alchemy = new Alchemy(alchemyConfig);

  const fetchTransfers = async () => {
    const response = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      toAddress: address,
      category: [
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.INTERNAL,
        AssetTransfersCategory.SPECIALNFT,
      ],
    });
    return response.transfers;
  };

  return useQuery({
    queryKey: ["assetTransfers"],
    queryFn: fetchTransfers,
    staleTime: 3600000,
    refetchOnWindowFocus: false,
  });
};
