import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "@/components/language-switcher";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Toolbar: React.FC<{ title?: string; withBack?: boolean }> = ({
  title,
  withBack = false,
}) => {
  const { t } = useTranslation();
  const { back } = useRouter();
  const { top } = useSafeAreaInsets();
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.toolbar}>
      {withBack ? (
        <TouchableOpacity onPress={back}>
          <Text style={{ color: "#fff" }}>{t("common.back")}</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <Text
        style={[styles.toolbarTitle, { fontSize: withBack ? 16 : 18 }]}
        numberOfLines={1}
      >
        {title ?? t("header.title")}
      </Text>
      {withBack ? <></> : <LanguageDropdown />}
    </View>
  );
};

const stylesheet = createStyleSheet((theme: any) => ({
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
    maxWidth: "90%",
  },
}));

export default Toolbar;
