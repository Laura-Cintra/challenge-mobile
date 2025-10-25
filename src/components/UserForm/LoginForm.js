import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../providers/UserContext";
import { loginUser } from "../../services/actions";
import FormInput from "./FormInput";
import appLogo from "../../../assets/logo-app.png";
import appLogoDark from "../../../assets/logo-app-dark.png";
import { AntDesign } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import MessageModal from "../MessageModal";
import { useTheme } from "../../providers/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useUser();
  const { colors, theme } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setModalMessage(t("registration.fillInFields"));
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser(email, password);

      if (response) {
        await login(response);
        setModalMessage(t("login.success"));
        setIsSuccess(true);
        setModalVisible(true);
      }
    } catch (error) {
      const errorMessage = error?.mensagem || t("login.error");
      setModalMessage(errorMessage);
      setIsSuccess(false);
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logoSource = theme === "light" ? appLogo : appLogoDark;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.body}>
        <View style={styles.header}>
          <Image source={logoSource} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.form}>
          <Text style={[styles.formTitle, { color: colors.text }]}>
            {t("login.title")}
          </Text>

          <FormInput
            label={t("registration.email")}
            placeholder={t("registration.placeholderEmail")}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon={<Fontisto name="email" size={20} color={colors.secundary} />}
          />

          <FormInput
            label={t("registration.password")}
            placeholder={t("registration.placeholderPassword")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon={<AntDesign name="lock" size={21} color={colors.secundary} />}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.secundary }]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={[styles.buttonText, { color: colors.white }]}>
                {t("login.loginButton")}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={[styles.linkText, { color: colors.text }]}>
              {t("login.dontHaveAccount")}
              <Text style={[styles.link, { color: colors.primary }]}>
                {" "}
                {t("login.registerHere")}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
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
    marginVertical: 100,
  },
  header: {
    height: 180,
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
    paddingHorizontal: 20,
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