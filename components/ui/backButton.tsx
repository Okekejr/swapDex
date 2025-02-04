import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useRouter } from "expo-router";
import CustomText from "./customText";

interface BackButtonProps {
  func?: (event: GestureResponderEvent) => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

const BackButton = ({
  func,
  icon = "chevron-back-outline",
}: BackButtonProps) => {
  const router = useRouter();

  const handlePress = (event: GestureResponderEvent) => {
    if (func) {
      func(event);
    } else {
      router.back();
    }
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.backButton}>
      <Ionicons name={icon} size={20} color="#000" />
      <CustomText style={styles.headerText}>Back</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    gap: 7,
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#000" },
});

export default BackButton;
