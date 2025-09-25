import axios from "axios";
import { Platform } from "react-native";

const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8080/api" // emulador Android
    : "http://localhost:8080/api"; // iOS simulator

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ================= Motos =================

export async function getMotos(){
  try {
    const response = await api.get("/mottu/motos");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar motos:", error);
    throw error;
  }
};

export async function getMotoById(id){
  try {
    const response = await api.get(`/mottu/motos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar moto por ID:", error);
    throw error;
  }
};

export async function verificarMoto(placaOuChassi) {
  try {
    const response = await axios.get(`/verificarMoto/${placaOuChassi}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao verificar moto:", error);
    throw error;
  }
}

export async function vincularCarrapato(placaOuChassi) {
  try {
    const response = await axios.post(`/carrapato/vinculo/${placaOuChassi}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao vincular carrapato:", error);
    throw error;
  }
}

// ================= Zonas =================

export async function getZonas() {
  try {
    const response = await api.get("/zonas");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar zonas:", error);
    throw error;
  }
}

// ================= Pátios =================

export async function getPatios() {
  try {
    const response = await api.get("/patios");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar patios:", error);
    throw error;
  }
}

export async function getPatioById(id) {
  try {
    const response = await api.get(`/patios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pátio:", error);
    throw error;
  }
}

// ================= Usuários =================

export async function createUser(userData) {
  try {
    const response = await api.post("/usuarios", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}

export async function getUsers(){
  try {
    const response = await api.get("/usuarios");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export async function getUserById(){
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};

export async function updateUserApi(id, novosDados){
  try {
    const response = await api.put(`/usuarios/${id}`, novosDados);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

export async function deleteUserApi(id){
  try {
    await api.delete(`/usuarios/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
};