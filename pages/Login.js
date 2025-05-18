import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginUser/LoginForm';

export default function Login() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LoginForm/>
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