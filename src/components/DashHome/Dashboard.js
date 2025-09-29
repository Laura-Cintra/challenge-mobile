import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useMotos } from "../../providers/UseMotos";
import { useUser } from "../../providers/UserContext";
import ProcurarMotoModal from "../ProcurarMotoModal";
import { useState } from "react";
import { useTheme } from "../../providers/ThemeContext";
import GraficoZonas from "./GraficoZonas";

export default function Dashboard() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { motos } = useMotos();
  const { colors } = useTheme();

  const total = motos.length;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.title }]}>
        Olá, {user?.nome}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Esses são os dados do seu pátio
      </Text>

      <View
        style={[
          styles.atalho,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <FontAwesome5 name="motorcycle" size={28} color={colors.secundary} />
        <View style={styles.atalhoContainer}>
          <Text style={[styles.atalhoText, { color: colors.textSecondary }]}>
            Total de motos
          </Text>

          <View>
            <Text style={[styles.total, { color: colors.secundary }]}>
              {total}
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.secundary }]}
              onPress={() => navigation.navigate("RegistrarFrota")}
            >
              <MaterialIcons
                name="add-circle-outline"
                size={20}
                color="#FBFBFB"
              />
              <Text style={[styles.buttonText, { color: "#FBFBFB" }]}>
                Nova Moto
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <GraficoZonas motos={motos} />

      <TouchableOpacity
        style={[styles.buttonSearch, { backgroundColor: colors.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.buttonTextSearch, { color: "#FBFBFB" }]}>
          Procurar Moto
        </Text>
      </TouchableOpacity>

      <ProcurarMotoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  atalho: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  atalhoContainer: {
    flex: 1,
  },
  atalhoText: {
    fontSize: 15,
  },
  total: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    width: "50%",
  },
  buttonText: {
    fontSize: 14,
    marginLeft: 6,
  },
  buttonSearch: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonTextSearch: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
});
