import { TouchableOpacity, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "../providers/ThemeContext";

export default function ThemeToggleButton() {
  const { toggleTheme, colors, theme } = useTheme();

  return (
    <TouchableOpacity style={styles.button} onPress={toggleTheme}>
      <Feather
        name={theme === "light" ? "moon" : "sun"}
        size={24}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 105,
    right: 15,
  }
});