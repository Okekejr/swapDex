import { NetworkMenu } from "@/components/core/networkMenu";
import Header from "@/components/header/header";
import { FC } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import CustomText from "../customText";
import { ChainProps, formatedBalance } from "@/utils";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

interface TopCardContainerT {
  handleSignout: () => Promise<void>;
  chainProps: ChainProps[];
  isLoadingBalance: boolean;
  isLoadingPrice: boolean;
  formattedBalance: string;
  accBalance:
    | {
        decimals: number;
        formatted: string;
        symbol: string;
        value: bigint;
      }
    | undefined;
}

export const TopCardContainer: FC<TopCardContainerT> = ({
  handleSignout,
  chainProps,
  isLoadingBalance,
  isLoadingPrice,
  formattedBalance,
  accBalance,
}) => {
  return (
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
            Your {chainProps.length > 0 ? chainProps[0].name : "Crypto"} Balance
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

            <View style={styles.rawBalance}>
              <CustomText>
                {formatedBalance(accBalance?.value)}{" "}
                {chainProps.length > 0 ? chainProps[0].name : "ETH"}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  rawBalance: {
    borderRadius: 22,
    padding: 2,
    paddingHorizontal: 4,
    backgroundColor: "#20D873",
    zIndex: -1,
  },
});
