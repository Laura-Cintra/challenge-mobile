import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RegistroCampo from "./RegistroCampo";
import MessageModal from "../MessageModal";
import colors from "../../theme/colors";
import { getMotos, createMoto } from "../../services/actions";
import { useUser } from "../../providers/UserContext";
import { zonasMap } from "../../data/zonas";

export default function RegistrarMoto() {
  const { user } = useUser();

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
            // simular falha de leitura da placa/chassi
            if (Math.random() < 0.3) {
              throw new Error("Falha na leitura da placa/chassi");
            }

            const motos = await getMotos();
            if (!motos || motos.length === 0) {
              throw new Error("Nenhuma moto encontrada no banco.");
            }
            await new Promise(res => setTimeout(res, 1000));

            const aleatoria = motos[Math.floor(Math.random() * motos.length)];
            setPlaca(aleatoria.placa || aleatoria.chassi || "");

            setLoading(false);

            setTimeout(() => {
              setStep(2);
              setLoading(true);
            }, 1000);
          } catch (error) {
            await new Promise(res => setTimeout(res, 1000));
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
            await new Promise(res => setTimeout(res, 1000));

            setLoading(false);

            setTimeout(() => {
              setStep(3);
            }, 1000);
          } catch (error) {

            const mensagemApi =
            error.response?.data?.mensagem ||
            error.response?.data?.message  ||
            error.response?.data?.erro     ||
            error.mensagem                 || 
            error.message                  ||
            "Erro desconhecido ao criar moto.";

            setModalMessage(mensagemApi)
            setErroCarrapato(true);
            await new Promise(res => setTimeout(res, 1000));
            setLoading(false);
            setStep(3);
          }
        }
      } catch (error) {
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
        setModalMessage("Digite o número do chassi.");
        setModalVisible(true);
        return;
      }
    } else {
      if (!placa.trim()) {
        setModalMessage("Digite uma placa válida.");
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
    <View style={styles.container}>
      {!finalizado ? (
        <>
          <Text style={styles.title}>Registro de Nova Moto</Text>

          {step >= 1 && (
            <RegistroCampo
              label="Placa"
              isFeminine={true}
              valor={semPlaca ? chassi : placa}
              setValor={semPlaca ? setChassi : setPlaca}
              erro={erroPlaca}
              loading={loading && step === 1}
              placeholder="Digite a placa"
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
              <View style={styles.checkCircle}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
              <View>
                <Text style={styles.successFinal}>Moto identificada com sucesso!</Text>
                <Text style={styles.detailText}>Modelo: {modelo}</Text>
                <Text style={styles.detailText}>
                  Zona atual: {zonasMap[zona]?.nome || "Zona não definida"}
                </Text>
              </View>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, { flex: 1 }]}
                  onPress={handleRegistrarFrota}
                >
                  <Text style={styles.buttonText}>Registrar outra</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.inative, flex: 1 }]}
                  onPress={handleFinalizar}
                >
                  <Text style={styles.buttonText}>Finalizar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : step === 3 && erroCarrapato ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorTitle}>Erro ao identificar moto</Text>
              <Text style={styles.errorMessage}>{modalMessage}</Text>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.modalRed, marginTop: 15 }]}
                onPress={handleFinalizar}
              >
                <Text style={styles.buttonText}>Quitar operação</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      ) : (
        <View style={styles.successBox}>
          <TouchableOpacity
            style={[styles.button, { width: "70%" }]}
            onPress={handleRegistrarFrota}
          >
            <Text style={styles.buttonText}>Registrar Frota</Text>
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
    marginBottom: 20,
    color: colors.title,
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
    color: colors.text,
    textAlign: "center",
  },
  detailText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 5,
    textAlign: "left",
  },
  checkCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
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
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 15,
    color: colors.text,
    textAlign: "center",
  },
});