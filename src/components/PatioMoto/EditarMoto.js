import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MessageModal from "../MessageModal";
import { useEffect, useState } from "react";
import { zonasLista } from "../../data/zonas";
import { getModelos } from "../../services/actions";
import { useTheme } from "../../providers/ThemeContext";
import InputSelectDropdown from "../UserForm/InputSelect";
import { useTranslation } from "react-i18next";

export default function EditarMotoModal({ visible, onClose, moto, onSave }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

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
    if (visible) carregarModelos();
  }, [visible]);

  const carregarModelos = async () => {
    setLoadingModelos(true);
    try {
      const lista = await getModelos();
      const formatted = lista.map((m) => ({
        value: m.id.toString(),
        label: m.nome,
      }));
      setModelos(formatted);
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
      setModelo(
        modelos.find(
          (m) => m.label.toUpperCase() === (moto.modelo ?? "").toUpperCase()
        )?.value ?? ""
      );
      setZona(zonasLista.find((z) => z.id === moto.zona)?.id.toString() ?? "");
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
      setErroPlaca(t("editMotorcycle.licensePlateRequired"));
      formIsValid = false;
    }
    if (!modelo) {
      setErroModelo(t("editMotorcycle.modelRequired"));
      formIsValid = false;
    }
    if (!zona) {
      setErroZona(t("editMotorcycle.zoneRequired"));
      formIsValid = false;
    }

    const validarPlaca = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(
      placa.trim().toUpperCase()
    );
    if (placa && !validarPlaca) {
      setErroPlaca(t("editMotorcycle.invalidLicensePlate"));
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
      const response = await onSave(moto.id, dados);
      if (response && response.id) {
        setModalMessage(t("editMotorcycle.success"));
        setIsSuccess(true);
        setModalVisible(true);

        setTimeout(() => {
          setModalVisible(false);
          onClose();
        }, 1500);
      } else {
        throw new Error(t("editMotorcycle.error"));
      }
    } catch (error) {
      setModalMessage(t("editMotorcycle.error"));
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.white }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={22} color={colors.text} />
          </TouchableOpacity>

          <Text style={[styles.title, { color: colors.text }]}>
            {t("editMotorcycle.title")}
          </Text>

          <View>
            <Text style={[styles.label, { color: colors.text }]}>
              {t("editMotorcycle.licensePlate")}
            </Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.text },
                erroPlaca && { borderColor: colors.modalRed },
              ]}
              value={placa}
              onChangeText={(t) => setPlaca(t.toUpperCase())}
              placeholder={t("editMotorcycle.licensePlate")}
              placeholderTextColor={colors.placeholder}
            />
            {erroPlaca && <Text style={styles.errorText}>{erroPlaca}</Text>}

            <InputSelectDropdown
              label={t("editMotorcycle.model")}
              selectedValue={modelo}
              onValueChange={setModelo}
              items={modelos}
              zIndex={3000}
            />
            {erroModelo && <Text style={styles.errorText}>{erroModelo}</Text>}

            <InputSelectDropdown
              label={t("editMotorcycle.zone")}
              selectedValue={zona}
              onValueChange={setZona}
              items={zonasLista.map((z) => ({
                value: z.id.toString(),
                label: t(`zones.${z.id}`),
              }))}
              zIndex={2000}
            />
            {erroZona && <Text style={styles.errorText}>{erroZona}</Text>}
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.secundary }]}
              onPress={handleSalvar}
            >
              <Text style={styles.buttonText}>{t("editMotorcycle.save")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.inative }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>{t("confirmDeletion.cancel")}</Text>
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
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
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
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});