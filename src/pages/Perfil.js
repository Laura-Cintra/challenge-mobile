import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import MenuSuperior from "../components/MenuSuperior";
import ProfileInfo from "../components/Perfil/ProfileInfo";
import ThemeToggleButton from "../components/ThemeToggleButton";
import LanguageButton from "../components/LanguageButton";

export default function Perfil() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MenuSuperior />
        <ProfileInfo />
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