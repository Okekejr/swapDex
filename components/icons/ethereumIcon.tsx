import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { blurhash } from "@/constants/random";

export const EthereumIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={require("../../assets/cyptoImgs/eth-logo.png")}
        style={styles.iconImage}
        contentFit="cover"
        cachePolicy="disk"
        placeholder={{ blurhash }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 30, // Adjust size as needed
    height: 30,
    borderRadius: 50 / 2, // Circular shape
    backgroundColor: "#6B8AFF33", // Optional, in case the image doesn't fill the circle
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image covers the circular area
  },
});
