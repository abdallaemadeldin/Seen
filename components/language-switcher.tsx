import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, Text, I18nManager } from "react-native";
import { useTranslation } from "react-i18next";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import RNRestart from "react-native-restart";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { languages } from "@/constants/Languages";

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const { styles } = useStyles(stylesheet);

  useEffect(() => {
    const getLanguage = async () => {
      const lang = (await AsyncStorage.getItem("lang")) ?? "en";
      setSelectedLanguage(lang);
      i18n.changeLanguage(lang);
    };

    getLanguage();
  }, []);

  const otherLanguage = useMemo(
    () => languages.find((lang) => !selectedLanguage?.includes(lang.value)),
    [selectedLanguage]
  );

  const handleLanguageChange = useCallback(async () => {
    await AsyncStorage.setItem("lang", otherLanguage?.value as string);
    alert(selectedLanguage);
    I18nManager.forceRTL(selectedLanguage === "ar");

    if (otherLanguage) {
      setSelectedLanguage(otherLanguage.value);
      i18n.changeLanguage(otherLanguage.value);
      RNRestart.restart();
    }
  }, [selectedLanguage, otherLanguage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.flagButton}
        onPress={handleLanguageChange}
      >
        {otherLanguage && (
          <>
            <Text style={styles.languageText}>{otherLanguage.label}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const stylesheet = createStyleSheet((theme: any) => ({
  container: {
    width: "auto",
  },
  flagButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    marginLeft: theme.spacing.sm,
    fontSize: 16,
    color: theme.colors.text,
  },
}));

export default LanguageDropdown;
