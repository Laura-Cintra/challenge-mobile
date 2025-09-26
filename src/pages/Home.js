import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import MenuSuperior from '../components/MenuSuperior';
import Dashboard from '../components/DashHome/Dashboard';
import ThemeToggleButton from '../components/ThemeToggleButton';

export default function Home() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MenuSuperior/>
        <Dashboard/>
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
  },
});