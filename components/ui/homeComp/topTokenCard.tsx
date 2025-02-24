import { Image } from "expo-image";
import React, { FC } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "../customText";
import { AppName, blurhash } from "@/constants/random";
import { Tokens } from "@/types";
import { formattedPrice } from "@/utils";
import { Ionicons } from "@expo/vector-icons";

const CARD_WIDTH = 200;

interface TopTokenCardT {
  data: Tokens;
  link?: boolean;
}

export const TopTokenCard: FC<TopTokenCardT> = ({ data, link }) => {
  const { name, symbol, iconUrl, price, change, coinrankingUrl } = data;

  const negativeTrend = parseFloat(change) < 0;

  const handlePress = () => {
    link &&
      Alert.alert("Confirm", `Your are leaving ${AppName}`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Leave",
          style: "default",
          onPress: async () => {
            try {
              Linking.openURL(coinrankingUrl);
            } catch (error) {
              Alert.alert("Failed", (error as Error).message);
            }
          },
        },
      ]);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.cardContainer}>
        <View style={styles.innercontainer}>
          <View style={styles.topContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: iconUrl }}
                style={styles.iconImage}
                contentFit="cover"
                cachePolicy="disk"
                placeholder={{ blurhash }}
              />
            </View>

            <View style={styles.changeCont}>
              <CustomText
                style={[
                  styles.subText,
                  negativeTrend ? { color: "red" } : { color: "green" },
                ]}
              >
                {change}
              </CustomText>

              <View style={styles.iconContainer}>
                <Ionicons
                  name={negativeTrend ? "trending-down" : "trending-up"}
                  size={20}
                  color={negativeTrend ? "red" : "#24f07d"}
                />
              </View>
            </View>
          </View>
          <View style={styles.mainCont}>
            <CustomText style={styles.subText}>{symbol}</CustomText>
            <CustomText
              style={styles.text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </CustomText>
            <CustomText style={styles.headerText}>
              ${formattedPrice(price)}
            </CustomText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: 150,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#151515",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: "space-between",
  },
  innercontainer: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 50 / 2,
    backgroundColor: "#6B8AFF33",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  mainCont: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  subText: {
    color: "#c7c7c7",
  },
  changeCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
