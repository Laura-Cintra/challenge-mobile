import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListaMotos from "./ListaMotos";

// Mock de motos (depois vem da API)
const motos = [
  { placa: "ABC-1234", deviceId: "CARRAPATO_001", modelo: "Honda CG" },
  { placa: "XYZ-5678", deviceId: "CARRAPATO_002", modelo: "Yamaha XTZ" },
  { placa: "JKL-9101", deviceId: "CARRAPATO_003", modelo: "Suzuki GSX" },
];

export default function ProcurarMotoModal({ visible, onClose }) {
  const [busca, setBusca] = useState("");
  const [selected, setSelected] = useState(null);

  const localizar = (moto) => setSelected(moto.placa);
  const parar = () => setSelected(null);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <ListaMotos
          titulo="Localize uma moto em seu pátio"
          motos={motos}
          busca={busca}
          setBusca={setBusca}
          selected={selected}
          onLocalizar={localizar}
          onParar={parar}
          mostrarFiltro={true}
          permitirLocalizar={true}
        />

        <TouchableOpacity style={styles.fecharBotao} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={20} color="#fff" />
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