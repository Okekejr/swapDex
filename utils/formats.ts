import { formatEther } from "viem";
import { type UseBalanceReturnType } from "wagmi";

type BalanceValueType = NonNullable<UseBalanceReturnType["data"]>["value"];

// format the value from wagmi balance to number e.g bigint to number
export const formatedBalance = (ActBalance: BalanceValueType | undefined) => {
  if (!ActBalance) return "0.00000";

  return parseFloat(formatEther(ActBalance)).toFixed(5);
};

// format and multiply the balance and price from feed
interface balanceProps {
  balance: string | 0n | undefined;
  priceFeedValue: number | undefined;
}

export const formatUsdBalance = ({ balance, priceFeedValue }: balanceProps) => {
  if (!balance || !priceFeedValue) return "0";

  // Convert balance to a float (handling BigInt and string cases)
  const balanceNumber =
    typeof balance === "bigint" ? Number(balance) : parseFloat(balance);

  return (balanceNumber * priceFeedValue).toFixed(2);
};
