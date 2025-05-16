import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import PatioZonas from '../components/PatioZonas';

export default function NovaMoto() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <PatioZonas/>
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