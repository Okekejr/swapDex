import { blurhash } from "@/constants/random";
import { Image } from "expo-image";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../customText";
import { originalAmount } from "@/utils";

interface QuoteDetailsT {
  logo: string;
  symbol: string;
  top?: boolean;
  amount: string;
  balance: string;
  decimal: string;
}

export const QuoteTopCard: FC<QuoteDetailsT> = ({
  logo,
  symbol,
  top,
  amount,
  balance,
  decimal,
}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: logo }}
          style={styles.iconImage}
          contentFit="cover"
          cachePolicy="disk"
          placeholder={{ blurhash }}
        />
      </View>
      <View style={styles.content}>
        {top ? (
          <CustomText style={styles.headerText}>
            {originalAmount(amount, decimal)} {symbol}
          </CustomText>
        ) : (
          <CustomText style={styles.headerText}>
            {amount} {symbol}
          </CustomText>
        )}

        {top && (
          <CustomText>
            Balance {balance} {symbol}
          </CustomText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 50 / 2,
    backgroundColor: "#9558FF33",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
