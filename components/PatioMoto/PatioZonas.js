import { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../theme/colors';

import ZonaCard from './ZonaCard';
import ZonaModal from './ZonaModal';

const zonas = [
  { nome: 'Manutenção Rápida', cor: colors.zona1 },
  { nome: 'Danos Estruturais', cor: colors.zona2 },
  { nome: 'Sem Placa', cor: colors.zona3 },
  { nome: 'BO', cor: colors.zona4 },
  { nome: 'Aluguel', cor: colors.zona5 },
  { nome: 'Motor Defeituoso', cor: colors.zona6 },
];

export default function PatioZonas() {
  const [motos, setMotos] = useState([]);
  const [zonaSelecionada, setZonaSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroBusca, setFiltroBusca] = useState('');

  // atualizar a quantidade de motos em tempo real - dispara a função sempre que a tela é focada
  useFocusEffect(
    useCallback(() => {
      const carregarMotos = async () => {
        try {
          const dados = await AsyncStorage.getItem('lista_motos');
          setMotos(dados ? JSON.parse(dados) : []);
        } catch (error) {
          console.error('Erro ao carregar motos:', error);
        }
      };
      carregarMotos();
    }, [])
  );

  const abrirModalZona = (zona) => {
    setZonaSelecionada(zona);
    setFiltroBusca('');
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zonas do Pátio</Text>

      <View style={styles.grid}>
        {zonas.map((zona) => (
          <ZonaCard
            key={zona.nome}
            nome={zona.nome}
            cor={zona.cor}
            onPress={abrirModalZona}
          />
        ))}
      </View>

      <ZonaModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        zona={zonaSelecionada}
        motos={motos.filter((moto) => moto.zona === zonaSelecionada)}
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
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
    color: colors.title,
    marginTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});