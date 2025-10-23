import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import MenuSuperior from "../components/MenuSuperior";
import Dashboard from "../components/DashHome/Dashboard";
import ThemeToggleButton from "../components/ThemeToggleButton";
import LanguageButton from "../components/LanguageButton";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MenuSuperior />
        <Dashboard />
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