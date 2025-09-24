import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RegistroCampo from "./RegistroCampo";
import MessageModal from "../MessageModal";
import colors from "../../theme/colors";

export default function RegistrarMoto() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  const [placa, setPlaca] = useState("");
  const [semPlaca, setSemPlaca] = useState(false);
  const [carrapato, setCarrapato] = useState("");

  const [erroPlaca, setErroPlaca] = useState(false);
  const [erroCarrapato, setErroCarrapato] = useState(false);

  const [finalizado, setFinalizado] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (finalizado) return;

    if (step === 1 && loading) {
      setTimeout(() => {
        const sucesso = Math.random() > 0.3;
        if (sucesso) {
          setPlaca("AAA1A23");
          setLoading(false);
          setTimeout(() => {
            setStep(2);
            setLoading(true);
          }, 1000);
        } else {
          setErroPlaca(true);
          setLoading(false);
        }
      }, 2000);
    }

    if (step === 2 && loading) {
      setTimeout(() => {
        const sucesso = Math.random() > 0.3;
        if (sucesso) {
          setCarrapato("CARRAPATO_001");
          setLoading(false);
          setTimeout(() => {
            setStep(3);
          }, 1000);
        } else {
          setErroCarrapato(true);
          setLoading(false);
        }
      }, 2000);
    }
  }, [step, loading, finalizado]);

  const placaValida = (valor) => /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(valor);

  const handleProsseguirPlaca = () => {
    const valor = placa.trim().toUpperCase();
    if (semPlaca) {
      if (!valor) {
        setModalMessage("Digite o número do chassi.");
        setModalVisible(true);
        return;
      }
    } else {
      if (!placaValida(valor)) {
        setModalMessage("Formato de placa inválido. Ex: AAA1A23.");
        setModalVisible(true);
        return;
      }
    }

    setStep(2);
    setLoading(true);
    setErroPlaca(false);
  };

  const handleProsseguirCarrapato = () => {
    if (!carrapato.trim()) {
      setModalMessage("Digite um ID válido do carrapato.");
      setModalVisible(true);
      return;
    }
    setStep(3);
    setErroCarrapato(false);
  };

  const handleFinalizar = () => {
    setStep(1);
    setPlaca("");
    setCarrapato("");
    setSemPlaca(false);
    setErroPlaca(false);
    setErroCarrapato(false);
    setLoading(false);
    setFinalizado(true);
  };

  const handleRegistrarFrota = () => {
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
              valor={placa}
              setValor={(v) => setPlaca(v)}
              erro={erroPlaca}
              loading={loading && step === 1}
              placeholder="Digite a placa"
              onProsseguir={handleProsseguirPlaca}
              permiteSemPlaca
              semPlaca={semPlaca}
              setSemPlaca={setSemPlaca}
            />
          )}

          {step >= 2 && (
            <RegistroCampo
              label="Carrapato"
              isFeminine={false}
              valor={carrapato}
              setValor={(v) => setCarrapato(v)}
              erro={erroCarrapato}
              loading={loading && step === 2}
              placeholder="Digite o ID do carrapato"
              onProsseguir={handleProsseguirCarrapato}
            />
          )}

          {step === 3 && (
            <View style={styles.successBox}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>

              <Text style={styles.successFinal}>Moto registrada com sucesso</Text>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, { flex: 1 }]}
                  onPress={() => {
                    setStep(1);
                    setPlaca("");
                    setCarrapato("");
                    setErroPlaca(false);
                    setErroCarrapato(false);
                    setSemPlaca(false);
                    setLoading(true);
                  }}
                >
                  <Text style={styles.buttonText}>Registrar outra</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "gray", flex: 1 }]}
                  onPress={handleFinalizar}
                >
                  <Text style={styles.buttonText}>Finalizar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
    marginVertical: 15,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
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
});