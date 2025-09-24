import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMotos } from '../services/action';

export function useMotos() {
  const [motos, setMotos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const carregarMotos = async () => {
        try {
          const lista = await getMotos();
          setMotos(lista);
          await AsyncStorage.setItem("lista_motos", JSON.stringify(lista));
        } catch (error) {
          console.error("Erro ao carregar motos da API:", error);
          const dados = await AsyncStorage.getItem("lista_motos");
          const lista = dados ? JSON.parse(dados) : [];
          setMotos(lista);
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

  const adicionarMoto = async (novaMoto) => {
    try {
      const novasMotos = [...motos, { id: Date.now().toString(), ...novaMoto }];
      await atualizarMotos(novasMotos);
    } catch (error) {
      console.error('Erro ao adicionar moto:', error);
    }
  };

  const editarMoto = async (motoEditada) => {
    try {
      const novasMotos = motos.map(moto =>
        moto.id === motoEditada.id ? { ...moto, ...motoEditada } : moto
      );
      await atualizarMotos(novasMotos);
    } catch (error) {
      console.error('Erro ao editar moto:', error);
    }
  };

  const deletarMotoPorId = async (id) => {
    try {
      const novasMotos = motos.filter(moto => moto.id !== id);
      await atualizarMotos(novasMotos);
    } catch (error) {
      console.error('Erro ao deletar moto:', error);
    }
  };

  return { motos, atualizarMotos, adicionarMoto, editarMoto, deletarMotoPorId };
}