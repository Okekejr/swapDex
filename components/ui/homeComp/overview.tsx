import React, { FC } from "react";
import CustomText from "../customText";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { StyleSheet, View } from "react-native";
import { TransactionsCard } from "./transactions";

export const Overview: FC = () => {
  const { data, isError, isLoading } = useFetchTransactions();

  return (
    <View style={styles.container}>
      <CustomText style={styles.headerText}>Transaction History</CustomText>
      <View style={styles.transactions}>
        {data &&
          data.map((trans) => {
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
    gap: 10
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
});
