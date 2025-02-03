import { useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import { useAccount, useChains, useSwitchChain } from "wagmi";
import CustomText from "../ui/customText";
import { Ionicons } from "@expo/vector-icons";
import { ChainProperties } from "@/utils";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

export const NetworkMenu = () => {
  const chains = useChains();
  const { chain } = useAccount();
  const chainProps = ChainProperties(chain) || [];
  const { switchChain } = useSwitchChain();
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handlePickerToggle = () => {
    Haptics.selectionAsync();
    setIsPickerVisible((prev) => !prev);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePickerToggle}
        style={styles.pickerButton}
      >
        {chainProps[0]?.icon({})}

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
              <CustomText style={styles.headerText}>Select Network</CustomText>

              {chains.map((network) => {
                const chainProps = ChainProperties(network) || [];

                return (
                  <TouchableOpacity
                    key={network.id}
                    style={styles.pickerItem}
                    onPress={() => {
                      if (chain && chain.id !== network.id) {
                        Haptics.selectionAsync();
                        switchChain({ chainId: network.id });
                        setIsPickerVisible(false);
                      }
                    }}
                    disabled={chain && chain.id === network.id}
                  >
                    {chainProps[0].icon({})}

                    <CustomText style={styles.pickerItemText}>
                      {network.name.charAt(0).toUpperCase() +
                        network.name.slice(1)}
                    </CustomText>

                    {chain && chain.id === network.id ? (
                      <Ionicons
                        style={{ marginHorizontal: 5 }}
                        name="checkmark-circle"
                        size={20}
                        color="#24f07d"
                      />
                    ) : (
                      <View style={{ width: 15 }} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
});
