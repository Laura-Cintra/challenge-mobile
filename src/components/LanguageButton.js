import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useTheme } from "../providers/ThemeContext";
import { useTranslation } from "react-i18next";

import ptFlag from "../../assets/flag/flag-br.png";
import mexFlag from "../../assets/flag/flag-mex.png";

export default function LanguageButton() {
  const { colors } = useTheme();
  const { i18n } = useTranslation();

  // Função para mudar o idioma
  const mudarIdioma = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.langContainer}>
      {i18n.language === "pt" && (
        <TouchableOpacity onPress={() => mudarIdioma("es")}>
          <Image
            source={mexFlag}
            style={[styles.flagIcon, { borderColor: colors.text }]}
          />
        </TouchableOpacity>
      )}

      {i18n.language === "es" && (
        <TouchableOpacity onPress={() => mudarIdioma("pt")}>
          <Image
            source={ptFlag}
            style={[styles.flagIcon, { borderColor: colors.text }]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  langContainer: {
    position: "absolute",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    top: 88
  },
  flagIcon: {
    width: 32,
    height: 22,
    borderRadius: 5,
  },
});