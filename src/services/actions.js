import axios from "axios";
import { zonasMap } from "../data/zonas";

const API_BASE_URL = "https://mottu-3-6-7.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Função para pegar as mensagens de erros de API
function handleApiError(error, defaultMessage) {
  const mensagem =
    error.response?.data?.mensagem ||
    error.message ||
    defaultMessage ||
    "Erro inesperado.";
  const status = error.response?.status || 500;
  return { mensagem, status, raw: error };
}

// ================= Motos =================

export async function getMotos() {
  try {
    const response = await api.get("/mottu/motos");
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Erro ao buscar motos:");
  }
}

export async function getMotoById(id) {
  try {
    const response = await api.get(`/motos/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Erro ao buscar moto com id ${id}:`);
  }
}

export async function createMoto(dados) {
  try {
    const response = await api.post("/motos", dados);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Erro ao criar moto:");
  }
}

export async function updateMoto(id, dados) {
  try {
    const response = await api.put(`/motos/${id}`, dados);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Erro ao atualizar moto ${id}:`);
  }
}

export async function deleteMoto(id) {
  try {
    await api.delete(`/motos/${id}`);
    return true;
  } catch (error) {
    throw handleApiError(error, `Erro ao deletar moto ${id}:`);
  }
}

// ================= Zonas =================

export async function getZonas() {
  try {
    const response = await api.get("/zonas");
    const data = response.data;
    return Object.values(data).map((id) => ({
      id,
      ...zonasMap[id],
    }));
  } catch (error) {
    throw handleApiError(error, "Erro ao buscar zonas:");
  }
}

// ================= Modelos Moto =================

export async function getModelos() {
  try {
    const response = await api.get("/modelos-moto");
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Erro ao buscar modelos:");
  }
}

// ================= Pátios =================

export async function getPatios() {
  try {
    const response = await api.get("/patios");
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Erro ao buscar pátios:");
  }
}

export async function getPatioById(id) {
  try {
    const response = await api.get(`/patios/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Erro ao buscar pátio com id ${id}:`);
  }
}

// ================= Usuários =================

export async function createUser(userData) {
  try {
    const response = await api.post("/usuarios", userData);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Erro ao criar usuário:");
  }
}

export async function getUsers() {
  try {
    const response = await api.get("/usuarios");
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Erro ao buscar usuários:");
  }
}

export async function getUserById() {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Erro ao buscar usuário com id ${id}:`);
  }
}

export async function loginUser(email, senha) {
  try {
    const response = await api.post("/usuarios/login", { email, senha });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw { mensagem: "Sem conexão com o servidor", status: 0 };
    }
    if (error.response.status >= 500) {
      throw { mensagem: "Servidor fora do ar", status: error.response.status };
    }
    throw {
      mensagem: error.response?.data?.mensagem || "Email ou senha inválidos.",
      status: error.response?.status || 400,
    };
  }
}

export async function updateUserApi(id, novosDados) {
  try {
    const response = await api.put(`/usuarios/${id}`, novosDados);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Erro ao atualizar o usuário:");
  }
}

export async function deleteUserApi(id) {
  try {
    await api.delete(`/usuarios/${id}`);
    return true;
  } catch (error) {
    throw handleApiError(error, `Erro ao excluir usuário com id ${id}:`);
  }
}