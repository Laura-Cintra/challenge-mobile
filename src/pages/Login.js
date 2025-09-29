import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import LoginForm from "../components/UserForm/LoginForm";
import ThemeToggleButton from "../components/ThemeToggleButton";

export default function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LoginForm />
        <ThemeToggleButton topOffset={335} />
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