import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../../providers/ThemeContext";

export default function FormInput({
  label,
  value,
  onChangeText,
  icon,
  ...props
}) {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={[styles.inputContainer, { borderColor: colors.border }]}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.placeholder}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 15,
  },
});