import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ListaMotos({
  titulo,
  motos,
  busca,
  setBusca,
  selected,
  onLocalizar,
  onParar,
  mostrarFiltro = true,
}) {
  const textoBusca = busca.toLowerCase().trim();

  const motosFiltradas = textoBusca
    ? motos.filter(
        (moto) =>
          moto.placa.toLowerCase().includes(textoBusca) ||
          moto.deviceId?.toLowerCase().includes(textoBusca) ||
          moto.id?.toString().includes(textoBusca)
      )
    : motos;

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.modalTitle}>{titulo}</Text>

      {mostrarFiltro && (
        <TextInput
          placeholder="Digite a placa, ID ou modelo"
          value={busca}
          onChangeText={setBusca}
          style={styles.searchInput}
        />
      )}

      {textoBusca.length > 0 && motosFiltradas.length === 0 && (
        <Text style={styles.errorMessage}>Moto não encontrada</Text>
      )}

      <FlatList
        data={motosFiltradas}
        keyExtractor={(item, i) => item.deviceId || item.id?.toString() || i.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.text}>Placa: {item.placa}</Text>
              {item.deviceId && (
                <Text style={styles.deviceText}>Device: {item.deviceId}</Text>
              )}
              {item.modelo && (
                <Text style={styles.deviceText}>Modelo: {item.modelo}</Text>
              )}
            </View>

            <View style={styles.buttonsContainer}>
              {selected === item.placa ? (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "red" }]}
                  onPress={() => onParar(item)}
                >
                  <Text style={styles.buttonText}>Parar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#009B30" }]}
                  onPress={() => onLocalizar(item)}
                >
                  <Text style={styles.buttonText}>Localizar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  errorMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
    marginVertical: 15,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  deviceText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});