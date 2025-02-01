import Header from "@/components/header/header";
import { SafeAreaView, StyleSheet } from "react-native";

export default function TokenScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerTitle="Tokens"
        userName="Emmanuel Okeke"
        textStyles={{ color: "#fff" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
});
