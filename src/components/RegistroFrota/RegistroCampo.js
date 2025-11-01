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
import { useTranslation } from "react-i18next";
import { MotiView, MotiText } from "moti";

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
  const { t } = useTranslation();

  // Se a moto não tiver placa, o rótulo passa a ser "Chassi"
  const displayLabel = semPlaca ? t("motorcycleList.chassi") : label;
  const displayIsFeminine = semPlaca ? false : isFeminine;
  const artigo = displayIsFeminine ? "a" : "o";

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
      style={[styles.container, { backgroundColor: colors.white, shadowColor: colors.text }]}
    >
      <MotiText
        from={{ opacity: 0, translateY: -5 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 150, type: "timing" }}
        style={[styles.title, { color: colors.text }]}
      >
        {loading
          ? t("registrationField.identifying", { campo: displayLabel })
          : erro
          ? t("registrationField.errorReading", { artigo, campo: displayLabel.toLowerCase() })
          : valor
          ? t(displayIsFeminine ? "registrationField.identified" : "registrationField.identifiedMale", {
              campo: displayLabel,
            })
          : t("registrationField.identifying", { campo: displayLabel })}
      </MotiText>

      {loading && (
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </MotiView>
      )}

      {!loading && valor && !erro && (
        <MotiText
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 300 }}
          style={[styles.success, { color: colors.primary }]}
        >
          ✓ {valor}
        </MotiText>
      )}

      {erro && (
        <>
          {permiteSemPlaca && (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 150 }}
              style={styles.checkboxContainer}
            >
              <Checkbox value={semPlaca} onValueChange={setSemPlaca} />
              <Text style={[styles.checkboxLabel, { color: colors.text }]}>
                {t("registrationField.motorcycleWithoutPlate")}
              </Text>
            </MotiView>
          )}

          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 200 }}
          >
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                  color: colors.text,
                },
              ]}
              placeholder={
                semPlaca
                  ? t("registrationField.placeholderChassis")
                  : t("registrationField.placeholderLicensePlate")
              }
              value={valor}
              onChangeText={setValor}
              autoCapitalize="characters"
              placeholderTextColor={colors.placeholder}
            />
          </MotiView>

          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 300 }}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={onProsseguir}
            >
              <Text style={styles.buttonText}>{t("registrationField.continue")}</Text>
            </TouchableOpacity>
          </MotiView>
        </>
      )}
    </MotiView>
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