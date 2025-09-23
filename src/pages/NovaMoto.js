import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CadMoto from '../components/CadastroMoto/CadMoto';
import MenuSuperior from '../components/MenuSuperior';

export default function NovaMoto() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <MenuSuperior/>
          <CadMoto/>
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
