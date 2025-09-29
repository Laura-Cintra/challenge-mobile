import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUser,
  updateUserApi,
  deleteUserApi,
  getUserById,
} from "../services/actions";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const updateUser = async (novosDados) => {
    try {
      if (!user?.idUsuario) throw new Error("Usuário não possui ID.");

      const usuarioAtualizado = await updateUserApi(user.idUsuario, {
        ...user,
        ...novosDados,
      });

      await AsyncStorage.setItem("@user", JSON.stringify(usuarioAtualizado));
      setUser(usuarioAtualizado);

      return usuarioAtualizado;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  };

  const deleteUser = async () => {
    try {
      if (!user?.idUsuario) throw new Error("Usuário não possui ID.");
      await deleteUserApi(user.idUsuario);

      await AsyncStorage.removeItem("@user");
      setUser(null);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);