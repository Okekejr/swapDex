import BackButton from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { QuoteBottomCard } from "@/components/ui/quote/bottomCard";
import { QuoteTopCard } from "@/components/ui/quote/topCard";
import GradientBackground from "@/components/ui/topGradient";
import { TransactionStatus } from "@/components/ui/transactionStatus/status";
import { useSwapQuote } from "@/hooks/useSwapQuote";
import { approval, swapTx } from "@/types";
import {
  delayAPICall,
  getAllowance,
  getApprovalTransaction,
  getSwapTransaction,
} from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Address, parseEther } from "viem";
import { useAccount, useSendTransaction } from "wagmi";

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

  const router = useRouter();
  const { address, chainId, chain } = useAccount();
  const [slippage, setSlippage] = useState<number>(1);
  const [approving, setApproving] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [allowance, setAllowance] = useState<String | undefined>(undefined);
  const [approval, setApproval] = useState<approval | undefined>();
  const [swapTx, setSwapTx] = useState<swapTx | undefined>();
  const [swapApiError, setSwapApiError] = useState<any>();

  const { data, isLoading, error, refetch } = useSwapQuote({
    fromToken: String(fromToken),
    toToken: String(toToken),
    amount: String(amount),
  });

  const {
    sendTransaction,
    data: transactionHash,
    isSuccess,
    isPending,
    isError,
    error: transactionError,
  } = useSendTransaction();

  const handleSwapClick = async () => {
    setSwapping(true);
    setApproving(true);

    try {
      const allowanceResponse = await getAllowance(
        String(fromToken),
        address,
        chainId
      );
      console.log("Allowance Response:", allowanceResponse);
      setAllowance(allowanceResponse);

      if (allowanceResponse !== undefined && allowanceResponse === "0") {
        console.log("Allowance is 0, requesting approval...");
        setApproving(true);

        const approvalData = await getApprovalTransaction(
          String(fromToken),
          String(amount),
          chainId
        );
        console.log("Approval Transaction Data:", approvalData);

        if (approvalData) {
          sendTransaction({
            account: address as Address,
            to: approvalData.to as Address,
            data: approvalData.data as `0x${string}`,
            value: parseEther(approvalData.value),
          });

          console.log(transactionHash);
        }

        setApproval(approvalData);
      } else {
        console.log("Allowance is sufficient.");
      }

      if (allowanceResponse !== undefined && allowanceResponse !== "0") {
        console.log("Proceeding with swap...");

        await delayAPICall(6000);

        const swapData = await getSwapTransaction({
          chainId: chainId,
          fromToken: String(fromToken),
          toToken: String(toToken),
          amount: String(amount),
          address: address,
          slippage: String(slippage),
        });

        console.log("Swap Transaction Data:", swapData);

        // Step 5: Send swap transaction
        if (swapData) {
          sendTransaction({
            account: address as Address,
            to: swapData.tx.to as Address,
            data: swapData.tx.data as `0x${string}`,
            value: parseEther(swapData.tx.value),
          });

          console.log("Swap transaction sent:", transactionHash);
          setSwapTx(swapData);
        }
      }
    } catch (error) {
      console.error(error);
      setSwapApiError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setSwapping(false);
      setApproving(false);
    }
  };

  const handleRedirect = () => {
    router.push({
      pathname: "/swap",
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
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

        {!transactionHash ? (
          <QuoteBottomCard
            isLoading={isLoading}
            data={data}
            error={error}
            refetch={refetch}
            slippage={slippage}
            setSlippage={setSlippage}
            swapApiError={swapApiError}
          />
        ) : (
          <TransactionStatus
            transactionError={transactionError}
            transactionHash={transactionHash}
            isError={isError}
            isPending={isPending}
            isSuccess={isSuccess}
            chain={chain}
          />
        )}

        {!transactionHash ? (
          <TouchableOpacity
            style={styles.swapContainer}
            onPress={handleSwapClick}
          >
            <GradientBackground styling={styles.backgroundStyling}>
              <View style={styles.swapButton}>
                <CustomText style={{ fontSize: 18, fontWeight: "bold" }}>
                  {swapping
                    ? "Processing..."
                    : approving
                    ? "Approving..."
                    : "Swap"}
                </CustomText>
                <Ionicons name="swap-horizontal" size={16} color="#000" />
              </View>
            </GradientBackground>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.swapContainer}
            onPress={handleRedirect}
          >
            <GradientBackground styling={styles.backgroundStyling}>
              <View style={styles.swapButton}>
                <CustomText style={{ fontSize: 18, fontWeight: "bold" }}>
                  Finish
                </CustomText>
                <Ionicons name="swap-horizontal" size={16} color="#000" />
              </View>
            </GradientBackground>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
