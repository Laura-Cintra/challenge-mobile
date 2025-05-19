import { View, Image, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

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
    height: '30%',
    backgroundColor: colors.secundary,
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
    marginTop: 42,
    width: 200,
    height: 150,
  },
  card: {
    backgroundColor: colors.title,
    padding: 10,
    width: '100%',
    marginTop: 5,
  },
  cardText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
});
