import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import CustomText from "../customText";
import { Dispatch, FC, SetStateAction } from "react";
import { BalanceValueType, SupportedToken } from "@/types";
import { TokenItems } from "@/components/core/tokenItems";

interface WalletProps {
  balance?: BalanceValueType;
  tokenList: SupportedToken[] | undefined;
  activeToken?: SupportedToken | undefined;
  toToken?: SupportedToken | undefined;
  headText: string;
  contentStyles?: ViewStyle;
  setActiveToken: Dispatch<SetStateAction<SupportedToken | undefined>>;
  topToken?: boolean;
  input: number | null;
  setInput: React.Dispatch<React.SetStateAction<number | null>>;
  loadingBalance?: boolean;
}

export const WalletComp: FC<WalletProps> = ({
  balance,
  tokenList,
  activeToken,
  toToken,
  headText,
  contentStyles,
  setActiveToken,
  topToken,
  input,
  setInput,
  loadingBalance,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.outerContainer, contentStyles]}>
        <View style={styles.topContainer}>
          <CustomText>{headText}</CustomText>
          <View style={styles.maxContainer}>
            {topToken && (
              <TouchableOpacity
                style={styles.maxButton}
                onPress={() => setInput(null)}
              >
                <CustomText>Clear</CustomText>
              </TouchableOpacity>
            )}

            {loadingBalance ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              topToken && (
                <CustomText>
                  Balance {balance} {activeToken?.symbol}
                </CustomText>
              )
            )}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TokenItems
            activeToken={activeToken}
            toToken={toToken}
            tokenList={tokenList}
            setActiveToken={setActiveToken}
          />
          <TextInput
            placeholder="0.00"
            placeholderTextColor="#000"
            keyboardType="numeric"
            style={styles.inputStyles}
            value={input !== null ? String(input) : ""}
            onChangeText={(text) => setInput(text ? Number(text) : null)}
            readOnly={!topToken}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingVertical: 30,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  maxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
  maxButton: {
    borderRadius: 22,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    zIndex: -1,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  inputStyles: {
    fontSize: 40,
    fontWeight: "bold",
    width: "55%",
    textAlign: "right",
  },
});
