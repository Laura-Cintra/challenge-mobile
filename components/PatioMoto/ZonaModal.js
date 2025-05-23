import {
  View,
  Text,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../../theme/colors';
import { useMotos } from '../../providers/UseMotos';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ZonaModal({
  visible,
  onClose,
  zona,
  filtroBusca,
  setFiltroBusca,
}) {
  
  const { motos, deletarMotoPorId } = useMotos();
  const textoBusca = filtroBusca.toLowerCase().trim();

  const motosDaZona = motos.filter((moto) => moto.zona === zona);

  const motosFiltradas = filtroBusca
    ? motosDaZona.filter((moto) =>
        moto.modelo.toLowerCase().includes(textoBusca) ||
        moto.placa.toLowerCase().includes(textoBusca) ||
        moto.id.toString().includes(textoBusca)
      )
    : motosDaZona;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{zona}</Text>
        <Text style={styles.modalSubtitle}>Total: {motosFiltradas.length} motos</Text>

        <TextInput
          placeholder="Buscar por modelo, placa ou ID"
          value={filtroBusca}
          onChangeText={setFiltroBusca}
          style={styles.searchInput}
        />

        <FlatList
          data={motosFiltradas}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.motoItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemText}>ID: {item.id}</Text>
                <Text style={styles.itemText}>Modelo: {item.modelo}</Text>
                <Text style={styles.itemText}>Placa: {item.placa}</Text>
              </View>
              <TouchableOpacity onPress={() => deletarMotoPorId(item.id)}>
                <FontAwesome5 name="trash" size={20} color={colors.modalRed} />
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={styles.fecharBotao} onPress={onClose}>
          <Text style={{ color: colors.white, fontSize: 19 }}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  modalSubtitle: {
    fontSize: 18,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  motoItem: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingVertical: 2,
  },
  fecharBotao: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
});