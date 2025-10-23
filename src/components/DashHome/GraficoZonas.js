import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { zonasLista } from "../../data/zonas";
import { useTheme } from "../../providers/ThemeContext";
import { useTranslation } from "react-i18next";

export default function GraficoZonas({ motos }) {
  const [dadosZonas, setDadosZonas] = useState([]);
  const { colors } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const contagem = zonasLista.map((zona) => {
      const total = motos.filter((moto) => moto.zona === zona.id).length;
      return { ...zona, total };
    });
    setDadosZonas(contagem);
  }, [motos]);

  const dadosGrafico = dadosZonas.map((zona) => ({
    value: zona.total,
    label: String(zona.id),
    frontColor: zona.cor,
    topLabelComponent: () => (
      <Text style={{ color: colors.textSecondary }}>{zona.total}</Text>
    ),
  }));

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.title }]}>
        {t("dashboard.zonesChart")}
      </Text>
      <BarChart
        data={dadosGrafico}
        barWidth={28}
        height={180}
        spacing={24}
        noOfSections={4}
        yAxisThickness={0}
        isAnimated
        barBorderRadius={4}
        rulesColor={colors.textSecondary}
        yAxisTextStyle={{ color: colors.text }}
        xAxisLabelTextStyle={{ color: colors.text }}
      />

      <View style={styles.legenda}>
        {dadosZonas.map((zona) => (
          <View key={zona.id} style={styles.legendaItem}>
            <View style={[styles.legendaCor, { backgroundColor: zona.cor }]} />
            <Text style={[styles.legendaTexto, { color: colors.text }]}>
              {t(`zones.${zona.id}`)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 7,
  },
  legenda: {
    marginTop: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  legendaItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 4,
  },
  legendaCor: {
    width: 14,
    height: 14,
    borderRadius: 3,
    marginRight: 6,
  },
  legendaTexto: {
    fontSize: 14,
  },
});