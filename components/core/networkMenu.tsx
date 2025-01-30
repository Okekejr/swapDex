import { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useAccount, useChains, useSwitchChain } from "wagmi";
import CustomText from "../ui/customText";
import { Ionicons } from "@expo/vector-icons";
import { ChainProperties } from "@/utils";

export const NetworkMenu = () => {
  const chains = useChains();
  const { chain } = useAccount();
  const chainProps = ChainProperties(chain) || [];
  const { switchChain } = useSwitchChain();
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handlePickerToggle = () => {
    setIsPickerVisible((prev) => !prev);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePickerToggle}
        style={styles.pickerButton}
      >
        {chainProps[0]?.icon?.()}

        <Ionicons
          name={isPickerVisible ? "chevron-up" : "chevron-down"}
          size={18}
          color="#000"
        />
      </TouchableOpacity>

      {isPickerVisible && (
        <View style={styles.pickerList}>
          {chains.map((network) => {
            const chainProps = ChainProperties(network) || [];

            return (
              <TouchableOpacity
                key={network.id}
                style={styles.pickerItem}
                onPress={() => {
                  if (chain && chain.id !== network.id) {
                    switchChain({ chainId: network.id });
                    setIsPickerVisible(false);
                  }
                }}
                disabled={chain && chain.id === network.id}
              >
                {chainProps[0]?.icon?.()}

                <CustomText style={styles.pickerItemText}>
                  {network.name.charAt(0).toUpperCase() + network.name.slice(1)}
                </CustomText>

                {chain && chain.id === network.id ? (
                  <Ionicons
                    style={{ marginHorizontal: 5 }}
                    name="ellipse"
                    size={15}
                    color="#24f07d"
                  />
                ) : (
                  <View style={{ width: 15 }} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerItem: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  pickerItemText: {
    color: "#fff",
    fontSize: 16,
  },
  pickerList: {
    position: "absolute",
    top: 35,
    right: -5,
    borderWidth: 1,
    borderColor: "#24f07d",
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 200,
    zIndex: 2,
  },
});
