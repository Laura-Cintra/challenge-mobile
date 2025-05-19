import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/Home';
import MotoPark from '../pages/MotoPark';
import NovaMoto from '../pages/NovaMoto';
import Perfil from '../pages/Perfil';

import TabIcon from '../components/TabIcon';

import home from '../assets/icons/home.png';
import homeWhite from '../assets/icons/home-white.png';
import motoPark from '../assets/icons/moto-park.png';
import motoParkWhite from '../assets/icons/moto-park-white.png';
import moto from '../assets/icons/moto.png';
import motoWhite from '../assets/icons/moto-white.png';
import perfil from '../assets/icons/user.png';
import perfilWhite from '../assets/icons/user-white.png';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

const iconMap = {
  Home: { icon: home, iconFocused: homeWhite },
  MotoPark: { icon: motoPark, iconFocused: motoParkWhite },
  NovaMoto: { icon: moto, iconFocused: motoWhite },
  Perfil: { icon: perfil, iconFocused: perfilWhite },
};

export default function Menu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 2,
          borderTopColor: colors.borderTop,
          height: 65,
          position: 'absolute',
        },
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon={iconMap[route.name].icon}
            iconFocused={iconMap[route.name].iconFocused}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MotoPark" component={MotoPark} />
      <Tab.Screen name="NovaMoto" component={NovaMoto} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
