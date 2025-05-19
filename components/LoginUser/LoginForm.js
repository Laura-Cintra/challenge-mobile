import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageModal from "../MessageModal";
import InputField from "./LoginInput";
import { useUser } from "../../providers/UserContext";
import appLogo from '../../assets/logo-app.png';
import { useNavigation } from '@react-navigation/native';
import colors from "../../theme/colors";

export default function LoginForm() {
   const navigation = useNavigation();

  const users = [
    { email: "maria@fiap.com", password: "RM558832" },
    { email: "vinicius@fiap.com", password: "RM554456" },
    { email: "laura@fiap.com", password: "RM558843" },
  ];

  const { setUser } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async () => {
    if (!name || !email || !password || !adress) {
      setModalMessage("Preencha todos os campos.");
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const userData = { name, email, adress };
      await AsyncStorage.setItem("usuario", JSON.stringify(userData));
      setUser(userData);
      setIsSuccess(true);
      setTimeout(() => {
        navigation.replace('MainApp');
      }, 100);
    } else {
      setModalMessage("Email ou senha inválidos.");
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  return (
    <View>
        <View style={styles.header}>
        <Image
            source={appLogo}
            style={styles.logo}
            resizeMode="contain"
        />
        </View>

        <View style={styles.form}>
            <Text style={styles.formTitle}>Login</Text>

            <InputField
                label="Nome"
                placeholder="Digite seu nome"
                value={name}
                onChangeText={setName}
                icon={<AntDesign name="user" size={20} color={colors.secundary} />}
            />

            <InputField
                label="E-mail"
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                icon={<Fontisto name="email" size={20} color={colors.secundary} />}
            />

            <InputField
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                icon={<EvilIcons name="lock" size={26} color={colors.secundary} />}
            />

            <InputField
                label="Endereço do Pátio"
                placeholder="Digite o endereço do pátio"
                value={adress}
                onChangeText={setAdress}
                icon={<AntDesign name="enviromento" size={20} color={colors.secundary} />}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>

      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        isSuccess={isSuccess}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-evenly',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  saveButton: {
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
});