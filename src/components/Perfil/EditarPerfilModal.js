import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import MessageModal from "../MessageModal";
import { useUser } from "../../providers/UserContext";
import { updateUserApi } from "../../services/actions";

export default function EditarPerfilModal({ visible, onClose }) {
  const { user, updateUser } = useUser();

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
      setModalMessage("Preencha todos os campos.");
      setIsSuccess(false);
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
      }, 2000);

      return;
    }

    if (senha && senha !== confirmarSenha) {
      setModalMessage("As senhas não coincidem.");
      setIsSuccess(false);
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
      return;
    }

    try {
      const dadosAtualizados = {
        nome,
        email,
        senha: senha || user.senha,
      };

      const atualizado = await updateUserApi(user.idUsuario, dadosAtualizados);
      await updateUser(atualizado);

      setModalMessage("Perfil atualizado com sucesso!");
      setIsSuccess(true);
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        onClose();
      }, 2000);
    } catch (error) {
      setModalMessage("Erro ao atualizar perfil.");
      setIsSuccess(false);
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={22} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.title}>Editar Perfil</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            placeholderTextColor={colors.placeholder}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            placeholderTextColor={colors.placeholder}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Nova Senha</Text>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua nova senha"
            placeholderTextColor={colors.placeholder}
            secureTextEntry
          />

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholder="Confirme sua senha"
            placeholderTextColor={colors.placeholder}
            secureTextEntry
          />

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.secundary }]}
              onPress={handleSalvar}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.inative }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
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
    color: colors.white,
    fontWeight: "bold",
  },
});