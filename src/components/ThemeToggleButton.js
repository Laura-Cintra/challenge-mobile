import { StyleSheet, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { MotiView } from "moti";
import { useTheme } from "../providers/ThemeContext";

export default function ThemeToggleButton({ topOffset = 105 }) {
  const { toggleTheme, colors, theme } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 500,
        delay: 150,
      }}
      style={[styles.container, { top: topOffset }]}
    >
      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Feather
          name={theme === "light" ? "moon" : "sun"}
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 15,
  },
  button: {
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});