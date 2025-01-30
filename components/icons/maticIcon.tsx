import React, { FC } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Image, ImageStyle } from "expo-image";
import { blurhash } from "@/constants/random";
import { StylingIcon } from "@/utils";

export const MaticIcon: FC<StylingIcon> = ({ containerStyle, imageStyle }) => {
  return (
    <View style={[styles.iconContainer, containerStyle]}>
      <Image
        source={require("../../assets/cyptoImgs/matic-logo.png")}
        style={[styles.iconImage, imageStyle]}
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
    backgroundColor: "#9558FF33", // Optional, in case the image doesn't fill the circle
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
