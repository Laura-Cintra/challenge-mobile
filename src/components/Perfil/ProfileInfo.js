import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useUser } from '../../providers/UserContext';
import perfil from '../../../assets/icons/profile-user.png';
import colors from '../../theme/colors';
import { Foundation, FontAwesome5, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMotos } from '../../providers/UseMotos';
import ProcurarMotoModal from '../ProcurarMotoModal';
import EditarPerfilModal from './EditarPerfilModal';
import ExcluirPerfilModal from './ExcluirPerfilModal';
import { deleteUserApi, getPatioById } from '../../services/actions';

// ver sobre pátios!

export default function ProfileInfo() {
  const { user, logout, setUser } = useUser();
  const navigation = useNavigation();
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
        console.error('Erro ao buscar detalhes do pátio:', error);
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

  return (
    <View>
      <View style={styles.profileContainer}>
        <Image source={perfil} style={styles.profileImg} />
        <Text style={styles.name}>{user?.nome}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setEditarVisible(true)}
          >
            <Feather name="edit" size={20} color={colors.primary} />
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setConfirmDelete(true)}
          >
            <Feather name="trash-2" size={20} color={colors.modalRed} />
            <Text style={[styles.actionText, { color: colors.text }]}>
              Excluir
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.patioContainer}>
        <View style={styles.patioHeader}>
          <Entypo name="location-pin" size={24} color={colors.background} />
          <Text style={styles.patioTitle}>Filial</Text>
        </View>

        <View style={styles.patioDiv}>
          <Text style={styles.patioText}>
            Nome do Pátio: <Text>{user?.nomePatio || "Nome não disponível"}</Text>
          </Text>
          <Text style={styles.patioText}>
            Endereço: <Text>{patioDetails?.endereco || "Endereço não disponível"}</Text>
          </Text>
          <Text style={styles.patioText}>
            Motos no pátio: <Text style={styles.motoText}>{patioDetails?.motos.length || 0}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.atalhoContainer}>
        <Text style={styles.atalhoTitle}>Atalhos</Text>

        <View style={styles.atalhoIcons}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate('Home')}
          >
            <Foundation name="graph-bar" size={28} color={colors.secundary} />
            <Text style={styles.iconText}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate('MotoPark')}
          >
            <FontAwesome5 name="parking" size={28} color={colors.secundary} />
            <Text style={styles.iconText}>Ver Pátio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate('RegistrarFrota')}
          >
            <MaterialIcons
              name="add-circle-outline"
              size={28}
              color={colors.secundary}
            />
            <Text style={styles.iconText}>Registrar Moto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.icon}
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons name="search" size={28} color={colors.secundary} />
            <Text style={styles.iconText}>Localizar Moto</Text>
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

      <ExcluirPerfilModal
        visible={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDeleteAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 40,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.buttonBackground,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  patioContainer: {
    marginHorizontal: 30,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  patioHeader: {
    backgroundColor: colors.secundary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  patioTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  patioDiv: {
    backgroundColor: colors.white,
    padding: 16,
  },
  patioText: {
    fontSize: 15,
    marginVertical: 5,
  },
  motoText: {
    fontWeight: 'bold',
    color: colors.text,
  },
  atalhoContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  atalhoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.title,
    marginVertical: 15,
  },
  atalhoIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  icon: {
    padding: 20,
    alignItems: 'center',
    width: '48%',
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  iconText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
  },
  confirmDeleteButton: {
    marginTop: 15,
    backgroundColor: colors.modalRed,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmDeleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});