import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../providers/ThemeContext";

export default function ConfirmarExclusaoModal({
  visible,
  onClose,
  onConfirm,
  mensagem,
}) {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.white }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={22} color={colors.text} />
          </TouchableOpacity>

          <Text style={[styles.title, { color: colors.text }]}>Confirmar Exclusão</Text>
          <Text style={[styles.message, { color: colors.text }]}>{mensagem}</Text>
          <Text style={[styles.messageWarn, { color: colors.modalRed }]}>
            Esta ação não poderá ser desfeita.
          </Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.modalRed }]}
              onPress={onConfirm}
            >
              <Text style={[styles.buttonText, { color: colors.white }]}>Excluir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.inative }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: colors.white }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    width: "85%",
    borderRadius: 12,
    padding: 26,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 8,
  },
  messageWarn: {
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});