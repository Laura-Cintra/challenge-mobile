import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../providers/ThemeContext";

import ZonaCard from "./ZonaCard";
import ZonaModal from "./ZonaModal";
import { zonasLista } from "../../data/zonas";

export default function PatioZonas() {
  const { colors } = useTheme();
  const [zonaSelecionada, setZonaSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroBusca, setFiltroBusca] = useState("");

  const abrirModalZona = (zona) => {
    setZonaSelecionada(zona);
    setFiltroBusca("");
    setModalVisible(true);
  };

  const lista = zonasLista || [];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.title }]}>Zonas do Pátio</Text>

      <View style={styles.grid}>
        {lista.map((zona) => (
          <ZonaCard
            key={zona.id}
            zona={zona}
            onPress={abrirModalZona}
            isDoubleSize={zona.nome === "Saguão"}
          />
        ))}
      </View>

      <ZonaModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        zona={zonaSelecionada}
        filtroBusca={filtroBusca}
        setFiltroBusca={setFiltroBusca}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 14,
    alignSelf: "center",
    marginTop: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
});