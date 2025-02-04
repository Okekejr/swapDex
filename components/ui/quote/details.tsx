import { StyleSheet, View } from "react-native";
import CustomText from "../customText";
import { FC } from "react";

interface Details {
  leftText: string;
  rightText: string;
}

export const Details: FC<Details> = ({ leftText, rightText }) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.leftText}>{leftText}</CustomText>
      <CustomText style={styles.rightText}>{rightText}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  leftText: {
    fontSize: 18,
    color: "#c7c7c7",
  },
  rightText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
