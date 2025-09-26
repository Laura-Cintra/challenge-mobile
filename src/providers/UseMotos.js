import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPatioById, updateMoto, deleteMoto } from "../services/actions";
import { useUser } from "../providers/UserContext";

export function useMotos() {
  const { user } = useUser();
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const carregarMotos = async () => {
        if (!user?.idPatio) return;
        setLoading(true);
        try {
          const patio = await getPatioById(user.idPatio);
          const lista = patio?.motos || [];
          setMotos(lista);
          await AsyncStorage.setItem("lista_motos", JSON.stringify(lista));
        } catch (error) {
          console.error("Erro ao carregar motos:", error);
          const dados = await AsyncStorage.getItem("lista_motos");
          setMotos(dados ? JSON.parse(dados) : []);
        } finally {
          setLoading(false);
        }
      };
      carregarMotos();
    }, [user?.idPatio])
  );

  const atualizarMotos = async (novasMotos) => {
    setMotos(novasMotos);
    await AsyncStorage.setItem("lista_motos", JSON.stringify(novasMotos));
  };

  const editarMoto = async (id, dadosAtualizados) => {
    const motoAtualizada = await updateMoto(id, dadosAtualizados);
    const novasMotos = motos.map((m) =>
      m.id === id ? { ...m, ...motoAtualizada } : m
    );
    await atualizarMotos(novasMotos);
    return motoAtualizada;
  };

  const deletarMotoPorId = async (id) => {
    await deleteMoto(id);
    const novasMotos = motos.filter((m) => m.id !== id);
    await atualizarMotos(novasMotos);
  };

  return { motos, loading, atualizarMotos, editarMoto, deletarMotoPorId };
}