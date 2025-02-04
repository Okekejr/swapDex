import { BalanceValueType, SupportedToken } from "@/types";
import { formatedBalance } from "@/utils";
import { useEffect, useState } from "react";
import { useAccount, useBalance, useReadContract } from "wagmi";

interface getBalanceT {
  token: SupportedToken | undefined;
}

export const useGetBalance = ({ token }: getBalanceT) => {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<BalanceValueType>("0.000");

  const { data: accBalance } = useBalance({
    address: address,
  });

  const { data: contractBalance } = useReadContract({
    abi: token?.abi,
    address: token?.address,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  useEffect(() => {
    const finalBalance = async () => {
      if (!token || !address) return;

      try {
        setLoading(true);

        if (token.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
          setBalance(formatedBalance(accBalance?.value));
        } else if (contractBalance !== undefined) {
          setBalance(formatedBalance(contractBalance as bigint));
        }
      } catch (error) {
        console.error("Error fetching contract balance:", error);
        setBalance("0.000");
      } finally {
        setLoading(false);
      }
    };

    finalBalance();
  }, [token, address, accBalance, contractBalance]);

  return { contractBalance, accBalance, balance, loading };
};
