import { View, Image, Text, StyleSheet } from 'react-native';

export default function MotoHeader({ motos }) {
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177361.png' }}
        style={styles.pinIcon}
      />
      <Image
        source={{ uri: 'https://mottu.com.br/wp-content/uploads/2023/08/moto.webp' }}
        style={styles.motoImage}
        resizeMode="contain"
      />
      <View style={styles.card}>
        <Text style={styles.cardText}>Quantidade de motos no pátio: {motos.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: '35%',
    backgroundColor: '#1BA857',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinIcon: {
    position: 'absolute',
    top: 50,
    left: '85%',
    width: 40,
    height: 40,
    opacity: 0.4,
  },
  motoImage: {
    marginTop: 55,
    width: 200,
    height: 150,
  },
  card: {
    backgroundColor: '#000F05',
    padding: 15,
    shadowColor: '#000',
    width: '100%',
    marginTop: 5,
  },
  cardText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'light',
    textAlign: 'center',
  },
});
