import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';

import Home from '../pages/Home';
import MotoPark from '../pages/MotoPark';
import NovaMoto from '../pages/NovaMoto';
import Perfil from '../pages/Perfil';

import motoPark from '../assets/icons/moto-park-preto.png';
import motoParkWhite from '../assets/icons/moto-park-branco.png';

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#F6FFF9',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 65,
          position: 'absolute',
        },
        tabBarIcon: ({ focused }) => {
          const iconSize = focused ? 28 : 24;
          const isMotoPark = route.name === 'MotoPark';

          return (
            <View
              style={{
                backgroundColor: focused ? '#00B031' : 'transparent',
                padding: 10,
                borderRadius: 50,
                marginTop: 20,
                marginBottom: '2%',
              }}
            >
              {isMotoPark ? (
                <Image
                  source={focused ? motoParkWhite : motoPark}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    resizeMode: 'contain',
                  }}
                />
              ) : (
                <MaterialCommunityIcons
                  name={
                    route.name === 'Home'
                      ? 'chart-bar'
                      : route.name === 'NovaMoto'
                      ? 'motorbike'
                      : 'account'
                  }
                  size={iconSize}
                  color={focused ? 'white' : '#000F05'}
                />
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MotoPark" component={MotoPark} />
      <Tab.Screen name="NovaMoto" component={NovaMoto} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}