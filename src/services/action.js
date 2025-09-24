import axios from "axios";
import { Platform } from "react-native";

const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8080/api" // emulador Android
    : "http://localhost:8080/api"; // iOS simulator

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getMotos = async () => {
  try {
    const response = await api.get("/mottu/motos");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar motos:", error);
    throw error;
  }
};

export const getMotoById = async (id) => {
  try {
    const response = await api.get(`/mottu/motos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar moto por ID:", error);
    throw error;
  }
};
