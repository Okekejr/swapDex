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

export const delayAPICall = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const HashLink = (
  chain: Chain | undefined,
  hash: `0x${string}` | undefined
) => {
  const url = chain && chain.blockExplorers?.default.url;
  const expUrl = `${url}/tx/${hash}`;

  return expUrl;
};
