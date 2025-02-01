import { AssetTransfersResult } from "alchemy-sdk";
import { FC } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import CustomText from "../customText";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { blurhash } from "@/constants/random";
import { useFetchLogo } from "@/hooks/useFetchLogo";
import { EthereumIcon } from "@/components/icons/ethereumIcon";

interface TransactionsCardT {
  data: AssetTransfersResult | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const TransactionsCard: FC<TransactionsCardT> = ({
  data,
  isError,
  isLoading,
}) => {
  const { data: logoURl } = useFetchLogo(data?.rawContract.address);

  if (!data || isError) {
    return (
      <View style={styles.container}>
        <CustomText style={styles.headerText}>...no transactions</CustomText>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#24f07d" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Ionicons name="swap-horizontal-outline" size={24} color="#fff" />

        <View style={styles.iconContainer}>
          {data.asset === "ETH" ? (
            <EthereumIcon />
          ) : (
            <Image
              source={{ uri: logoURl }}
              style={styles.iconImage}
              contentFit="cover"
              cachePolicy="disk"
              placeholder={{ blurhash }}
            />
          )}
        </View>
        <View style={styles.mainCont}>
          <CustomText style={styles.text}>{data.asset}</CustomText>
          <CustomText style={styles.subText}>
            Category: {data.category}
          </CustomText>
        </View>
      </View>

      <View style={styles.mainCont}>
        <CustomText style={[styles.text, { textAlign: "right" }]}>
          {data.value?.toFixed(3)}
        </CustomText>
        <CustomText style={[styles.subText, { textAlign: "right" }]}>
          {data.asset}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#151515",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  innercontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  mainCont: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    color: "#c7c7c7",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconContainer: {
    width: 30, // Adjust size as needed
    height: 30,
    borderRadius: 50 / 2, // Circular shape
    backgroundColor: "#6B8AFF33", // Optional, in case the image doesn't fill the circle
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
