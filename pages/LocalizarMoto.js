import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Dados mockados para teste
const motos = [
  { placa: "ABC-1234", deviceId: "CARRAPATO_001" },
  { placa: "XYZ-5678", deviceId: "CARRAPATO_002" },
  { placa: "JKL-9101", deviceId: "CARRAPATO_003" },
];

export default function ProcurarMotoModal({ visible, onClose }) {
  const [busca, setBusca] = useState("");
  const [selected, setSelected] = useState(null);

  const textoBusca = busca.toLowerCase().trim();

  const motosFiltradas = textoBusca
    ? motos.filter(
        (moto) =>
          moto.placa.toLowerCase().includes(textoBusca) ||
          moto.deviceId.toLowerCase().includes(textoBusca)
      )
    : [];

  const localizar = (moto) => {
    setSelected(moto.placa);
  };

  const parar = () => {
    setSelected(null);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Localize uma moto em seu pátio</Text>

        {/* Input de busca */}
        <TextInput
          placeholder="Digite a placa ou ID do carrapato"
          value={busca}
          onChangeText={setBusca}
          style={styles.searchInput}
        />

        {/* Se não encontrou nada */}
        {textoBusca.length > 0 && motosFiltradas.length === 0 && (
          <Text style={styles.naoEncontrada}>Moto não encontrada</Text>
        )}

        {/* Lista de motos filtradas */}
        <FlatList
          data={motosFiltradas}
          keyExtractor={(item) => item.deviceId}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.text}>{item.placa}</Text>
                <Text style={styles.deviceText}>Device: {item.deviceId}</Text>
              </View>

              <View style={styles.buttons}>
                {selected === item.placa ? (
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "red" }]}
                    onPress={parar}
                  >
                    <Text style={styles.btnText}>Parar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#009B30" }]}
                    onPress={() => localizar(item)}
                  >
                    <Text style={styles.btnText}>Localizar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />

        {/* Botão de fechar */}
        <TouchableOpacity style={styles.fecharBotao} onPress={onClose}>
          <FontAwesome name="close" size={20} color="#fff" />
          <Text style={{ color: "#fff", fontSize: 16, marginLeft: 6 }}>
            Fechar
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  naoEncontrada: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
    marginVertical: 15,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  deviceText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  buttons: {
    flexDirection: "row",
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fecharBotao: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009B30",
    padding: 12,
    borderRadius: 10,
  },
});