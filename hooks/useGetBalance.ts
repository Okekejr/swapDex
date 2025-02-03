import { SupportedToken } from "@/types";
import { useAccount, useBalance, useReadContract } from "wagmi";

interface getBalanceT {
  token: SupportedToken | undefined;
}

export const useGetBalance = ({ token }: getBalanceT) => {
  const { address } = useAccount();

  const { data: accBalance } = useBalance({
    address: address,
  });

  const { data: contractBalance } = useReadContract({
    abi: token?.abi,
    address: token?.address,
    functionName: "balanceOf",
    args: [address],
  });

  return { contractBalance, accBalance };
};
