import Header from "@/components/header/header";
import { FC } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import CustomText from "../customText";
import { Chain, SendTransactionErrorType } from "viem";
import { Details } from "../quote/details";
import { HashLink } from "@/utils";

interface TransactionHashT {
  transactionHash: `0x${string}` | undefined;
  isSuccess: boolean;
  isPending: boolean;
  isError: boolean;
  transactionError: SendTransactionErrorType | null;
  chain: Chain | undefined;
}

export const TransactionStatus: FC<TransactionHashT> = ({
  transactionHash,
  isError,
  isPending,
  isSuccess,
  transactionError,
  chain,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerTitle="Transactions Status"
        textStyles={{ color: "#fff" }}
      />

      <View style={styles.innerContainer}>
        <View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {isPending && (
            <CustomText style={styles.status}>
              Transaction is Pending...
            </CustomText>
          )}
          {isSuccess && (
            <CustomText style={styles.status}>
              Transaction Successful!
            </CustomText>
          )}
          {isError && transactionError && (
            <CustomText style={[styles.status, styles.error]}>
              Transaction Failed: {transactionError.message}
            </CustomText>
          )}
        </View>
      </View>

      {transactionHash && (
        <View style={styles.hashContainer}>
          <Details
            leftText="View transaction:"
            rightText="Click here"
            url={HashLink(chain, transactionHash)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 30,
  },
  hashContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  status: {
    fontSize: 18,
  },
  error: {
    color: "red",
  },
});
