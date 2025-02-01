import React, { FC } from "react";
import CustomText from "../customText";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TransactionsCard } from "./transactions";
import { AssetTransfersResult } from "alchemy-sdk";
import { useRouter } from "expo-router";

interface OverviewT {
  data: AssetTransfersResult[] | undefined;
  isError: boolean;
  isLoading: boolean;
}

export const Overview: FC<OverviewT> = ({ data, isError, isLoading }) => {
  const router = useRouter();
  const transList = data?.slice(0, 4);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomText style={styles.headerText}>Transaction History</CustomText>

        <TouchableOpacity
          style={styles.linkStyle}
          onPress={() => router.push("/transactions")}
        >
          <CustomText style={styles.subText}>See all</CustomText>
        </TouchableOpacity>
      </View>
      <View style={styles.transactions}>
        {transList &&
          transList.map((trans) => {
            return (
              <TransactionsCard
                key={trans.uniqueId}
                data={trans}
                isError={isError}
                isLoading={isLoading}
              />
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    gap: 10,
    marginTop: 20,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  transactions: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    paddingBottom: 70,
  },
  subText: {
    color: "#c7c7c7",
  },
  linkStyle: {
    borderBottomWidth: 1,
    borderColor: "#c7c7c7",
  },
});
