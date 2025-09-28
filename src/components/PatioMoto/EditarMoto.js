import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import MessageModal from "../MessageModal";
import { useEffect, useState } from "react";
import { zonasLista } from "../../data/zonas";
import { getModelos } from "../../services/actions";

export default function EditarMotoModal({ visible, onClose, moto, onSave }) {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [zona, setZona] = useState("");

  const [modelos, setModelos] = useState([]);
  const [loadingModelos, setLoadingModelos] = useState(false);

  const [erroPlaca, setErroPlaca] = useState("");
  const [erroModelo, setErroModelo] = useState("");
  const [erroZona, setErroZona] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (visible) {
      carregarModelos();
    }
  }, [visible]);

  const carregarModelos = async () => {
    setLoadingModelos(true);
    try {
      const lista = await getModelos();
      setModelos(lista);
    } catch (err) {
      console.error("Erro ao buscar modelos:", err);
      setModelos([]);
    } finally {
      setLoadingModelos(false);
    }
  };

  useEffect(() => {
    if (moto) {
      setPlaca(moto.placa ?? "");
      const modeloEncontrado = modelos.find(
        (m) => m.nome.toUpperCase() === (moto.modelo ?? "").toUpperCase()
      );
      setModelo(modeloEncontrado?.id?.toString() ?? "");
      setZona(zonasLista.find((z) => z.id === moto.zona)?.id ?? moto.zona ?? "");
    } else {
      limparCampos();
    }
  }, [moto, modelos]);

  const limparCampos = () => {
    setPlaca("");
    setModelo("");
    setZona("");
    setErroPlaca("");
    setErroModelo("");
    setErroZona("");
  };

  const handleSalvar = async () => {
    let formIsValid = true;

    setErroPlaca("");
    setErroModelo("");
    setErroZona("");

    if (!placa) {
      setErroPlaca("Placa é obrigatória.");
      formIsValid = false;
    }
    if (!modelo) {
      setErroModelo("Modelo é obrigatório.");
      formIsValid = false;
    }
    if (zona === "" || zona === null) {
      setErroZona("Zona é obrigatória.");
      formIsValid = false;
    }

    const validarPlaca = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(
      placa.trim().toUpperCase()
    );
    if (placa && !validarPlaca) {
      setErroPlaca("Formato inválido (use ABC1A23).");
      formIsValid = false;
    }

    if (!formIsValid) return;

    const dados = {
      placa: placa.trim().toUpperCase(),
      modelo: Number(modelo),
      zona: Number(zona),
      idCarrapato: moto.idCarrapato,
    };

    try {
      if (typeof onSave === "function") {
        const response = await onSave(moto.id, dados);

        if (response && response.id) {
          setModalMessage("Moto editada com sucesso!");
          setIsSuccess(true);
          setModalVisible(true);

          setTimeout(() => {
            setModalVisible(false);
            onClose();
          }, 1500);
        } else {
          throw new Error("A API não retornou a moto atualizada.");
        }
      }
    } catch (error) {
      console.error("Erro ao editar moto:", error);

      const apiErrors = error.response?.data?.errors || {};
      const apiMessage =
        error.response?.data?.mensagem ||
        error.response?.data?.erro ||
        error.message ||
        "Erro ao editar moto.";

      if (apiErrors.placa) setErroPlaca(apiErrors.placa);
      if (apiErrors.modelo) setErroModelo(apiErrors.modelo);
      if (apiErrors.zona) setErroZona(apiErrors.zona);

      setModalMessage(apiMessage);
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={22} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.title}>Editar Moto</Text>

          <Text style={styles.label}>Placa</Text>
          <TextInput
            style={[styles.input, erroPlaca && styles.inputError]}
            value={placa}
            onChangeText={(t) => setPlaca(t.toUpperCase())}
            placeholder="Digite a placa"
            placeholderTextColor={colors.placeholder}
          />
          {erroPlaca && <Text style={styles.errorText}>{erroPlaca}</Text>}

          <Text style={styles.label}>Modelo</Text>
          <View style={styles.pickerContainer}>
            {loadingModelos ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Picker
                selectedValue={modelo}
                onValueChange={(value) => setModelo(value)}
              >
                <Picker.Item label="Selecione um modelo..." value="" />
                {modelos.map((m) => (
                  <Picker.Item key={m.id} label={m.nome} value={m.id.toString()} />
                ))}
              </Picker>
            )}
          </View>
          {erroModelo && <Text style={styles.errorText}>{erroModelo}</Text>}

          <Text style={styles.label}>Zona</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={zona} onValueChange={(v) => setZona(v)}>
              <Picker.Item
                label="Selecione uma zona..."
                value=""
                color={colors.placeholder}
              />
              {zonasLista.map((z) => (
                <Picker.Item key={z.id} label={z.nome} value={z.id} />
              ))}
            </Picker>
          </View>
          {erroZona && <Text style={styles.errorText}>{erroZona}</Text>}

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.secundary }]}
              onPress={handleSalvar}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.inative }]}
              onPress={limparCampos}
            >
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        isSuccess={isSuccess}
        onClose={() => setModalVisible(false)}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 12,
    marginBottom: 6,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    color: colors.text,
    fontSize: 15,
  },
  inputError: {
    borderColor: colors.modalRed,
  },
  errorText: {
    color: colors.modalRed,
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});