import { Address } from "viem";
import { useBalance } from "wagmi";

export const useBalances = (address: Address | undefined) => {
  const { data: accBalance } = useBalance({
    address: address,
  });

  return { accBalance };
};
