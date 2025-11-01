import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MessageModal from "../MessageModal";
import { useUser } from "../../providers/UserContext";
import { updateUserApi } from "../../services/actions";
import { useTheme } from "../../providers/ThemeContext";
import { useTranslation } from "react-i18next";

export default function editProfileModal({ visible, onClose }) {
  const { user, updateUser } = useUser();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setNome(user.nome || "");
      setEmail(user.email || "");
    }
  }, [user, visible]);

  const handleSalvar = async () => {
    if (!nome.trim() || !email.trim()) {
      setModalMessage(t("editProfile.errorFields"));
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    if (senha && senha !== confirmarSenha) {
      setModalMessage(t("editProfile.errorPasswords"));
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    try {
      const dadosAtualizados = { nome, email, senha: senha || user.senha };
      const atualizado = await updateUserApi(user.idUsuario, dadosAtualizados);
      await updateUser(atualizado);

      setModalMessage(t("editProfile.success"));
      setIsSuccess(true);
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        onClose();
      }, 2000);
    } catch (error) {
      setModalMessage(t("editProfile.errorUpdate"));
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles(colors).overlay}>
        <View style={styles(colors).modalContainer}>
          <TouchableOpacity
            style={styles(colors).closeButton}
            onPress={onClose}
          >
            <MaterialCommunityIcons name="close" size={22} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles(colors).title}>{t("editProfile.title")}</Text>

          <Text style={styles(colors).label}>{t("editProfile.name")}</Text>
          <TextInput
            style={styles(colors).input}
            value={nome}
            onChangeText={setNome}
            placeholder={t("editProfile.placeholderName")}
            placeholderTextColor={colors.placeholder}
          />

          <Text style={styles(colors).label}>{t("editProfile.email")}</Text>
          <TextInput
            style={styles(colors).input}
            value={email}
            onChangeText={setEmail}
            placeholder={t("editProfile.placeholderEmail")}
            placeholderTextColor={colors.placeholder}
            keyboardType="email-address"
          />

          <Text style={styles(colors).label}>{t("editProfile.newPassword")}</Text>
          <TextInput
            style={styles(colors).input}
            value={senha}
            onChangeText={setSenha}
            placeholder={t("editProfile.placeholderPassword")}
            placeholderTextColor={colors.placeholder}
            secureTextEntry
          />

          <Text style={styles(colors).label}>
            {t("editProfile.confirmPassword")}
          </Text>
          <TextInput
            style={styles(colors).input}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholder={t("editProfile.placeholderConfirm")}
            placeholderTextColor={colors.placeholder}
            secureTextEntry
          />

          <View style={styles(colors).buttonsRow}>
            <TouchableOpacity
              style={[styles(colors).button, { backgroundColor: colors.secundary }]}
              onPress={handleSalvar}
            >
              <Text style={styles(colors).buttonText}>{t("editMotorcycle.save")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles(colors).button, { backgroundColor: colors.inative }]}
              onPress={onClose}
            >
              <Text style={styles(colors).buttonText}>{t("confirmDeletion.cancel")}</Text>
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

const styles = (colors) =>
  StyleSheet.create({
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
    },
    closeButton: {
      position: "absolute",
      right: 12,
      top: 12,
      padding: 4,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 15,
      textAlign: "center",
    },
    label: {
      fontWeight: "bold",
      fontSize: 14,
      marginTop: 10,
      marginBottom: 4,
      color: colors.text,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 10,
      color: colors.text,
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
      color: "#FBFBFB",
      fontWeight: "bold",
    },
  });