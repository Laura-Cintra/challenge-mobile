import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../../theme/colors';

const screen_width = Dimensions.get('window').width;

export default function ZonaCard({ nome, cor, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cor }]}
      onPress={() => onPress(nome)}
    >
      <Text style={styles.cardText}>{nome}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: screen_width / 2.22,
    height: screen_width / 2.22,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});