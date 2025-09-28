import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import logoDark from '../../assets/logo-dark.png';
import logoutIcon from '../../assets/icons/logout.png';
import logoutIconDark from '../../assets/icons/logout-dark.png';
import { useUser } from '../providers/UserContext';
import { useTheme } from '../providers/ThemeContext';

export default function MenuSuperior() {
  const navigation = useNavigation();
  const { logout } = useUser();
  const { colors, theme } = useTheme();

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <View style={[styles.header, { borderColor: colors.border }]}>
        <TouchableOpacity onPress={handleHome}>
          <Image
            source={theme === 'light' ? logo : logoDark}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={theme === 'light' ? logoutIcon : logoutIconDark}
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