import { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart } from 'react-native-gifted-charts';
import { zonas } from '../../data/zonas';
import colors from '../../theme/colors';

export default function GraficoZonas() {
  const [dadosZonas, setDadosZonas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        const dados = await AsyncStorage.getItem('lista_motos');
        const motos = dados ? JSON.parse(dados) : [];

        const contagem = zonas.map(zona => {
          const total = motos.filter(moto => moto.zona === zona.nome).length;
          return { ...zona, total };
        });

        setDadosZonas(contagem);
      }
      carregarDados();
    }, [])
  );

  const dadosGrafico = dadosZonas.map((zona, i) => ({
    value: zona.total,
    label: String(i + 1),
    frontColor: zona.cor,
    topLabelComponent: () => (
      <Text style={{ color: colors.textSecondary }}>{zona.total}</Text>
    ),
  }));

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Gráfico de Zonas</Text>
      <BarChart
        data={dadosGrafico}
        barWidth={28}
        height={180}
        spacing={24}
        noOfSections={4}
        yAxisThickness={0}
        isAnimated
        barBorderRadius={4}
      />

      <View style={styles.legenda}>
        {dadosZonas.map((zona) => (
          <View key={zona.nome} style={styles.legendaItem}>
            <View style={[styles.legendaCor, { backgroundColor: zona.cor }]} />
            <Text style={styles.legendaTexto}>{zona.nome}</Text>
          </View>
        ))}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 7,
    color: colors.title,
  },
  legenda: {
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4
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
