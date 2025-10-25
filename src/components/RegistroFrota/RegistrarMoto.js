import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RegistroCampo from "./RegistroCampo";
import MessageModal from "../MessageModal";
import { getMotos, createMoto } from "../../services/actions";
import { useUser } from "../../providers/UserContext";
import { zonasMap } from "../../data/zonas";
import { useTheme } from "../../providers/ThemeContext";
import { useTranslation } from "react-i18next";

export default function RegistrarMoto() {
  const { user } = useUser();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  const [placa, setPlaca] = useState("");
  const [chassi, setChassi] = useState("");
  const [semPlaca, setSemPlaca] = useState(false);
  const [carrapato, setCarrapato] = useState("");
  const [modelo, setModelo] = useState("");
  const [zona, setZona] = useState("");

  const [erroPlaca, setErroPlaca] = useState(false);
  const [erroCarrapato, setErroCarrapato] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (finalizado) return;

    const executarEtapas = async () => {
      try {
        if (step === 1 && loading) {
          try {
            if (Math.random() < 0.3) throw new Error(t("registerMotorcycle.errorReading"));
            const motos = await getMotos();
            if (!motos || motos.length === 0) throw new Error(t("registerMotorcycle.noneFound"));

            await new Promise((res) => setTimeout(res, 1000));
            const aleatoria = motos[Math.floor(Math.random() * motos.length)];
            setPlaca(aleatoria.placa || aleatoria.chassi || "");
            setLoading(false);

            setTimeout(() => {
              setStep(2);
              setLoading(true);
            }, 1000);
          } catch {
            await new Promise((res) => setTimeout(res, 1000));
            setErroPlaca(true);
            setLoading(false);
          }
        }

        if (step === 2 && loading) {
          try {
            const body = semPlaca
              ? { chassi: chassi.trim(), idPatio: user.idPatio }
              : { placa: placa.trim().toUpperCase(), idPatio: user.idPatio };

            const vinculo = await createMoto(body);
            setCarrapato(vinculo.idCarrapato);
            setModelo(vinculo.modelo);
            setZona(vinculo.zona);

            await new Promise((res) => setTimeout(res, 1000));
            setLoading(false);
            setTimeout(() => setStep(3), 1000);
          } catch (error) {
            const mensagemApi =
              error.response?.data?.mensagem ||
              error.response?.data?.message ||
              error.response?.data?.erro ||
              error.mensagem ||
              error.message ||
              t("registerMotorcycle.unknownError");

            setModalMessage(mensagemApi);
            setErroCarrapato(true);
            setLoading(false);
            setStep(3);
          }
        }
      } catch {
        if (step === 1) setErroPlaca(true);
        if (step === 2) setErroCarrapato(true);
        setLoading(false);
      }
    };

    executarEtapas();
  }, [step, loading, finalizado, semPlaca, placa, user]);

  const handleProsseguirPlaca = () => {
    if (semPlaca) {
      if (!chassi.trim()) {
        setModalMessage(t("registerMotorcycle.enterChassis"));
        setModalVisible(true);
        return;
      }
    } else {
      if (!placa.trim()) {
        setModalMessage(t("registerMotorcycle.enterLicensePlate"));
        setModalVisible(true);
        return;
      }

      const validarPlaca = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(placa.trim().toUpperCase());
      if (!validarPlaca) {
        setModalMessage(t("editMotorcycle.invalidLicensePlate"));
        setModalVisible(true);
        return;
      }
    }

    setErroPlaca(false);
    setStep(2);
    setLoading(true);
  };

  const handleFinalizar = () => {
    setStep(1);
    setPlaca("");
    setCarrapato("");
    setModelo("");
    setZona("");
    setSemPlaca(false);
    setErroPlaca(false);
    setErroCarrapato(false);
    setLoading(false);
    setFinalizado(true);
  };

  const handleRegistrarFrota = () => {
    setPlaca("");
    setCarrapato("");
    setModelo("");
    setZona("");
    setFinalizado(false);
    setStep(1);
    setLoading(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {!finalizado ? (
        <>
          <Text style={[styles.title, { color: colors.title }]}>
            {t("registerMotorcycle.title")}
          </Text>

          {step >= 1 && (
            <RegistroCampo
              label={t("editMotorcycle.licensePlate")}
              isFeminine={true}
              valor={semPlaca ? chassi : placa}
              setValor={semPlaca ? setChassi : setPlaca}
              erro={erroPlaca}
              loading={loading && step === 1}
              placeholder={t("registrationField.placeholderLicensePlate")}
              onProsseguir={handleProsseguirPlaca}
              permiteSemPlaca
              semPlaca={semPlaca}
              setSemPlaca={setSemPlaca}
            />
          )}

          {step >= 2 && !erroCarrapato && (
            <RegistroCampo
              label="Carrapato"
              isFeminine={false}
              valor={carrapato?.toString()}
              setValor={(v) => setCarrapato(v)}
              erro={false}
              loading={loading && step === 2}
              placeholder="Vinculando carrapato..."
              onProsseguir={() => {}}
            />
          )}

          {step === 3 && !erroCarrapato ? (
            <View style={styles.successBox}>
              <View style={[styles.checkCircle, { backgroundColor: colors.primary }]}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
              <View>
                <Text style={[styles.successFinal, { color: colors.text }]}>
                  {t("registerMotorcycle.success")}
                </Text>
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {t("registerMotorcycle.model", { modelo })}
                </Text>
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {t("registerMotorcycle.currentZone", {
                    zona: t(`zones.${zona}`) || t("registerMotorcycle.undefinedZone"),
                  })}
                </Text>
              </View>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.primary, flex: 1 }]}
                  onPress={handleRegistrarFrota}
                >
                  <Text style={styles.buttonText}>{t("registerMotorcycle.registerAnother")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.inative, flex: 1 }]}
                  onPress={handleFinalizar}
                >
                  <Text style={styles.buttonText}>{t("registerMotorcycle.finish")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : step === 3 && erroCarrapato ? (
            <View style={styles.errorBox}>
              <Text style={[styles.errorTitle, { color: colors.modalRed }]}>
                {t("registerMotorcycle.errorIdentifying")}
              </Text>
              <Text style={[styles.errorMessage, { color: colors.text }]}>{modalMessage}</Text>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.modalRed, marginTop: 15 }]}
                onPress={handleFinalizar}
              >
                <Text style={styles.buttonText}>{t("registerMotorcycle.clearOperation")}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      ) : (
        <View style={styles.successBox}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary, width: "70%" }]}
            onPress={handleRegistrarFrota}
          >
            <Text style={styles.buttonText}>{t("registerMotorcycle.registerFleet")}</Text>
          </TouchableOpacity>
        </View>
      )}

      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        isSuccess={false}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  successBox: {
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  successFinal: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: "left",
  },
  checkCircle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
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
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    marginTop: 15,
  },
  errorBox: {
    alignItems: "center",
    marginTop: 5,
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 15,
    textAlign: "center",
  },
});