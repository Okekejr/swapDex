import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { useAccount, useDisconnect } from "wagmi";
import React, { useEffect, useRef, useState } from "react";
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
import * as Haptics from "expo-haptics";
import { PriceFeed } from "@/components/core/priceFeed";
import { EthereumIcon } from "@/components/icons/ethereumIcon";
import { USDETH, USDTUSDETH } from "@/components/config/Eth";
import { RPC_URL_ETH_KEY, RPC_URL_POLYGON_KEY } from "@/constants/RpcURL";
import { USDMATIC, USDTUSDMATIC } from "@/components/config/Polygon";
import { MaticIcon } from "@/components/icons/maticIcon";
import { UsdtIcon } from "@/components/icons/usdtIcon";

const { height, width } = Dimensions.get("window");
const SCREEN_PADDING = 12;
const Tabs = ["Overview", "WatchList"];
const TAB_WIDTH = (width - SCREEN_PADDING * 2) / Tabs.length;

export default function HomeScreen() {
  const { isConnected, address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { accBalance } = useBalances(address);
  const [chainProps, setChainProps] = useState<ChainProps[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const indicatorPosition = useRef(new Animated.Value(0)).current;

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
              <TouchableOpacity
                onPress={() => {
                  Haptics.selectionAsync();
                  handleSignout();
                }}
              >
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
      <View style={styles.middleContainer}>
        {isConnected && (
          <>
            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              {chain?.id === 1 ? (
                <>
                  <PriceFeed
                    name="Eth"
                    icon={EthereumIcon}
                    rpcContract={USDETH}
                    rpcKey={RPC_URL_ETH_KEY}
                  />
                </>
              ) : (
                <>
                  <PriceFeed
                    name="POL"
                    icon={MaticIcon}
                    rpcContract={USDMATIC}
                    rpcKey={RPC_URL_POLYGON_KEY}
                  />
                </>
              )}
            </View>
          </>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {/* Animated Bubble Indicator (Behind the Text) */}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [{ translateX: indicatorPosition }],
            },
          ]}
        />

        {Tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleTabPress(index)}
            style={styles.tab}
          >
            <CustomText
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {tab}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const TAB_CONTAINER_HEIGHT = 50; // Height of the tab container
const CAPSULE_HEIGHT = 40; // Height of the indicator/capsule
const BORDER_RADIUS = CAPSULE_HEIGHT / 2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 5,
  },
  header: {
    color: "#fff",
    fontSize: 15,
  },
  middleContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 25,
    position: "relative",
    zIndex: 3,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginBottom: 10,
    gap: 10,
  },
  cardContainer: {
    backgroundColor: "#24f07d",
    borderRadius: 45,
    position: "relative",
    zIndex: 3,
    width: "100%",
    height: height / 4.1,
    marginBottom: 10,
  },
  topContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 70,
    paddingHorizontal: 25,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#333", // Lighter gray for the tab bar
    borderRadius: BORDER_RADIUS,
    paddingVertical: 5,
    height: TAB_CONTAINER_HEIGHT,
    position: "relative",
    overflow: "hidden",
  },
  tab: {
    width: TAB_WIDTH,
    alignItems: "center",
    paddingVertical: 12,
    zIndex: 2,
  },
  tabText: {
    fontSize: 16,
    color: "#bbb", // Inactive tab text color
    zIndex: 3, // Ensures text stays on top
  },
  activeTabText: {
    color: "#fff", // Active tab text color
    fontWeight: "bold",
  },
  indicator: {
    position: "absolute",
    width: TAB_WIDTH * 0.8,
    height: 40,
    backgroundColor: "#000",
    borderRadius: BORDER_RADIUS,
    top: 5,
    left: (TAB_WIDTH * 0.2) / 2,
    zIndex: 1,
  },
});
