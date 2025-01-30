import { USDETH } from "@/components/config/Eth";
import { MaticIcon } from "../components/icons/maticIcon";
import { RPC_URL_ETH_KEY, RPC_URL_POLYGON_KEY } from "@/constants/RpcURL";
import { Chain } from "viem";
import { EthereumIcon } from "@/components/icons/ethereumIcon";
import { USDMATIC } from "@/components/config/Polygon";

export type ChainProps = {
  icon: () => React.JSX.Element;
  name: string;
  rpcKey: string;
  rpcContract: string;
};

export const ChainProperties = (chain: Chain | undefined) => {
  if (!chain) return;

  if (chain.id === 1) {
    return [
      {
        icon: EthereumIcon,
        name: chain.nativeCurrency.symbol,
        rpcKey: RPC_URL_ETH_KEY,
        rpcContract: USDETH,
      },
    ];
  } else if (chain.id === 137) {
    return [
      {
        icon: MaticIcon,
        name: chain.nativeCurrency.symbol,
        rpcKey: RPC_URL_POLYGON_KEY,
        rpcContract: USDMATIC,
      },
    ];
  } else {
    return;
  }
};
