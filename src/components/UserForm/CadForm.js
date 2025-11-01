import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../providers/UserContext";
import { createUser, getPatios } from "../../services/actions";
import FormInput from "./FormInput";
import InputSelectDropdown from "./InputSelect";
import appLogo from "../../../assets/logo-app.png";
import appLogoDark from "../../../assets/logo-app-dark.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import MessageModal from "../MessageModal";
import { useTheme } from "../../providers/ThemeContext";
import { useTranslation } from "react-i18next";
import { MotiView, MotiText, MotiImage } from "moti";

export default function CadastroForm() {
  const navigation = useNavigation();
  const { login } = useUser();
  const { colors, theme } = useTheme();
  const { t } = useTranslation();

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
        const formatted = patios.map((p) => ({ value: p.id.toString(), label: p.nome }));
        setPatiosDisponiveis(formatted);
      } catch (error) {
        console.error("Erro ao carregar pátios:", error);
      }
    };
    fetchPatios();
  }, []);

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  const isValidPassword = (password) => password.length >= 6;

  const handleCadastro = async () => {
    if (!name || !email || !password || !patio) {
      setModalMessage(t("registration.fillInFields"));
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    if (!isValidEmail(email)) {
      setModalMessage(t("registration.invalidEmail"));
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    if (!isValidPassword(password)) {
      setModalMessage(t("registration.shortPassword"));
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    try {
      const userData = {
        nome: name,
        email,
        senha: password,
        idPatio: parseInt(patio),
      };

      const novoUser = await createUser(userData);
      login(novoUser);

      setModalMessage(t("registration.success"));
      setIsSuccess(true);
      setModalVisible(true);

      setTimeout(() => navigation.replace("MainApp"), 1000);
    } catch (error) {
      console.log("Erro no cadastro:", error.message);
      setModalMessage(t("registration.error"));
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  const logoSource = theme === "light" ? appLogo : appLogoDark;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.body}>
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
          style={styles.header}
        >
          <MotiImage
            source={logoSource}
            style={styles.logo}
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 150 }}
            resizeMode="contain"
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 400, type: "timing", duration: 500 }}
          style={styles.form}
        >
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 450 }}
            style={[styles.formTitle, { color: colors.text }]}
          >
            {t("registration.title")}
          </MotiText>

          <MotiView from={{ opacity: 0, translateY: 15 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 600 }}>
            <FormInput
              label={t("registration.name")}
              placeholder={t("registration.placeholderName")}
              value={name}
              onChangeText={setName}
              icon={<AntDesign name="user" size={20} color={colors.secundary} />}
            />
          </MotiView>

          <MotiView from={{ opacity: 0, translateY: 15 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 750 }}>
            <FormInput
              label={t("registration.email")}
              placeholder={t("registration.placeholderEmail")}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              icon={<Fontisto name="email" size={20} color={colors.secundary} />}
            />
          </MotiView>

          <MotiView from={{ opacity: 0, translateY: 15 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 900 }}>
            <FormInput
              label={t("registration.password")}
              placeholder={t("registration.placeholderPassword")}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              icon={<AntDesign name="lock" size={21} color={colors.secundary} />}
            />
          </MotiView>

          <InputSelectDropdown
            label={t("registration.patio")}
            selectedValue={patio}
            onValueChange={setPatio}
            items={patiosDisponiveis}
          />

          <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1200, type: "spring" }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.secundary }]}
              onPress={handleCadastro}
            >
              <Text style={[styles.buttonText, { color: colors.white }]}>
                {t("registration.registerButton")}
              </Text>
            </TouchableOpacity>
          </MotiView>

          <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1400 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.linkText, { color: colors.text }]}>
                {t("registration.alreadyHaveAccount")}
                <Text style={[styles.link, { color: colors.primary }]}>
                  {" "}
                  {t("registration.login")}
                </Text>
              </Text>
            </TouchableOpacity>
          </MotiView>
        </MotiView>
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
    width: "100%",
  },
  body: {
    marginVertical: 30,
  },
  header: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    marginTop: 15,
    textAlign: "center",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
  },
});
