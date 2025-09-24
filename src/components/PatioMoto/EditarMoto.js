import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import MessageModal from "../MessageModal";
import { useMotos } from "../../providers/UseMotos";
import { zonas } from "../../data/zonas";

export default function EditarMotoModal({
  visible,
  onClose,
  moto,
}) {
  const { editarMoto } = useMotos();

  const [placa, setPlaca] = useState("");
  const [carrapato, setCarrapato] = useState("");
  const [modelo, setModelo] = useState("");
  const [zona, setZona] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (moto) {
      setPlaca(moto.placa || "");
      setCarrapato(moto.carrapato || "");
      setModelo(moto.modelo || "");
      setZona(moto.zona || "");
    }
  }, [moto]);

  const limparCampos = () => {
    setPlaca("");
    setCarrapato("");
    setModelo("");
    setZona("");
  };

  const handleSalvar = () => {
    if (!placa || !carrapato || !modelo || !zona) {
      setModalMessage("Preencha todos os campos.");
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    const placaValida = /^[a-zA-Z]{3}[0-9]{4}$/.test(placa.trim());
    if (!placaValida) {
      setModalMessage("Formato de placa inválido. Use o formato ABC1234.");
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    try {
      editarMoto({
        ...moto,
        placa,
        carrapato,
        modelo,
        zona,
      });

      setModalMessage("Moto editada com sucesso!");
      setIsSuccess(true);
      setModalVisible(true);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.log(err);
      setModalMessage("Erro ao editar moto.");
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.title}>Editar Moto</Text>

          <Text style={styles.label}>Placa</Text>
          <TextInput
            style={styles.input}
            value={placa}
            onChangeText={setPlaca}
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
          <View style={styles.pickerContainer}>
            <Picker selectedValue={modelo} onValueChange={setModelo}>
              <Picker.Item
                label="Selecione um modelo..."
                value=""
                color={colors.placeholder}
              />
              <Picker.Item label="Mottu Sport" value="Mottu Sport" />
              <Picker.Item label="Mottu E" value="Mottu E" />
              <Picker.Item label="Mottu Pop" value="Mottu Pop" />
            </Picker>
          </View>

          <Text style={styles.label}>Zona</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={zona} onValueChange={setZona}>
              <Picker.Item
                label="Selecione uma zona..."
                value=""
                color={colors.placeholder}
              />
              {zonas.map((z, i) => (
                <Picker.Item key={i} label={z.nome} value={z.nome} />
              ))}
            </Picker>
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleSalvar}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#aaa" }]}
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