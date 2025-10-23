import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../providers/ThemeContext";
import ZonaCard from "./ZonaCard";
import ZonaModal from "./ZonaModal";
import { zonasLista } from "../../data/zonas";
import { useTranslation } from "react-i18next";

export default function PatioZonas() {
  const { colors } = useTheme();
  const { t } = useTranslation();
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
      <Text style={[styles.title, { color: colors.title }]}>
        {t("parkingZones.title")}
      </Text>

      <View style={styles.grid}>
        {lista.map((zona) => (
          <ZonaCard
            key={zona.id}
            zona={{ ...zona, nome: t(`zones.${zona.id}`) }}
            onPress={abrirModalZona}
            isDoubleSize={zona.id === 0}
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