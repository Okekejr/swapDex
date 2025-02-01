import React from "react";
import { Image } from "expo-image";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";
import CustomText from "../ui/customText";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { getTimeOfDay, TruncateAddress } from "@/utils";
import { blurhash } from "@/constants/random";
import { Address } from "viem";

interface HeaderProps {
  children?: React.ReactNode;
  headerTitle?: string;
  showProfileImage?: boolean;
  address?: Address | undefined;
  textStyles?: StyleProp<TextStyle>;
}

const Header: React.FC<HeaderProps> = ({
  children,
  headerTitle,
  showProfileImage,
  address,
  textStyles,
}) => {
  const nameOfIcon = getTimeOfDay();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            Haptics.selectionAsync();
          }}
        >
          {showProfileImage && (
            <View style={styles.contentContainer}>
              <View style={[styles.profileContainer, { borderColor: "#fff" }]}>
                <Image
                  style={styles.profileImage}
                  contentFit="cover"
                  cachePolicy="disk"
                  placeholder={{ blurhash }}
                />
              </View>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <View style={[styles.contentContainer, { gap: 2 }]}>
                  <CustomText
                    style={{
                      color: "#000",
                      fontSize: 14,
                    }}
                  >
                    Hello
                  </CustomText>
                  <Ionicons name={nameOfIcon} size={17} color="#000" />
                </View>
                <CustomText
                  style={[styles.initials, { color: "#000", fontSize: 16 }]}
                >
                  {address ? TruncateAddress(4, address) : "?"}
                </CustomText>
              </View>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.childrenContainer}>{children}</View>
      </View>
      {headerTitle && (
        <CustomText style={[styles.headerTitle, textStyles]}>
          {headerTitle}
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingVertical: 5,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: "#c4c4c4",
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "HostGrotesk-Medium",
  },
  childrenContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "HostGrotesk-Medium",
    color: "#fff",
  },
});

export default Header;
