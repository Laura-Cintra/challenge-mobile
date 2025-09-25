import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../providers/UserContext";
import { createUser, getPatios } from "../../services/actions";
import FormInput from "./FormInput";
import InputSelect from "./InputSelect";
import appLogo from "../../../assets/logo-app.png";
import colors from "../../theme/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import MessageModal from "../MessageModal";

export default function CadastroForm() {
  const navigation = useNavigation();
  const { login } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [patio, setPatio] = useState("");
  const [patiosDisponiveis, setPatiosDisponiveis] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchPatios = async () => {
      try {
        const patios = await getPatios();
        const formattedPatios = patios.map((patio) => ({
          value: patio.id.toString(),
          label: patio.nome,
        }));
        setPatiosDisponiveis(formattedPatios);
      } catch (error) {
        console.error("Erro ao carregar os pátios:", error);
      }
    };
    fetchPatios();
  }, []);

  const handleCadastro = async () => {
    if (!name || !email || !password || !patio) {
      setModalMessage("Preencha todos os campos.");
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    try {
      const userData = {
        nome: name,
        email: email,
        senha: password,
        idPatio: parseInt(patio),
      };

      const novoUser = await createUser(userData);
      login(novoUser);

      setModalMessage("Cadastro realizado com sucesso!");
      setIsSuccess(true);
      setModalVisible(true);

      setTimeout(() => {
        navigation.replace("MainApp");
      }, 1000);
    } catch (error) {
      console.log("Erro no cadastro:", error.message);
      setModalMessage("Erro ao cadastrar. Tente novamente.");
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
        <InputSelect
          label="Pátio"
          selectedValue={patio}
          onValueChange={(value) => setPatio(value)}
          items={patiosDisponiveis}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>
            Já possui conta?<Text style={styles.link}> Fazer login</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <MessageModal visible={modalVisible} message={modalMessage} isSuccess={isSuccess} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background,
    width: '100%',
    marginVertical: 30,
  },
  header: { 
    height: 150, 
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