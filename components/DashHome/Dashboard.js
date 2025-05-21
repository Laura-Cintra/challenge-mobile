import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import GraficoZonas from './GraficoZonas';
import { useMotos } from '../../providers/UseMotos';
import { useUser } from '../../providers/UserContext';

export default function Dashboard() {
  const { user } = useUser();
  const navigation = useNavigation();

  const { motos } = useMotos();
  const total = motos.length;

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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NovaMoto')}>
                <MaterialIcons name="add-circle-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Nova Moto</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
    <GraficoZonas />
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
});