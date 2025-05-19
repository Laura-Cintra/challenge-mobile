import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import motosMockadas from '../data/motosMockadas';

export default function Home() {
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
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6FFF9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009B30',
  },
});