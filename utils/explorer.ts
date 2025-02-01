import { Address, Chain } from "viem";

interface ExplorT {
  chain: Chain | undefined;
  address: Address | undefined;
}

export const ExplorerUrl = ({ chain, address }: ExplorT) => {
  const url = chain && chain.blockExplorers?.default.url;
  const expUrl = `${url}/address/${address}`;

  return expUrl;
};
