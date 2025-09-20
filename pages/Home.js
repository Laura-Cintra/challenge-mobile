import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import motosMockadas from '../data/motosMockadas';
import MenuSuperior from '../components/MenuSuperior';
import Dashboard from '../components/DashHome/Dashboard';
import ProcurarMotoModal from '../components/LocalizarMoto';

export default function Home() {
  const [loading, setLoading] = useState(true);

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

  if (loading) return null; // Evita renderizar com dados vazios

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MenuSuperior/>
        {/* <Dashboard/> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Procurar Moto</Text>
        </TouchableOpacity>

        {/* Modal */}
        <ProcurarMotoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: { 
    flex: 1, 
  },
  button: {
    backgroundColor: "#009B30",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});