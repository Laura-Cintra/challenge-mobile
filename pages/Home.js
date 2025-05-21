import { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import motosMockadas from '../data/motosMockadas';
import MenuSuperior from '../components/MenuSuperior';
import Dashboard from '../components/DashHome/Dashboard';

export default function Home() {

  // inserir mock de motos automaticamente quando não encontrar nenhuma registro
  useEffect(() => {
    const inicializarMotos = async () => {
      const dados = await AsyncStorage.getItem('lista_motos');
      if (!dados || JSON.parse(dados).length === 0) {
        await AsyncStorage.setItem('lista_motos', JSON.stringify(motosMockadas));
      }
    };

    inicializarMotos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MenuSuperior/>
        <Dashboard/>
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
  }
});