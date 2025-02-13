import { approval, swapTx } from "@/types";
import { Address } from "viem";

const BASE_URL = "https://api.1inch.dev/swap/v6.0";

// Function to get the allowance
export async function getAllowance(
  tokenAddress: string,
  walletAddress: Address | undefined,
  chainId: number | undefined
): Promise<string | undefined> {
  try {
    const response = await fetch(
      `${BASE_URL}/${chainId}/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_INCH_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch allowance");
    }

    const data = await response.json();
    return data.allowance;
  } catch (error) {
    console.error(error);
    throw new Error("Allowance fetch failed");
  }
}

// Function to get the approval transaction details
export const getApprovalTransaction = async (
  tokenAddress: string,
  amount: string,
  chainId: number | undefined
): Promise<approval | undefined> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${chainId}/approve/transaction?tokenAddress=${tokenAddress}&amount=${amount}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_INCH_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch approval transaction");
    }

    const data = await response.json();
    return data; // Return approval data
  } catch (error) {
    console.error(error);
    throw new Error("Approval transaction fetch failed");
  }
};

export const getSwapTransaction = async ({
  chainId,
  fromToken,
  toToken,
  amount,
  address,
  slippage = "1",
}: {
  chainId: number | undefined;
  fromToken: string;
  toToken: string;
  amount: string;
  address: Address | undefined;
  slippage: string;
}): Promise<swapTx | undefined> => {
  const url = `${BASE_URL}/${chainId}/swap?src=${fromToken}&dst=${toToken}&amount=${amount}&from=${address}&origin=${address}&slippage=${slippage}`;
  console.log("Fetching swap transaction from:", url);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_INCH_KEY}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text(); // Log error response body
      console.error("Error response from API:", errorBody);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching swap transaction:", error);
  }
};
