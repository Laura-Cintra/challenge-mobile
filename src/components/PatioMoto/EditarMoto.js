import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import MessageModal from "../MessageModal";
import { useEffect, useState } from "react";
import { zonasLista } from "../../data/zonas";

export default function EditarMotoModal({
  visible,
  onClose,
  moto,
  onSave,
}) {
  const [placa, setPlaca] = useState("");
  const [carrapato, setCarrapato] = useState("");
  const [modelo, setModelo] = useState("");
  const [zona, setZona] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (moto) {
      setPlaca(moto.placa ?? "");
      setCarrapato(String(moto.idCarrapato ?? moto.carrapato ?? ""));
      setModelo(moto.modelo ?? "");
      const initialZona = zonasLista.find(z => z.id === moto.zona)?.id ?? moto.zona ?? "";
      setZona(initialZona);
    } else {
      setPlaca("");
      setCarrapato("");
      setModelo("");
      setZona("");
    }
  }, [moto, visible]);

  const limparCampos = () => {
    setPlaca("");
    setCarrapato("");
    setModelo("");
    setZona("");
  };

  const handleSalvar = async () => {
    if (!placa || !carrapato || !modelo || (zona === "" || zona === null)) {
      setModalMessage("Preencha todos os campos.");
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    const validarPlaca = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(placa.trim().toUpperCase());
    if (!validarPlaca) {
      setModalMessage("Formato de placa inválido. Use o formato ABC1234.");
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    const dados = {
      placa: placa.trim().toUpperCase(),
      modelo,
      zona: typeof zona === "number" ? zona : Number(zona),
      idCarrapato: isNaN(Number(carrapato)) ? carrapato : Number(carrapato),
    };

    try {
      if (typeof onSave === "function") {
        await onSave(moto.id, dados);
      }
      setModalMessage("Moto editada com sucesso!");
      setIsSuccess(true);
      setModalVisible(true);
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (error) {
      console.error(error);
      setModalMessage("Erro ao editar moto.");
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  const options = zonasLista || [];

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
            style={styles.input}
            value={placa}
            onChangeText={(t) => setPlaca(t.toUpperCase())}
            placeholder="Digite a placa"
            placeholderTextColor={colors.placeholder}
          />

          <Text style={styles.label}>Carrapato</Text>
          <TextInput
            style={styles.input}
            value={carrapato}
            onChangeText={setCarrapato}
            placeholder="Digite o carrapato"
            placeholderTextColor={colors.placeholder}
          />

          <Text style={styles.label}>Modelo</Text>
          <TextInput
            style={styles.input}
            value={modelo}
            onChangeText={setModelo}
            placeholder="Modelo"
            placeholderTextColor={colors.placeholder}
          />

          <Text style={styles.label}>Zona</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={zona} onValueChange={(v) => setZona(v)}>
              <Picker.Item label="Selecione uma zona..." value="" color={colors.placeholder} />
              {options.map((z) => (
                <Picker.Item key={z.id} label={z.nome} value={z.id} />
              ))}
            </Picker>
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.secundary }]} onPress={handleSalvar}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: "#9e9e9e" }]} onPress={limparCampos}>
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
    padding: 4,
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