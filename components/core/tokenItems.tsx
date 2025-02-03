import { SupportedToken } from "@/types";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import * as Haptics from "expo-haptics";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import CustomText from "../ui/customText";
import { blurhash } from "@/constants/random";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface TokenItemsT {
  activeToken?: SupportedToken | undefined;
  setActiveToken: Dispatch<SetStateAction<SupportedToken | undefined>>;
  toToken?: SupportedToken | undefined;
  tokenList: SupportedToken[] | undefined;
}

export const TokenItems: FC<TokenItemsT> = ({
  activeToken,
  setActiveToken,
  toToken,
  tokenList,
}) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handlePickerToggle = () => {
    Haptics.selectionAsync();
    setIsPickerVisible((prev) => !prev);
  };

  const handleActiveToken = (token: SupportedToken) => {
    if (
      toToken?.address !== token.address &&
      activeToken?.address !== token.address
    ) {
      setActiveToken(token);
      setIsPickerVisible(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePickerToggle}
        style={styles.pickerButton}
      >
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: activeToken?.logoURI }}
            style={styles.iconImage}
            contentFit="cover"
            cachePolicy="disk"
            placeholder={{ blurhash }}
          />
        </View>
        <CustomText>{activeToken?.symbol}</CustomText>

        <Ionicons
          name={isPickerVisible ? "chevron-up" : "chevron-down"}
          size={18}
          color="#000"
        />
      </TouchableOpacity>

      {/* Modal Component */}
      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handlePickerToggle}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={handlePickerToggle}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.feedContainer}>
              <CustomText style={styles.headerText}>Select Token</CustomText>

              {tokenList &&
                tokenList.map((token) => {
                  const isSelected =
                    token.address === activeToken?.address ||
                    token.address === toToken?.address;

                  return (
                    <TouchableOpacity
                      key={token.symbol}
                      style={styles.pickerItem}
                      onPress={() => handleActiveToken(token)}
                      disabled={isSelected}
                    >
                      <View style={styles.iconContainer}>
                        <Image
                          source={{ uri: token?.logoURI }}
                          style={styles.iconImage}
                          contentFit="cover"
                          cachePolicy="disk"
                          placeholder={{ blurhash }}
                        />
                      </View>

                      <CustomText style={styles.pickerItemText}>
                        {token.name.charAt(0).toUpperCase() +
                          token.name.slice(1)}
                      </CustomText>

                      {isSelected && (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#24f07d"
                          style={{ marginHorizontal: 5 }}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pickerButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 50 / 2,
    backgroundColor: "#9558FF33",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width,
    height: "auto",
    padding: 20,
    backgroundColor: "#151515",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  feedContainer: {
    marginTop: 10,
    marginBottom: 70,
    gap: 5,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  pickerItem: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  pickerItemText: {
    color: "#fff",
    fontSize: 20,
    display: "flex",
    flex: 1,
  },
});
