import { StyleSheet, Dimensions, View, ScrollView } from "react-native";
import { useAccount } from "wagmi";
import React from "react";
import { Redirect } from "expo-router";
import { useBalances } from "@/hooks/useBalances";
import { useHomeFeed } from "@/hooks/useHomeFeed";
import { TopCardContainer } from "@/components/ui/homeComp/topCardContainer";
import { Overview } from "@/components/ui/homeComp/overview";
import { TopTokens } from "@/components/ui/homeComp/topTokens";

const { width } = Dimensions.get("window");
const SCREEN_PADDING = 12;
const Tabs = ["Overview", "WatchList"];
const TAB_WIDTH = (width - SCREEN_PADDING * 2) / Tabs.length;

export default function HomeScreen() {
  const { isConnected, address, chain } = useAccount();
  const { accBalance } = useBalances(address);

  const {
    handleSignout,
    chainProps,
    formattedBalance,
    isLoadingBalance,
    isLoadingPrice,
    TopTokensList,
    isError,
    isLoading,
    TransactionError,
    TransactionLoading,
    Transactions,
  } = useHomeFeed({
    chain: chain,
    accBalance: accBalance,
    TAB_WIDTH: TAB_WIDTH,
  });

  if (!isConnected) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.safeArea}>
      <TopCardContainer
        handleSignout={handleSignout}
        isLoadingBalance={isLoadingBalance}
        isLoadingPrice={isLoadingPrice}
        chainProps={chainProps}
        formattedBalance={formattedBalance}
        accBalance={accBalance}
        address={address}
      />

      <ScrollView>
        <TopTokens
          data={TopTokensList}
          isError={isError}
          isLoading={isLoading}
        />

        <Overview
          data={Transactions}
          isError={TransactionError}
          isLoading={TransactionLoading}
        />
      </ScrollView>
    </View>
  );
}

const TAB_CONTAINER_HEIGHT = 60;
const CAPSULE_HEIGHT = 40;
const BORDER_RADIUS = CAPSULE_HEIGHT / 2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 5,
    gap: 20,
  },
  header: {
    color: "#fff",
    fontSize: 15,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 12,
    paddingVertical: 10,
    height: TAB_CONTAINER_HEIGHT,
    position: "relative",
    overflow: "hidden",
    marginHorizontal: 5,
  },
  tab: {
    width: TAB_WIDTH,
    alignItems: "center",
    paddingVertical: 12,
    zIndex: 2,
  },
  tabText: {
    fontSize: 16,
    color: "#bbb",
    zIndex: 3,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  indicator: {
    position: "absolute",
    width: TAB_WIDTH * 0.8,
    height: 40,
    backgroundColor: "#000",
    borderRadius: BORDER_RADIUS,
    top: 10,
    left: (TAB_WIDTH * 0.2) / 2,
    zIndex: 1,
  },
  content: {
    paddingTop: 10,
    paddingBottom: 70,
  },
});
