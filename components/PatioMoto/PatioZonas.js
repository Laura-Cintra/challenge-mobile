import { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

import ZonaCard from './ZonaCard';
import ZonaModal from './ZonaModal';
import { zonas } from '../../data/zonas';
import { useMotos } from '../../providers/UseMotos';

export default function PatioZonas() {
  const [zonaSelecionada, setZonaSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroBusca, setFiltroBusca] = useState('');
  const { motos } = useMotos();

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