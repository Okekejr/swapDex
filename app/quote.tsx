import BackButton from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { QuoteBottomCard } from "@/components/ui/quote/bottomCard";
import { QuoteTopCard } from "@/components/ui/quote/topCard";
import GradientBackground from "@/components/ui/topGradient";
import { useSwapQuote } from "@/hooks/useSwapQuote";
import { approval } from "@/types";
import { getAllowance, getApprovalTransaction } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAccount } from "wagmi";

export default function QuoteScreen() {
  const {
    fromToken,
    toToken,
    toBalance,
    amount,
    balance,
    decimal,
    fromLogo,
    toLogo,
    fromSymbol,
    toSymbol,
  } = useLocalSearchParams();

  const { address, chainId } = useAccount();
  const [swapping, setSwapping] = useState(false);
  const [allowance, setAllowance] = useState<String | undefined>(undefined);
  const [approval, setApproval] = useState<approval | undefined>();

  const { data, isLoading, error, refetch } = useSwapQuote({
    fromToken: String(fromToken),
    toToken: String(toToken),
    amount: String(amount),
  });

  const handleSwapClick = async () => {
    setSwapping(true);

    try {
      const allowanceResponse = await getAllowance(
        String(fromToken),
        address,
        chainId
      );

      if (allowanceResponse !== undefined && allowanceResponse === "0") {
        const approval = await getApprovalTransaction(
          String(fromToken),
          String(amount),
          chainId
        );

        setApproval(approval);
      } else {
        console.log("Allowance is sufficient.");
      }
      setAllowance(allowanceResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setSwapping(false);
    }
  };

  console.log(allowance, approval);

  return (
    <>
      <GradientBackground>
        <View style={styles.topContainer}>
          <View style={styles.fixedButtonsContainer}>
            <BackButton />
            <CustomText style={styles.headerText}>Swap Details</CustomText>
          </View>

          <View style={styles.tokensContainer}>
            <QuoteTopCard
              top
              logo={String(fromLogo)}
              symbol={String(fromSymbol)}
              amount={String(amount)}
              decimal={String(decimal)}
              balance={String(balance)}
            />
            <View style={{ marginLeft: 5 }}>
              <Ionicons name="arrow-down" size={24} color="#000" />
            </View>
            <QuoteTopCard
              logo={String(toLogo)}
              symbol={String(toSymbol)}
              amount={String(toBalance)}
              decimal={String(decimal)}
              balance={String(balance)}
            />
          </View>
        </View>
      </GradientBackground>

      <QuoteBottomCard
        isLoading={isLoading}
        data={data}
        error={error}
        refetch={refetch}
      />

      <TouchableOpacity style={styles.swapContainer} onPress={handleSwapClick}>
        <GradientBackground styling={styles.backgroundStyling}>
          <View style={styles.swapButton}>
            <CustomText style={{ fontSize: 18, fontWeight: "bold" }}>
              Approve & Swap
            </CustomText>
            <Ionicons name="swap-horizontal" size={16} color="#000" />
          </View>
        </GradientBackground>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 70,
    paddingHorizontal: 15,
  },
  fixedButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#000" },
  tokensContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingVertical: 30,
  },
  swapContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 2,
  },
  swapButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#000",
    gap: 5,
  },
  backgroundStyling: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  submitButton: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 2,
  },
});
