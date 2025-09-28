import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useTheme } from "../../providers/ThemeContext";

export default function RegistroCampo({
  label = "Placa",
  isFeminine = true,
  valor,
  setValor,
  erro,
  loading,
  placeholder,
  onProsseguir,
  permiteSemPlaca = false,
  semPlaca,
  setSemPlaca,
}) {
  const { colors } = useTheme();

  // Se a moto não tiver placa, o rótulo passa a ser "Chassi"
  const displayLabel = semPlaca ? "Chassi" : label;
  const displayIsFeminine = semPlaca ? false : isFeminine;

  const labelCapitalized =
    displayLabel.charAt(0).toUpperCase() + displayLabel.slice(1).toLowerCase();
  const article = displayIsFeminine ? "a" : "o";

  return (
    <View style={[styles.container, { backgroundColor: colors.white, shadowColor: colors.text }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {loading
          ? `Identificando ${labelCapitalized}...`
          : erro
          ? `Erro ao ler ${article} ${displayLabel.toLowerCase()}, insira abaixo:`
          : valor
          ? `${labelCapitalized} ${
              displayIsFeminine ? "identificada" : "identificado"
            }:`
          : `Identificando ${labelCapitalized}...`}
      </Text>

      {loading && <ActivityIndicator size="large" color={colors.primary} />}

      {!loading && valor && !erro && (
        <Text style={[styles.success, { color: colors.primary }]}>✓ {valor}</Text>
      )}

      {erro && (
        <>
          {permiteSemPlaca && (
            <View style={styles.checkboxContainer}>
              <Checkbox value={semPlaca} onValueChange={setSemPlaca} />
              <Text style={[styles.checkboxLabel, { color: colors.text }]}>
                Moto sem placa
              </Text>
            </View>
          )}

          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                backgroundColor: colors.background,
                color: colors.text,
              },
            ]}
            placeholder={semPlaca ? "Digite o número do chassi" : placeholder}
            value={valor}
            onChangeText={setValor}
            autoCapitalize="characters"
            placeholderTextColor={colors.placeholder}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={onProsseguir}
          >
            <Text style={styles.buttonText}>Prosseguir</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 25,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "500",
  },
  success: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  checkboxLabel: {
    fontSize: 14,
  },
});