import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import MenuSuperior from '../components/MenuSuperior';
import RegistrarMoto from '../components/RegistroFrota/RegistrarMoto';
import ThemeToggleButton from '../components/ThemeToggleButton';

export default function RegistrarFrota() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <MenuSuperior/>
          <RegistrarMoto/>
          <ThemeToggleButton/>
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