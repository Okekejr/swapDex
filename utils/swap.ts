import { INCH_KEY } from "@env";
import { Address } from "viem";

const BASE_URL = "https://api.1inch.dev/swap/v6.0";

// Function to get the allowance
export async function getAllowance(
  tokenAddress: string,
  walletAddress: Address | undefined,
  chainId: number | undefined
) {
  try {
    const response = await fetch(
      `${BASE_URL}/${chainId}/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`,
      {
        headers: {
          Authorization: `Bearer ${INCH_KEY}`,
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
export async function getApprovalTransaction(
  tokenAddress: string,
  amount: string,
  chainId: number | undefined
) {
  try {
    const response = await fetch(
      `${BASE_URL}/${chainId}/approve/transaction?tokenAddress=${tokenAddress}&amount=${amount}`,
      {
        headers: {
          Authorization: `Bearer ${INCH_KEY}`,
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
}
