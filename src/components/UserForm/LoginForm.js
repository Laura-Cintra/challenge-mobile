import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useUser } from "../../providers/UserContext";
import FormInput from "./FormInput";
import appLogo from "../../../assets/logo-app.png";
import colors from "../../theme/colors";

import Fontisto from "@expo/vector-icons/Fontisto";
import { AntDesign } from "@expo/vector-icons";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      const mockUsers = [
        { id: 1, email: "maria@fiap.com", password: "123456", name: "Maria", patio: "butanta" },
        { id: 2, email: "joao@fiap.com", password: "654321", name: "João", patio: "x" },
      ];

      const user = mockUsers.find((u) => u.email === email && u.password === password);

      if (!user) {
        Alert.alert("Erro", "Email ou senha inválidos.");
        return;
      }

      await AsyncStorage.setItem("@user", JSON.stringify(user));
      login(user);
      navigation.replace("MainApp");
    } catch (error) {
      console.log("Erro no login:", error.message);
      Alert.alert("Erro", "Não foi possível fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={appLogo} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Login</Text>

        <FormInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          icon={<Fontisto name="email" size={20} color={colors.secundary} />}
        />

        <FormInput
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          icon={<AntDesign name="lock" size={21} color={colors.secundary} />}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.linkText}>
            Não possui conta?
            <Text style={styles.link}> Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    marginVertical: 100,
  },
  header: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 110,
    marginTop: 20,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.secundary,
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    marginTop: 15, 
    textAlign: "center", 
    color: colors.text,
  },
  link: {
    marginTop: 15, 
    textAlign: "center", 
    color: colors.primary,
  }
});