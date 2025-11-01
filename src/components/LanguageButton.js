import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { useTheme } from "../providers/ThemeContext";
import { useTranslation } from "react-i18next";

import ptFlag from "../../assets/flag/flag-br.png";
import mexFlag from "../../assets/flag/flag-mex.png";

export default function LanguageButton({ topOffset = 88 }) {
  const { colors } = useTheme();
  const { i18n } = useTranslation();

  const mudarIdioma = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 600,
        delay: 150,
      }}
      style={[styles.langContainer, { top: topOffset }]}
    >
      <View>
        {i18n.language === "pt" && (
          <TouchableOpacity onPress={() => mudarIdioma("es")}>
            <Image
              source={ptFlag}
              style={[styles.flagIcon, { borderColor: colors.text }]}
            />
          </TouchableOpacity>
        )}

        {i18n.language === "es" && (
          <TouchableOpacity onPress={() => mudarIdioma("pt")}>
            <Image
              source={mexFlag}
              style={[styles.flagIcon, { borderColor: colors.text }]}
            />
          </TouchableOpacity>
        )}
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  langContainer: {
    position: "absolute",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
  },
  flagIcon: {
    width: 32,
    height: 22,
    borderRadius: 5,
  },
});