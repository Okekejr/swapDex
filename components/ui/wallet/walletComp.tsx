import {
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
  handleMaxBtn?: () => void;
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
  handleMaxBtn,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.outerContainer, contentStyles]}>
        <View style={styles.topContainer}>
          <CustomText>{headText}</CustomText>
          <View style={styles.maxContainer}>
            {topToken && (
              <TouchableOpacity style={styles.maxButton} onPress={handleMaxBtn}>
                <CustomText>Max</CustomText>
              </TouchableOpacity>
            )}

            {topToken && <CustomText>Balance {balance} ETH</CustomText>}
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
  },
  inputStyles: {
    fontSize: 30,
    width: "50%",
    textAlign: "right",
  },
});
