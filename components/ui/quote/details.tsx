import { StyleSheet, View, Linking, TouchableOpacity } from "react-native";
import CustomText from "../customText";
import { FC } from "react";

interface Details {
  leftText: string;
  rightText: string;
  url?: string;
}

export const Details: FC<Details> = ({ leftText, rightText, url }) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.leftText}>{leftText}</CustomText>

      {url ? (
        <TouchableOpacity
          style={styles.linkStyle}
          onPress={() => Linking.openURL(url)}
        >
          <CustomText style={styles.rightText}>{rightText}</CustomText>
        </TouchableOpacity>
      ) : (
        <CustomText style={styles.rightText}>{rightText}</CustomText>
      )}
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
  linkStyle: {
    borderBottomWidth: 1,
    borderColor: "#c7c7c7",
  },
});
