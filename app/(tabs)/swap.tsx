import { NetworkMenu } from "@/components/core/networkMenu";
import { Wallet } from "@/components/core/wallet";
import CustomText from "@/components/ui/customText";
import GradientBackground from "@/components/ui/topGradient";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useSupportTokens } from "@/hooks/useSupportTokens";
import { BalanceValueType, SupportedToken } from "@/types";
import { formatedBalance } from "@/utils";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function SwapScreen() {
  const { tokenList } = useSupportTokens();
  const [activeToken, setActiveToken] = useState<SupportedToken | undefined>();
  const [toToken, setToToken] = useState<SupportedToken | undefined>();
  const [topInput, setTopInput] = useState<number | null>(null);
  const [toInput, setToInput] = useState<number | null>(null);
  const [balance, setBalance] = useState<BalanceValueType>();
  const { accBalance, contractBalance } = useGetBalance({ token: activeToken });

  useEffect(() => {
    if (tokenList && tokenList.length > 0) {
      setActiveToken(tokenList[0]);
      setToToken(tokenList[1]);
    } else {
      return;
    }
  }, [tokenList]);

  useEffect(() => {
    if (activeToken?.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      setBalance(formatedBalance(accBalance?.value));
    } else {
      setBalance(formatedBalance(contractBalance as bigint));
    }
  }, [activeToken, balance, accBalance]);

  const handleMaxBtn = () => {
    setTopInput(Number(balance));
  };

  return (
    <GradientBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.topContainer}>
          <View style={styles.innerContainer}>
            <CustomText style={styles.headerText}>Swap</CustomText>
            <NetworkMenu />
          </View>
          <Wallet
            activeToken={activeToken}
            toToken={toToken}
            tokenList={tokenList}
            setActiveToken={setActiveToken}
            setToToken={setToToken}
            topInput={topInput}
            toInput={toInput}
            setToInput={setToInput}
            setTopInput={setTopInput}
            balance={balance}
            handleMaxBtn={handleMaxBtn}
          />
        </View>
      </TouchableWithoutFeedback>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  topContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 70,
    paddingHorizontal: 25,
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#000" },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
