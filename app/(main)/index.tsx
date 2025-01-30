import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toolbar from "@/components/toolbar";
import { fetchNews } from "@/services/controllers/home";
import { ArticleType } from "@/types/home";
import ArticleCard from "@/components/news-card";

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { t } = useTranslation();
  const { top, bottom } = useSafeAreaInsets();
  const { styles } = useStyles(stylesheet);

  const fetchContent = useCallback(() => {
    setLoading(true);
    setError(undefined);
    fetchNews({
      params: {
        country: "us",
        apiKey: "97815c3a12ad4fe495624e475fa77ff1",
        category: "sport",
      },
    })
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        setError(
          error?.response?.error ??
            error?.response?.data?.message ??
            error?.response?.data?.error ??
            "Failed to load the news."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchContent();
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: ArticleType; index: number }) => {
      return <ArticleCard article={item} key={index} />;
    },
    []
  );

  const content = useMemo(() => {
    if (loading) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "85%",
          }}
        >
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>{t("common.loading")}</Text>
        </View>
      );
    } else if (error != null) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.button} onPress={fetchContent}>
            <Text style={styles.buttonText}>{t("common.retry")}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={() => (
            <Text style={{ alignSelf: "center", marginTop: 20 }}>
              {t("news.empty")}
            </Text>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      );
    }
  }, [loading, error, articles, renderItem]);

  return (
    <View style={{ ...styles.container, paddingBottom: bottom }}>
      <Toolbar />

      {content}
    </View>
  );
};

const stylesheet = createStyleSheet((theme: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    paddingTop: top + theme.spacing.md,
  },
  toolbarTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: theme.colors.text,
    fontSize: 14,
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.sm,
    borderRadius: 5,
    marginBottom: theme.spacing.sm,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#0002",
    marginVertical: theme.spacing.md,
  },
  loadingText: {
    color: theme.colors.text,
    fontSize: 14,
    textAlign: "center",
  },
  buttonText: {
    color: theme.colors.card,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: "50%",
    alignSelf: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default HomePage;
