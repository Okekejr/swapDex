import Header from "@/components/header/header";
import CustomText from "@/components/ui/customText";
import { TopTokenCard } from "@/components/ui/homeComp/topTokenCard";
import SortButton from "@/components/ui/tokens/sortButtons";
import { useFetchTokens } from "@/hooks/useFetchTokens";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type SortbyT = "marketCap" | "price" | "24hVolume" | "change";

export default function TokenScreen() {
  const { data: TokensList, isError, isLoading } = useFetchTokens("100");

  const [sortBy, setSortBy] = useState<SortbyT>("marketCap");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortChange = (sortOption: SortbyT) => {
    setSortBy(sortOption);
  };

  // Filter & Sorting logic
  const filteredTokens = [...(TokensList?.data.coins || [])]
    .filter(
      (token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "marketCap":
          return parseFloat(b.marketCap) - parseFloat(a.marketCap);
        case "price":
          return parseFloat(b.price) - parseFloat(a.price);
        case "24hVolume":
          return parseFloat(b["24hVolume"]) - parseFloat(a["24hVolume"]);
        case "change":
          return parseFloat(b.change) - parseFloat(a.change);
        default:
          return 0;
      }
    });

  if (!TokensList || isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Header headerTitle="Top 100 Tokens" textStyles={{ color: "#fff" }} />
        <CustomText style={styles.headerText}>
          ...no Tokens available
        </CustomText>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#24f07d" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header headerTitle="Top 100 Tokens" textStyles={{ color: "#fff" }} />

      {/* Search Bar */}
      <View style={styles.searchInputContainer}>
        <Ionicons
          name="search-outline"
          size={17}
          color="#c7c7c7"
          style={styles.eyeIcon}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search Token by Name or Symbol"
          placeholderTextColor="#c7c7c7"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        {searchQuery && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={17} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Sort Buttons */}
      <View style={styles.sortButtonsContainer}>
        <SortButton
          title="Market Cap"
          isSelected={sortBy === "marketCap"}
          onPress={() => handleSortChange("marketCap")}
        />
        <SortButton
          title="Price"
          isSelected={sortBy === "price"}
          onPress={() => handleSortChange("price")}
        />
        <SortButton
          title="24h Volume"
          isSelected={sortBy === "24hVolume"}
          onPress={() => handleSortChange("24hVolume")}
        />
        <SortButton
          title="Change"
          isSelected={sortBy === "change"}
          onPress={() => handleSortChange("change")}
        />
      </View>

      <ScrollView contentContainerStyle={styles.tokenContainer}>
        {filteredTokens.map((token) => {
          return <TopTokenCard key={token.rank} data={token} link={true} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  tokenContainer: {
    flexDirection: "row",
    marginVertical: 10,
    paddingBottom: 70,
    flexWrap: "wrap",
    gap: 6,
  },
  sortButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginVertical: 10,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
    padding: 10,
    backgroundColor: "#151515",
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
  },
  eyeIcon: {
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
  },
});
