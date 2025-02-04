import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "../customText";
import { quote } from "@/types";
import { FC } from "react";
import { Details } from "./details";
import { QueryObserverResult } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

interface bottomCardT {
  data: quote | undefined;
  isLoading: boolean;
  error: any;
  refetch: () => Promise<QueryObserverResult<quote, Error>>;
}

export const QuoteBottomCard: FC<bottomCardT> = ({
  data,
  isLoading,
  error,
  refetch,
}) => {
  if (!data) return;

  if (isLoading) {
    return (
      <View style={styles.outerContainer}>
        <CustomText style={styles.headerText}>Transaction Details</CustomText>
        <ActivityIndicator size="large" color="#24f07d" />;
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.outerContainer}>
        <CustomText style={styles.headerText}>Transaction Details</CustomText>
        <CustomText>Error fetching swap quote</CustomText>;
      </View>
    );
  }

  const { protocols, dstAmount, dstToken } = data;

  const protocolsName = protocols?.[0]?.[0]?.[0].name || "";
  const tradePercentage = protocols?.[0]?.[0]?.[0].part || "";
  const finalTradePercentage = `${tradePercentage} ${"%"}`;

  const estimatedReceive = Number(dstAmount) / 10 ** dstToken.decimals;
  const finalEstimate = `${estimatedReceive.toFixed(3)} ${dstToken.symbol}`;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <CustomText style={styles.headerText}>Transaction Details</CustomText>

        <TouchableOpacity style={styles.refetchContainer} onPress={refetch}>
          <CustomText style={{ color: "#000", textAlign: "center" }}>
            Refresh
          </CustomText>
          <Ionicons name="refresh-circle" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Details leftText="Protocol" rightText={protocolsName} />
        <Details
          leftText="Trade percentage"
          rightText={String(finalTradePercentage)}
        />
        <Details leftText="Estimated to Receive" rightText={finalEstimate} />
        <Details leftText="Gas Estimated" rightText={String(data.gas)} />
      </View>

      <View
        style={{ borderWidth: 0.3, borderColor: "#c7c7c7", marginVertical: 30 }}
      />

      <CustomText style={styles.subText}>
        These are estimated outputs from the quote. Get new estimates by
        clicking on the{" "}
        <Text style={{ fontWeight: "bold", color: "#fff" }}>
          Refresh button
        </Text>
        .
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  subText: {
    lineHeight: 30,
    fontSize: 18,
    color: "#c7c7c7",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 30,
  },
  refetchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#24f07d",
    borderRadius: 18,
  },
});
