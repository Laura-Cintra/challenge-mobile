import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function InputField({ label, value, onChangeText, icon, ...props }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.placeholder}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 15,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    color: colors.text,
  },
});
