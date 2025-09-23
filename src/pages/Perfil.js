import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import MenuSuperior from '../components/MenuSuperior';
import ProfileInfo from '../components/ProfileInfo';

export default function Perfil() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <MenuSuperior/>
          <ProfileInfo/>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: { 
    flex: 1, 
  }
});
