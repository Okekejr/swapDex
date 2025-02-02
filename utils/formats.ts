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

const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formattedPrice = (
  priceFeed: number | string | undefined | null
) => {
  if (!priceFeed) return "0";

  const numericValue =
    typeof priceFeed === "string" ? parseFloat(priceFeed) : priceFeed;

  // Handle invalid numeric conversion (NaN case)
  if (isNaN(numericValue)) return "0";

  return formatter.format(numericValue);
};

export const formatUsdBalance = ({ balance, priceFeedValue }: balanceProps) => {
  if (!balance || !priceFeedValue) return "0";

  // Convert balance to a float (handling BigInt and string cases)
  const balanceNumber =
    typeof balance === "bigint" ? Number(balance) : parseFloat(balance);

  return formattedPrice(balanceNumber * priceFeedValue);
};

// formate timestamp
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};
