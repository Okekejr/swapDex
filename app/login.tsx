import CustomText from "@/components/ui/customText";
import { ConnectButton } from "@reown/appkit-wagmi-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAccount } from "wagmi";
import { Redirect } from "expo-router";

export default function LoginScreen() {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <Redirect href="/" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <CustomText style={styles.headerText}>Log in to SwapDex</CustomText>

          <ConnectButton
            label="Connect to a Wallet"
            loadingLabel="Connecting"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontFamily: "HostGrotesk-Medium",
    marginBottom: 30,
    fontSize: 20,
    color: "#fff",
  },
});
