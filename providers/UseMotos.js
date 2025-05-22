import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useMotos() {
  const [motos, setMotos] = useState([]);

  // atualizar a quantidade de motos em tempo real - dispara a função sempre que a tela é focada
  useFocusEffect(
    useCallback(() => {
      const carregarMotos = async () => {
        try {
          const dados = await AsyncStorage.getItem('lista_motos');
          const lista = dados ? JSON.parse(dados) : [];
          setMotos(lista);
        } catch (error) {
          console.error('Erro ao carregar motos:', error);
        }
      };

      carregarMotos();
    }, [])
  );

  const atualizarMotos = async (novasMotos) => {
    try {
      await AsyncStorage.setItem('lista_motos', JSON.stringify(novasMotos));
      setMotos(novasMotos);
    } catch (error) {
      console.error('Erro ao salvar motos:', error);
    }
  };

  return { motos, atualizarMotos };
}
