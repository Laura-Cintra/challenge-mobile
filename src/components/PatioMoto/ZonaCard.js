import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../../theme/colors';

const screen_width = Dimensions.get('window').width;

export default function ZonaCard({ nome, cor, onPress, isDoubleSize }) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: cor },
        isDoubleSize && styles.doubleSize, // Se for a zona "Saguão", aplica o estilo para ocupar 2 zonas
      ]}
      onPress={() => onPress(nome)}
    >
      <Text style={styles.cardText}>{nome}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: screen_width / 2.22,
    height: screen_width / 2.41,
    borderRadius: 12,
    marginBottom: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doubleSize: {
    width: screen_width / 1.1,
    height: screen_width / 3.6,
  },
  cardText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});