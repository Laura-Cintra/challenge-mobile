import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListaMotos from "./ListaMotos";
import colors from "../theme/colors";

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
      <View style={styles.container}>
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

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  closeButton: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
  },
});