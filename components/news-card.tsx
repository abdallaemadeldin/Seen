import { Link } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { ArticleType } from "@/types/home";

const ArticleCard = ({ article }: { article: ArticleType }) => {
  const { author, description, publishedAt, title, urlToImage } = article;
  const { styles } = useStyles(stylesheet);

  return (
    <Link href={`/details?d=${encodeURIComponent(JSON.stringify(article))}`}>
      <TouchableOpacity style={styles.card} disabled>
        <Image source={{ uri: urlToImage }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.publishedAt}>
            {new Date(publishedAt).toLocaleDateString()}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const stylesheet = createStyleSheet((theme: any) => ({
  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.md,
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
    padding: theme.spacing.sm,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  author: {
    fontSize: 14,
    color: theme.colors.card,
    marginTop: 5,
  },
  publishedAt: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
}));

export default ArticleCard;
