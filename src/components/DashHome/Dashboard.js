import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import GraficoZonas from './GraficoZonas';
import { useMotos } from '../../providers/UseMotos';
import { useUser } from '../../providers/UserContext';
import ProcurarMotoModal from '../ProcurarMotoModal';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { user } = useUser();
  const navigation = useNavigation();

  const { motos } = useMotos();
  const total = motos.length;
  const [modalVisible, setModalVisible] = useState(false);

    // inserir mock de motos automaticamente quando não encontrar nenhuma registro
  useEffect(() => {
    const inicializarMotos = async () => {
      const dados = await AsyncStorage.getItem('lista_motos');
      if (!dados || JSON.parse(dados).length === 0) {
        await AsyncStorage.setItem('lista_motos', JSON.stringify(motosMockadas));
      }
      setLoading(false); // Sinaliza que os dados estão prontos
    };

    inicializarMotos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {user?.name}</Text>
      <Text style={styles.subtitle}>Esses são os dados do seu pátio</Text>
        
    <View style={styles.atalho}>
        <FontAwesome5 name="motorcycle" size={28} color={colors.secundary} />
        <View style={styles.atalhoContainer}>
            <Text style={styles.atalhoText}>Total de motos</Text>
            
            <View>
            <Text style={styles.total}>{total}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegistrarFrota')}>
                <MaterialIcons name="add-circle-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Nova Moto</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
    <GraficoZonas />

    <TouchableOpacity
      style={styles.buttonSearch}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.buttonTextSearch}>Procurar Moto</Text>
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
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.title,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  atalho: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  atalhoContainer: {
    flex: 1,
  },
  atalhoText: {
    fontSize: 15,
    color: '#333',
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secundary,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secundary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
  },
  buttonSearch: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonTextSearch: {
    color: colors.background,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
});