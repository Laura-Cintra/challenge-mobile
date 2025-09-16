import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import colors from "../theme/colors";

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
  
  // Se a moto não tiver placa, o rótulo passa a ser "Chassi"
  const displayLabel = semPlaca ? "Chassi" : label;
  const displayIsFeminine = semPlaca ? false : isFeminine;

  const labelCapitalized =
    displayLabel.charAt(0).toUpperCase() + displayLabel.slice(1).toLowerCase();
  const article = displayIsFeminine ? "a" : "o";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {loading
          ? `Identificando ${labelCapitalized}...`
          : erro
          ? `Erro ao ler ${article} ${displayLabel.toLowerCase()}, insira abaixo:`
          : valor
          ? `${labelCapitalized} ${displayIsFeminine ? "identificada" : "identificado"}:`
          : `Identificando ${labelCapitalized}...`}
      </Text>

      {loading && <ActivityIndicator size="large" color={colors.primary} />}

      {!loading && valor && !erro && (
        <Text style={styles.success}>✓ {valor}</Text>
      )}

      {/* Input manual em casos de erro */}
      {erro && (
        <>
          {permiteSemPlaca && (
            <View style={styles.checkboxContainer}>
              <Checkbox value={semPlaca} onValueChange={setSemPlaca} />
              <Text style={styles.checkboxLabel}>Moto sem placa</Text>
            </View>
          )}

          <TextInput
            style={styles.input}
            placeholder={semPlaca ? "Digite o número do chassi" : placeholder}
            value={valor}
            onChangeText={setValor}
            autoCapitalize="characters"
          />

          <TouchableOpacity style={styles.button} onPress={onProsseguir}>
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
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "500",
  },
  success: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
    color: "green",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    backgroundColor: "#f2f2f2",
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: colors.primary,
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
    color: "#333",
  },
});