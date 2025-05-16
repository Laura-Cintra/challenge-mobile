import {
  View,
  Text,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ZonaModal({
  visible,
  onClose,
  zona,
  motos,
  searchQuery,
  setSearchQuery,
}) {
  const termo = searchQuery.toLowerCase().trim();

  const motosFiltradas = motos.filter((item) => {
    const modelo = item.modelo?.toLowerCase() || '';
    const placa = item.placa?.toLowerCase() || '';

    return (
      modelo.includes(termo) ||
      placa.includes(termo)
    );
  });

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{zona}</Text>
        <Text style={styles.modalSubtitle}>Total: {motosFiltradas.length} motos</Text>

        <TextInput
          placeholder="Buscar por modelo ou placa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        <FlatList
          data={motosFiltradas}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.motoItem}>
              <Text style={styles.itemText}>ID: {index + 1}</Text>
              <Text style={styles.itemText}>Modelo: {item.modelo}</Text>
              <Text style={styles.itemText}>Placa: {item.placa}</Text>
            </View>
          )}
        />

        <TouchableOpacity style={styles.fecharBotao} onPress={onClose}>
          <Text style={{ color: '#fff', fontSize: 19 }}>Fechar</Text>
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
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  motoItem: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 15,
    paddingVertical: 2,
  },
  fecharBotao: {
    backgroundColor: '#009B30',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
});