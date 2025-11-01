import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MotiView } from "moti";

import Home from "../pages/Home";
import MotoPark from "../pages/MotoPark";
import Perfil from "../pages/Perfil";
import RegistrarFrota from "../pages/RegistrarFrota";

import TabIcon from "../components/TabIcon";

import home from "../../assets/icons/home.png";
import homeWhite from "../../assets/icons/home-white.png";
import motoPark from "../../assets/icons/moto-park.png";
import motoParkWhite from "../../assets/icons/moto-park-white.png";
import moto from "../../assets/icons/moto.png";
import motoWhite from "../../assets/icons/moto-white.png";
import perfil from "../../assets/icons/user.png";
import perfilWhite from "../../assets/icons/user-white.png";

import { useTheme } from "../providers/ThemeContext";

const Tab = createBottomTabNavigator();

export default function Menu() {
  const { theme, colors } = useTheme();

  const iconMap = {
    Home: { light: home, lightFocused: homeWhite, dark: homeWhite },
    MotoPark: {
      light: motoPark,
      lightFocused: motoParkWhite,
      dark: motoParkWhite,
    },
    RegistrarFrota: { light: moto, lightFocused: motoWhite, dark: motoWhite },
    Perfil: { light: perfil, lightFocused: perfilWhite, dark: perfilWhite },
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        animation: "fade",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 2,
          borderTopColor: colors.borderTop,
          height: 65,
          position: "absolute",
        },
        tabBarIcon: ({ focused }) => {
          const icons = iconMap[route.name];
          const icon =
            theme === "light"
              ? focused
                ? icons.lightFocused
                : icons.light
              : icons.dark;
          return (
            <MotiView
              from={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: "timing",
                duration: 300,
                delay: route.name === "Home" ? 0 : 150,
              }}
            >
              <TabIcon focused={focused} icon={icon} iconFocused={icon} />
            </MotiView>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MotoPark" component={MotoPark} />
      <Tab.Screen name="RegistrarFrota" component={RegistrarFrota} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}