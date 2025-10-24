import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useUser } from "../../providers/UserContext";
import perfil from "../../../assets/icons/profile-user.png";
import perfilWhite from "../../../assets/icons/profile-user-white.png";
import {
  Foundation,
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ProcurarMotoModal from "../ProcurarMotoModal";
import EditarPerfilModal from "./EditarPerfilModal";
import { deleteUserApi, getPatioById } from "../../services/actions";
import ConfirmarExclusaoModal from "../ConfirmarExclusaoModal";
import { useTheme } from "../../providers/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ProfileInfo() {
  const { user, logout } = useUser();
  const navigation = useNavigation();
  const { colors, theme } = useTheme();
  const { t } = useTranslation();
  const [patioDetails, setPatioDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchPatioDetails = async () => {
      try {
        const patioData = await getPatioById(user?.idPatio);
        setPatioDetails(patioData);
      } catch (error) {
        console.error("Erro ao buscar detalhes do pátio:", error);
      }
    };

    if (user?.idPatio) {
      fetchPatioDetails();
    }
  }, [user]);

  const handleDeleteAccount = async () => {
    try {
      await deleteUserApi(user.idUsuario);
      await logout();
      setConfirmDelete(false);
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    }
  };

  const logoSource = theme === "light" ? perfil : perfilWhite;

  return (
    <View style={{ backgroundColor: colors.background, height: "100%" }}>
      <View style={styles.profileContainer}>
        <Image source={logoSource} style={styles.profileImg} />
        <Text style={[styles.name, { color: colors.text }]}>{user?.nome}</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {user?.email}
        </Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setEditarVisible(true)}
          >
            <Feather name="edit" size={20} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text }]}>
              {t("profile.edit")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setConfirmDelete(true)}
          >
            <Feather name="trash-2" size={20} color={colors.modalRed} />
            <Text style={[styles.actionText, { color: colors.text }]}>
              {t("profile.delete")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.patioContainer, { borderColor: colors.border }]}>
        <View style={[styles.patioHeader, { backgroundColor: colors.secundary }]}>
          <Entypo name="location-pin" size={24} color="#FBFBFB" />
          <Text style={styles.patioTitle}>
            {t("profile.parking", { nome: user?.nomePatio || "—" })}
          </Text>
        </View>

        <View style={[styles.patioDiv, { backgroundColor: colors.white }]}>
          <Text style={[styles.patioText, { color: colors.text }]}>
            {t("profile.address")}:{" "}
            <Text style={[styles.patioItemText, { color: colors.textSecondary }]}>
              {patioDetails?.endereco || "—"}
            </Text>
          </Text>
          <Text style={[styles.patioText, { color: colors.text }]}>
            {t("profile.motorcyclesInParking")}:{" "}
            <Text style={[styles.patioItemText, { color: colors.textSecondary }]}>
              {patioDetails?.motos?.length || 0}
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.atalhoContainer}>
        <Text style={[styles.atalhoTitle, { color: colors.title }]}>
          {t("profile.shortcuts")}
        </Text>

        <View style={styles.atalhoIcons}>
          <TouchableOpacity
            style={[styles.icon, { backgroundColor: colors.white }]}
            onPress={() => navigation.navigate("Home")}
          >
            <Foundation name="graph-bar" size={28} color={colors.secundary} />
            <Text style={[styles.iconText, { color: colors.text }]}>
              {t("profile.dashboard")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.icon, { backgroundColor: colors.white }]}
            onPress={() => navigation.navigate("MotoPark")}
          >
            <FontAwesome5 name="parking" size={28} color={colors.secundary} />
            <Text style={[styles.iconText, { color: colors.text }]}>
              {t("profile.viewParking")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.icon, { backgroundColor: colors.white }]}
            onPress={() => navigation.navigate("RegistrarFrota")}
          >
            <MaterialIcons
              name="add-circle-outline"
              size={28}
              color={colors.secundary}
            />
            <Text style={[styles.iconText, { color: colors.text }]}>
              {t("profile.registerMotorcycle")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.icon, { backgroundColor: colors.white }]}
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons name="search" size={28} color={colors.secundary} />
            <Text style={[styles.iconText, { color: colors.text }]}>
              {t("profile.locateMotorcycle")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ProcurarMotoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <EditarPerfilModal
        visible={editarVisible}
        onClose={() => setEditarVisible(false)}
      />

      <ConfirmarExclusaoModal
        visible={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDeleteAccount}
        mensagem={t("profile.confirmAccountDeletion")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 40,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 15,
    gap: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  patioContainer: {
    marginHorizontal: 22,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
  },
  patioHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  patioTitle: {
    color: "#FBFBFB",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  patioDiv: {
    padding: 16,
  },
  patioText: {
    fontSize: 15,
    marginVertical: 5,
    fontWeight: "bold",
  },
  patioItemText: {
    fontSize: 14.5,
    fontWeight: "light",
    lineHeight: 22,
  },
  atalhoContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  atalhoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  atalhoIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  icon: {
    padding: 20,
    alignItems: "center",
    width: "48%",
    borderRadius: 10,
    marginBottom: 10,
  },
  iconText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 13,
  },
  confirmDeleteButton: {
    marginTop: 15,
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmDeleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});