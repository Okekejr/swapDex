import { SupportedToken } from "@/types";
import { supportedTokens1, supportedTokens2 } from "@/utils";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useSupportTokens = () => {
  const [tokenList, setTokenList] = useState<SupportedToken[] | undefined>();
  const { chainId } = useAccount();

  useEffect(() => {
    if (!chainId) return;

    if (chainId === 1) {
      setTokenList(supportedTokens1);
    } else {
      setTokenList(supportedTokens2);
    }
  }, [chainId]);

  return { tokenList };
};
