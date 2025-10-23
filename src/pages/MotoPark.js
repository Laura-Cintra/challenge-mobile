import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import PatioZonas from "../components/PatioMoto/PatioZonas";
import MenuSuperior from "../components/MenuSuperior";
import ThemeToggleButton from "../components/ThemeToggleButton";
import LanguageButton from "../components/LanguageButton";

export default function NovaMoto() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MenuSuperior />
        <PatioZonas />
        <ThemeToggleButton />
        <LanguageButton />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
});