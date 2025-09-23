import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import logoutIcon from '../../assets/icons/logout.png';
import { useUser } from '../providers/UserContext';
import colors from '../theme/colors';

export default function MenuSuperior() {
  const navigation = useNavigation();
  const { logout } = useUser();

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHome}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderColor: colors.border,
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
