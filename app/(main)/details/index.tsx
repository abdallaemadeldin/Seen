import React, { useCallback } from "react";
import { Image, Linking, ScrollView, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toolbar from "@/components/toolbar";
import { ArticleType } from "@/types/home";
import { useLocalSearchParams } from "expo-router";

const DetailsPage: React.FC = () => {
  const { d } = useLocalSearchParams();
  const article: ArticleType = JSON.parse(d as string);
  const { t } = useTranslation();
  const { top, bottom } = useSafeAreaInsets();
  const { styles } = useStyles(stylesheet);

  const handleOpenUrl = useCallback(() => {
    Linking.openURL(article.url);
  }, []);

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <Toolbar title={article.title} withBack />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: article.urlToImage }} style={styles.image} />

        <Text style={styles.title}>{article.title}</Text>

        <Text style={styles.author}>
          By {article.author} |{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </Text>

        <Text style={styles.description}>{article.description}</Text>

        <Text style={styles.content}>{article.content}</Text>

        <Text style={styles.source}>Source: {article.source.name}</Text>

        <Text style={styles.link} onPress={handleOpenUrl}>
          Read more
        </Text>
      </ScrollView>
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

  scrollContainer: {
    padding: 16,
    backgroundColor: "#fff",
    minHeight: "95%",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  content: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    marginBottom: 16,
  },
  source: {
    fontSize: 12,
    color: "#777",
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    color: "#0066cc",
    textDecorationLine: "underline",
  },
}));

export default DetailsPage;
