import Header from "@/components/header/header";
import CustomText from "@/components/ui/customText";
import { NewsCard } from "@/components/ui/news/newsCard";
import { useFetchNews } from "@/hooks/useFetchNews";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function NewsScreen() {
  const { data: LatestNews, isError, isLoading } = useFetchNews("10");

  if (!LatestNews || isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Header headerTitle="Top 100 Tokens" textStyles={{ color: "#fff" }} />
        <CustomText style={styles.headerText}>...no news available</CustomText>
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
      <Header headerTitle="Latest News" textStyles={{ color: "#fff" }} />

      <ScrollView contentContainerStyle={styles.newsContainer}>
        {LatestNews &&
          LatestNews.Data?.map((news) => {
            return <NewsCard key={news.ID} data={news} />;
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
  newsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginTop: 20,
    paddingBottom: 70,
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
});
