import { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { WalletComp } from "../ui/wallet/walletComp";
import { Ionicons } from "@expo/vector-icons";
import { BalanceValueType, SupportedToken } from "@/types";

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
}) => {
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
        handleMaxBtn={handleMaxBtn}
        contentStyles={{ borderBottomWidth: 0.5, borderBottomColor: "#fff" }}
      />
      <View style={styles.innerIcon}>
        <Ionicons name="swap-vertical" size={18} color="#000" />
      </View>
      <WalletComp
        headText="You Recieve"
        activeToken={toToken}
        toToken={activeToken}
        tokenList={tokenList}
        setActiveToken={setToToken}
        input={toInput}
        setInput={setToInput}
        contentStyles={{ borderTopWidth: 0.5, borderTopColor: "#fff" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
  },
  innerIcon: {
    marginVertical: -15,
    marginHorizontal: "auto",
    padding: 5,
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    borderRadius: 50 / 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
});
