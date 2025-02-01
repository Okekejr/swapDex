import { useEffect, useRef, useState } from "react";
import { Alert, Animated } from "react-native";
import * as Haptics from "expo-haptics";
import { usePriceFeed } from "./usePriceFeed";
import {
  ChainProperties,
  ChainProps,
  formatedBalance,
  formatUsdBalance,
} from "@/utils";
import { Chain } from "viem";
import { useDisconnect } from "wagmi";
import { useFetchTokens } from "./useFetchTokens";

interface HomeFeedT {
  chain: Chain | undefined;
  accBalance:
    | {
        decimals: number;
        formatted: string;
        symbol: string;
        value: bigint;
      }
    | undefined;
  TAB_WIDTH: number;
}

export const useHomeFeed = ({ chain, accBalance, TAB_WIDTH }: HomeFeedT) => {
  const [chainProps, setChainProps] = useState<ChainProps[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const { disconnect } = useDisconnect();
  const { data: TopTokensList, isError, isLoading } = useFetchTokens("5");

  // fetching price of eth using price feed hook
  const { data: priceFeed } = usePriceFeed(
    chainProps.length > 0 ? chainProps[0].rpcKey : "",
    chainProps.length > 0 ? chainProps[0].rpcContract : ""
  );

  useEffect(() => {
    const chainProps = ChainProperties(chain) || [];
    setChainProps(chainProps);
  }, [chain]);

  const isLoadingBalance = !accBalance?.value;
  const isLoadingPrice = !priceFeed;
  const formattedBalance =
    isLoadingBalance || isLoadingPrice
      ? "Loading..."
      : formatUsdBalance({
          balance: formatedBalance(accBalance?.value),
          priceFeedValue: priceFeed,
        });

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    Haptics.selectionAsync();

    // Animate indicator to the clicked tab
    Animated.timing(indicatorPosition, {
      toValue: index * TAB_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleSignout = async () => {
    Alert.alert("Confirm", `You are signing out, Are you sure?`, [
      { text: "Cancel", style: "cancel" }, // Cancel action
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            disconnect();
          } catch (error) {
            Alert.alert("Sign Out Failed", (error as Error).message);
          }
        },
      },
    ]);
  };

  const openModal = () => {
    Haptics.selectionAsync();
    setModalVisible((prev) => !prev);
  };

  return {
    activeTab,
    modalVisible,
    formattedBalance,
    priceFeed,
    chainProps,
    isLoadingBalance,
    isLoadingPrice,
    indicatorPosition,
    TopTokensList,
    isError,
    isLoading,
    openModal,
    handleTabPress,
    handleSignout,
  };
};
