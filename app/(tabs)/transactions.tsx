import Header from "@/components/header/header";
import CustomText from "@/components/ui/customText";
import { TransactionsCard } from "@/components/ui/homeComp/transactions";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { ExplorerUrl } from "@/utils";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useAccount } from "wagmi";

export default function TransactionsScreen() {
  const {
    data: Transactions,
    isError: TransactionError,
    isLoading: TransactionLoading,
  } = useFetchTransactions();

  const { chain, address } = useAccount();

  const handlePress = () => {
    Linking.openURL(ExplorerUrl({ chain: chain, address: address }));
  };

  const transactionList = Transactions?.slice(0, 9);

  return (
    <SafeAreaView style={styles.container}>
      <Header headerTitle="Transactions" textStyles={{ color: "#fff" }} />

      <ScrollView contentContainerStyle={styles.transactions}>
        {transactionList &&
          transactionList.map((trans) => {
            return (
              <TransactionsCard
                key={trans.uniqueId}
                data={trans}
                isError={TransactionError}
                isLoading={TransactionLoading}
              />
            );
          })}

        <TouchableOpacity style={styles.linkText} onPress={handlePress}>
          <CustomText style={styles.headerText}>View full history</CustomText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  transactions: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    paddingBottom: 70,
  },
  linkText: {
    display: "flex",
    alignItems: "center",
    marginVertical: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#24f07d",
    textDecorationLine: "underline",
  },
});
