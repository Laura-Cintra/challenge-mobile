import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from "./src/components/Menu";
import Login from "./src/pages/Login";
import Cadastro from "./src/pages/Cadastro";
import UserProvider, { useUser } from "./src/providers/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/providers/ThemeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/services/i18n";

const Stack = createNativeStackNavigator();

function Routes() {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </>
      ) : (
        <Stack.Screen name="MainApp" component={Menu} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <UserProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </UserProvider>
        </ThemeProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}