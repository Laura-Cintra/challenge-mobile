import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { zonasLista } from "../../data/zonas";
import { useTheme } from "../../providers/ThemeContext";
import { useTranslation } from "react-i18next";
import { MotiView, MotiText } from "moti";

export default function GraficoZonas({ motos }) {
  const [dadosZonas, setDadosZonas] = useState([]);
  const { colors } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    if (motos) {
      const contagem = zonasLista.map((zona) => {
        const total = motos.filter((moto) => moto.zona === zona.id).length;
        return { ...zona, total };
      });
      setDadosZonas(contagem);
    }
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
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={styles.container}
    >
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
        animationDuration={800}
        barBorderRadius={4}
        rulesColor={colors.textSecondary}
        yAxisTextStyle={{ color: colors.text }}
        xAxisLabelTextStyle={{ color: colors.text }}
      />

      <View style={styles.legenda}>
        {dadosZonas.map((zona, index) => (
          <MotiView
            key={zona.id}
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 300 + index * 100 }}
            style={styles.legendaItem}
          >
            <View style={[styles.legendaCor, { backgroundColor: zona.cor }]} />
            <Text style={[styles.legendaTexto, { color: colors.text }]}>
              {t(`zones.${zona.id}`)}
            </Text>
          </MotiView>
        ))}
      </View>
    </MotiView>
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
