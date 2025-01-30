import "@walletconnect/react-native-compat";
import { mainnet, polygon } from "@wagmi/core/chains";
import { defaultWagmiConfig } from "@reown/appkit-wagmi-react-native";
import { REOWN_ID } from "@env";

// 1. Get projectId at https://cloud.reown.com
export const projectId = REOWN_ID;

// 2. Create config
const metadata = {
  name: "SwapDex",
  description: "SwapDex UI",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [mainnet, polygon] as const;

export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
