import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CadastroForm from '../components/UserForm/CadForm';

export default function Cadastro() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <CadastroForm/>
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