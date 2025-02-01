import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "../customText";
import { TopTokenCard } from "./topTokenCard";
import { TokensResponse } from "@/types";
import { FC } from "react";
import { useRouter } from "expo-router";

interface TopTokens {
  data: TokensResponse | undefined;
  isError: boolean;
  isLoading: boolean;
}

export const TopTokens: FC<TopTokens> = ({ data, isError, isLoading }) => {
  const router = useRouter();

  if (!data || isError) {
    return (
      <View style={styles.Container}>
        <CustomText style={styles.headerText}>...no tokens</CustomText>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#24f07d" />
      </View>
    );
  }

  return (
    <View style={styles.Container}>
      <View style={styles.headerContainer}>
        <CustomText style={styles.headerText}>Popular Tokens</CustomText>

        <TouchableOpacity
          style={styles.linkStyle}
          onPress={() => router.push("/tokens")}
        >
          <CustomText style={styles.subText}>See all</CustomText>
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal contentContainerStyle={styles.tokenContainer}>
        {data?.data.coins.map((token) => {
          return <TopTokenCard key={token.rank} data={token} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  tokenContainer: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    color: "#c7c7c7",
  },
  linkStyle: {
    borderBottomWidth: 1,
    borderColor: "#c7c7c7",
  },
});
