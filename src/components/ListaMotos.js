import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../providers/ThemeContext";
import { useTranslation } from "react-i18next";
import { MotiView, MotiText } from "moti";

export default function ListaMotos({
  titulo,
  motos = [],
  busca = "",
  setBusca = () => {},
  selected,
  onLocalizar = () => {},
  onParar = () => {},
  onDelete = () => {},
  onEdit = () => {},
  mostrarFiltro = true,
  permitirEditar = false,
  permitirExcluir = false,
  permitirLocalizar = true,
}) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const textoBusca = (busca || "").toLowerCase().trim();
  const motosFiltradas = textoBusca
    ? motos.filter(
        (moto) =>
          (moto?.placa || "").toLowerCase().includes(textoBusca) ||
          (moto?.modelo || "").toLowerCase().includes(textoBusca) ||
          (moto?.chassi || "").toLowerCase().includes(textoBusca)
      )
    : motos;

  return (
    <View style={{ flex: 1 }}>
      {titulo && (
        <Text style={[styles.modalTitle, { color: colors.text }]}>
          {titulo}
        </Text>
      )}

      {mostrarFiltro && (
        <TextInput
          placeholder={
            motos.some((moto) => moto.zona === 3)
              ? t("motorcycleList.placeholderChassi")
              : t("motorcycleList.placeholderLicensePlate")
          }
          placeholderTextColor={colors.placeholder}
          value={busca}
          onChangeText={setBusca}
          style={[
            styles.searchInput,
            {
              borderColor: colors.border,
              backgroundColor: colors.white,
              color: colors.text,
            },
          ]}
        />
      )}

      {textoBusca.length > 0 && motosFiltradas.length === 0 && (
        <Text style={[styles.errorMessage, { color: colors.modalRed }]}>
          {t("motorcycleList.notFound")}
        </Text>
      )}

      <FlatList
        data={motosFiltradas}
        keyExtractor={(item, i) =>
          item?.idCarrapato || item?.id?.toString() || i.toString()
        }
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 120, type: "timing", duration: 300 }}
            style={[
              styles.item,
              { backgroundColor: colors.white, shadowColor: colors.text },
            ]}
          >
            <View>
              {item?.idCarrapato && (
                <MotiText
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 50 + index * 80 }}
                  style={[styles.deviceText, { color: colors.textSecondary }]}
                >
                  {t("motorcycleList.iot")}: {item.idCarrapato}
                </MotiText>
              )}

              {item?.zona === 3 ? (
                <Text style={[styles.text, { color: colors.text }]}>
                  {t("motorcycleList.chassi")}: {item.chassi}
                </Text>
              ) : (
                <Text style={[styles.text, { color: colors.text }]}>
                  {t("editMotorcycle.licensePlate")}: {item?.placa}
                </Text>
              )}

              {item?.modelo && (
                <Text
                  style={[styles.deviceText, { color: colors.textSecondary }]}
                >
                  {t("editMotorcycle.model")}: {item.modelo}
                </Text>
              )}
            </View>

            <View style={styles.buttonsContainer}>
              {permitirLocalizar &&
                (selected === item?.placa ? (
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: colors.modalRed },
                    ]}
                    onPress={() => onParar(item)}
                  >
                    <Text style={styles.buttonText}>
                      {t("motorcycleList.stop")}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.primary }]}
                    onPress={() => onLocalizar(item)}
                  >
                    <Text style={styles.buttonText}>
                      {t("motorcycleList.locate")}
                    </Text>
                  </TouchableOpacity>
                ))}

              {permitirEditar && (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => onEdit(item)}
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={20}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}

              {permitirExcluir && (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => onDelete(item)}
                >
                  <Feather name="trash-2" size={20} color={colors.modalRed} />
                </TouchableOpacity>
              )}
            </View>
          </MotiView>
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
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 15,
  },
  item: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 8,
    marginBottom: 14,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  deviceText: {
    fontSize: 13,
    marginTop: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});