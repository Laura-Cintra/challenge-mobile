import { View, Text, StyleSheet, Button } from 'react-native';

export default function MotoPark() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pátio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6FFF9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009B30',
    marginBottom: 16,
  },
});