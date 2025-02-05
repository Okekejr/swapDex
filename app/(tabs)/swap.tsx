import { NetworkMenu } from "@/components/core/networkMenu";
import { Wallet } from "@/components/core/wallet";
import CustomText from "@/components/ui/customText";
import GradientBackground from "@/components/ui/topGradient";
import { useGetBalance } from "@/hooks/useGetBalance";
import { usePriceFeed } from "@/hooks/usePriceFeed";
import { useSupportTokens } from "@/hooks/useSupportTokens";
import { SupportedToken } from "@/types";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function SwapScreen() {
  const { tokenList } = useSupportTokens();
  const [activeToken, setActiveToken] = useState<SupportedToken | undefined>();
  const [toToken, setToToken] = useState<SupportedToken | undefined>();
  const [topInput, setTopInput] = useState<number | null>(null);
  const [toInput, setToInput] = useState<number | null>(null);

  const { loading: loadingBalance, balance } = useGetBalance({
    token: activeToken,
  });

  const { data: priceFeed } = usePriceFeed(
    activeToken?.rpcUrl ?? "",
    activeToken?.contractUrl ?? ""
  );

  const { data: toPriceFeed } = usePriceFeed(
    toToken?.rpcUrl ?? "",
    toToken?.contractUrl ?? ""
  );

  console.log(priceFeed, toPriceFeed);

  const priceTokenTwo = useCallback(() => {
    if (
      priceFeed &&
      priceFeed !== null &&
      toPriceFeed &&
      toPriceFeed !== null
    ) {
      const ratio = priceFeed / toPriceFeed;
      const finalOrder =
        topInput !== null ? parseFloat((topInput * ratio).toFixed(2)) : null;
      setToInput(finalOrder);
    } else {
      setToInput(null);
    }
  }, [priceFeed, toPriceFeed, topInput]);

  useEffect(() => {
    if (tokenList && tokenList.length > 0) {
      setActiveToken(tokenList[0]);
      setToToken(tokenList[1]);
    } else {
      return;
    }
  }, [tokenList]);

  useEffect(() => {
    priceTokenTwo();
  }, [priceTokenTwo]);

  const handleMaxBtn = () => {
    setTopInput(Number(balance));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <GradientBackground>
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
              loadingBalance={loadingBalance}
            />
          </View>
        </GradientBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 70,
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#000" },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingHorizontal: 15,
  },
});
