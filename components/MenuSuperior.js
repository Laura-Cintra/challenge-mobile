import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo.png';
import logoutIcon from '../assets/icons/logout.png';
import { useUser } from '../providers/UserContext';

export default function MenuSuperior() {
  const navigation = useNavigation();
   const { logout } = useUser();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image
          source={logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={logoutIcon}
            style={styles.logoutIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F6FFF9',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoutIcon: {
    width: 26,
    height: 26,
    padding: 5,
  },
});
