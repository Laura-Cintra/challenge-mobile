import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../services/firebaseConfig";

import { useUser } from "../../providers/UserContext";
import FormInput from "./FormInput";
import appLogo from '../../../assets/logo-app.png';
import colors from "../../theme/colors";

import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import MessageModal from "../MessageModal";
import { Picker } from "@react-native-picker/picker";

export default function CadastroForm() {
  const navigation = useNavigation();
  const { login } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [patio, setPatio] = useState("");
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  const patiosDisponiveis = [
    { id: "1", nome: "Pátio Butantã" },
    { id: "2", nome: "Pátio X" },
    { id: "3", nome: "Pátio Centro" },
  ];

  const handleCadastro = async () => {
    if (!name || !email || !password || !patio) {
        setModalMessage("Preencha todos os campos.");
        setIsSuccess(false);
        setModalVisible(true);
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        const user = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name,
        patio,
        };

        await AsyncStorage.setItem("@user", JSON.stringify(user));
        login(user);

        setModalMessage("Cadastro realizado com sucesso!");
        setIsSuccess(true);
        setModalVisible(true);
    } catch (error) {
        console.log("Erro no cadastro:", error.message);
        setModalMessage("Erro ao cadastrar. Verifique os dados.");
        setIsSuccess(false);
        setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={appLogo} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Cadastro</Text>

        <FormInput
          label="Nome"
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
          icon={<AntDesign name="user" size={20} color={colors.secundary} />}
        />

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

        <Text style={styles.label}>Pátio</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={patio}
            onValueChange={(value) => setPatio(value)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um pátio..." value="" />
            {patiosDisponiveis.map((p) => (
              <Picker.Item key={p.id} label={p.nome} value={p.nome} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>
            Já possui conta? 
            <Text style={styles.link}> Fazer login</Text>
          </Text>
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
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  header: { 
    height: 180, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  logo: { 
    width: 160, 
    height: 110, 
    marginTop: 20 
  },
  form: { 
    flex: 1, 
    padding: 20 
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.text,
    marginTop: 15,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  picker: {
    height: 54,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: colors.secundary,
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { 
    color: colors.white, 
    fontWeight: "bold", 
    fontSize: 16 
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