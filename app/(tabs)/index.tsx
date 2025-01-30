import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useAccount, useDisconnect } from "wagmi";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import Header from "@/components/header/header";
import CustomText from "@/components/ui/customText";
import { useBalances } from "@/hooks/useBalances";
import {
  ChainProperties,
  ChainProps,
  formatedBalance,
  formatUsdBalance,
} from "@/utils";
import { usePriceFeed } from "@/hooks/usePriceFeed";
import { NetworkMenu } from "@/components/core/networkMenu";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function HomeScreen() {
  const { isConnected, address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { accBalance } = useBalances(address);
  const [chainProps, setChainProps] = useState<ChainProps[]>([]);

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

  if (!isConnected) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.safeArea}>
      <View style={styles.cardContainer}>
        <View style={styles.topContainer}>
          <Header showProfileImage userName="Emmanuel Okeke" image="yes">
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <NetworkMenu />
              <TouchableOpacity onPress={() => disconnect()}>
                <Ionicons name="log-out-outline" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          </Header>
          <View style={{ gap: 10 }}>
            <CustomText style={{ fontSize: 15 }}>
              Your {chainProps.length > 0 ? chainProps[0].name : "Crypto"}{" "}
              Balance
            </CustomText>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <CustomText style={{ fontSize: 45, fontWeight: "bold" }}>
                {isLoadingBalance || isLoadingPrice ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  `$${formattedBalance}`
                )}
              </CustomText>

              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  padding: 2,
                  paddingHorizontal: 4,
                  backgroundColor: "#c7c7c7",
                  zIndex: -1,
                }}
              >
                <CustomText>
                  {formatedBalance(accBalance?.value)}{" "}
                  {chainProps.length > 0 ? chainProps[0].name : "ETH"}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.innerContainer}>
        {isConnected && (
          <>
            <Text style={styles.header}>Hello there, im connected</Text>
            <Text style={styles.header}>{address}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 5,
  },
  header: {
    color: "#fff",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 25,
  },
  cardContainer: {
    backgroundColor: "#24f07d",
    borderRadius: 45,
    position: "relative",
    zIndex: 3,
    width: "100%",
    height: height / 4.1,
  },
  topContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 70,
    paddingHorizontal: 25,
  },
});
