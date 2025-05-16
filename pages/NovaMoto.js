import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CadMoto from '../components/CadMoto';

export default function NovaMoto() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
