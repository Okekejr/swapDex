import { AppName, blurhash } from "@/constants/random";
import { Image } from "expo-image";
import {
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "../customText";
import { NewsEntity } from "@/types";
import { FC } from "react";
import { formatDate } from "@/utils";

const CARD_HEIGHT = 350;

interface NewsCardT {
  data: NewsEntity;
}

export const NewsCard: FC<NewsCardT> = ({ data }) => {
  const { TITLE, IMAGE_URL, BODY, PUBLISHED_ON, URL } = data;

  const handlePress = () => {
    Alert.alert("Confirm", `Your are leaving ${AppName}`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Leave",
        style: "default",
        onPress: async () => {
          try {
            Linking.openURL(URL);
          } catch (error) {
            Alert.alert("Failed", (error as Error).message);
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image
          source={{ uri: IMAGE_URL }}
          style={styles.imageStyle}
          contentFit="cover"
          cachePolicy="disk"
          placeholder={{ blurhash }}
        />

        <CustomText
          style={styles.headerText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {TITLE}
        </CustomText>
        <CustomText
          style={styles.subText}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {BODY}
        </CustomText>

        <CustomText style={styles.subText}>
          {formatDate(PUBLISHED_ON)}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
    height: CARD_HEIGHT,
    padding: 5,
  },
  imageStyle: {
    height: CARD_HEIGHT / 2,
    width: "100%",
    borderRadius: 12,
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  subText: {
    color: "#c7c7c7",
    marginBottom: 10,
  },
});
