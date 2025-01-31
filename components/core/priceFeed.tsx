import { usePriceFeed } from "@/hooks/usePriceFeed";
import { ChainProps } from "@/utils";
import CustomText from "../ui/customText";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PriceFeedProps extends ChainProps {
  subText?: string;
  containerStyle?: ViewStyle;
  modal?: boolean;
  modalType?: boolean;
}

export const PriceFeed = ({
  rpcContract,
  rpcKey,
  icon,
  name,
  subText,
  containerStyle,
  modal,
  modalType,
}: PriceFeedProps) => {
  const { data: priceFeed } = usePriceFeed(rpcKey, rpcContract);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.innercontainer}>
        {icon({ containerStyle: { width: 40, height: 40 } })}
        <View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <CustomText style={styles.textFix}>{name}</CustomText>

          {subText && (
            <CustomText style={{ color: "#c7c7c7" }}>{subText}</CustomText>
          )}
        </View>
      </View>

      <View style={styles.modalContainer}>
        <CustomText style={styles.textFix}>${priceFeed?.toFixed(2)}</CustomText>

        {modal && (
          <Ionicons
            name={modalType ? "chevron-up" : "chevron-down"}
            size={12}
            color="#fff"
          />
        )}
      </View>
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
  innercontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modalContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  textFix: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
