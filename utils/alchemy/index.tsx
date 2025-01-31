import { Network } from "alchemy-sdk";

// Function to get the correct network
export const getAlchemyNetwork = (chainId?: number): Network => {
  switch (chainId) {
    case 1:
      return Network.ETH_MAINNET;
    case 137:
      return Network.MATIC_MAINNET;
    default:
      return Network.ETH_MAINNET;
  }
};
