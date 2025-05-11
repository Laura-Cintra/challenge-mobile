import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

import MotoPark from './pages/MotoPark';
import Home from './pages/Home';
import NovaMoto from './pages/NovaMoto';
import Perfil from './pages/Perfil';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
            height: 70,
            position: 'absolute',
          },
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === 'Home') iconName = 'chart-bar';
            else if (route.name === 'MotoPark') iconName = 'parking';
            else if (route.name === 'NovaMoto') iconName = 'motorbike';
            else if (route.name === 'Perfil') iconName = 'account';

            return (
              <View
                style={{
                  backgroundColor: focused ? '#00B031' : 'transparent',
                  padding: 10,
                  borderRadius: 50,
                }}>
                <MaterialCommunityIcons
                  name={iconName}
                  size={focused ? 28 : 24}
                  color={focused ? 'white' : '#000F05'}
                />
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
    </NavigationContainer>
  );
}