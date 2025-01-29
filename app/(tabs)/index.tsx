import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { AppKitButton } from "@reown/appkit-wagmi-react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text>Testing 101</Text>
        <AppKitButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {},
});
