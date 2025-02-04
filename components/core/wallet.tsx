import { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { WalletComp } from "../ui/wallet/walletComp";
import { Ionicons } from "@expo/vector-icons";
import { BalanceValueType, SupportedToken } from "@/types";
import CustomText from "../ui/customText";
import { useRouter } from "expo-router";

interface WalletT {
  activeToken: SupportedToken | undefined;
  toToken: SupportedToken | undefined;
  tokenList: SupportedToken[] | undefined;
  setActiveToken: Dispatch<SetStateAction<SupportedToken | undefined>>;
  setToToken: Dispatch<SetStateAction<SupportedToken | undefined>>;
  topInput: number | null;
  toInput: number | null;
  setTopInput: React.Dispatch<React.SetStateAction<number | null>>;
  setToInput: React.Dispatch<React.SetStateAction<number | null>>;
  balance: BalanceValueType;
  handleMaxBtn: () => void;
  loadingBalance: boolean;
}

export const Wallet: FC<WalletT> = ({
  activeToken,
  toToken,
  tokenList,
  setActiveToken,
  setToToken,
  topInput,
  toInput,
  setToInput,
  setTopInput,
  balance,
  handleMaxBtn,
  loadingBalance,
}) => {
  const router = useRouter();

  const handleSwapClick = () => {
    if (!activeToken || !toToken || !topInput || !balance || !toInput) return;

    router.push({
      pathname: "/quote",
      params: {
        fromToken: activeToken.address,
        toToken: toToken.address,
        balance: balance,
        toBalance: toInput,
        amount: (topInput * 10 ** activeToken.decimals).toString(),
        decimal: activeToken.decimals,
        fromLogo: activeToken.logoURI,
        toLogo: toToken.logoURI,
        fromSymbol: activeToken.symbol,
        toSymbol: toToken.symbol,
      },
    });
  };

  return (
    <View style={styles.outerContainer}>
      <WalletComp
        headText="You Pay"
        activeToken={activeToken}
        toToken={toToken}
        topToken
        tokenList={tokenList}
        setActiveToken={setActiveToken}
        input={topInput}
        setInput={setTopInput}
        balance={balance}
        loadingBalance={loadingBalance}
        contentStyles={{
          borderBottomWidth: 0.5,
          borderBottomColor: "#fff",
          borderRadius: 60,
        }}
      />
      <View style={styles.innerIcon}>
        <Ionicons name="swap-vertical" size={24} color="#000" />
      </View>
      <WalletComp
        headText="You Receive"
        activeToken={toToken}
        toToken={activeToken}
        tokenList={tokenList}
        setActiveToken={setToToken}
        input={toInput}
        setInput={setToInput}
        contentStyles={{ borderBottomWidth: 1, borderColor: "#000" }}
      />
      <View style={styles.maxButton}>
        <TouchableOpacity onPress={handleMaxBtn}>
          <CustomText>MAX</CustomText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.swapButton}
        disabled={
          !balance ||
          !topInput ||
          isNaN(Number(balance)) ||
          Number(balance) < topInput
        }
        onPress={handleSwapClick}
      >
        <CustomText style={{ fontSize: 18, fontWeight: "bold" }}>
          Swap
        </CustomText>
        <Ionicons name="swap-horizontal" size={16} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
  },
  innerIcon: {
    marginVertical: -20,
    marginHorizontal: "auto",
    padding: 5,
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
    borderRadius: 50 / 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  maxButton: {
    marginVertical: -15,
    marginHorizontal: "auto",
    padding: 5,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    width: 80,
    height: 30,
    borderRadius: 30 / 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
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
});
