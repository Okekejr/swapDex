import Header from "@/components/header/header";
import { SafeAreaView, StyleSheet } from "react-native";

export default function SwapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header headerTitle="Swap" textStyles={{ color: "#fff" }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
});
