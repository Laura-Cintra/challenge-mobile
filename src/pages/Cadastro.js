import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import CadastroForm from "../components/UserForm/CadForm";
import ThemeToggleButton from "../components/ThemeToggleButton";
import LanguageButton from "../components/LanguageButton";

export default function Cadastro() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CadastroForm />
        <ThemeToggleButton topOffset={235} />
        <LanguageButton topOffset={219} />
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