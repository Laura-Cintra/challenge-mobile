import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../../theme/colors';

export default function MotoForm({
  modelo,
  setModelo,
  placa,
  setPlaca,
  zona,
  setZona,
  salvarMoto,
  limparFormulario,
}) {
  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Cadastrar Moto</Text>

      <Text style={styles.label}>Modelo</Text>
      <View style={styles.selectBorder}>
        <Picker
          selectedValue={modelo}
          onValueChange={setModelo}
          style={{ color: modelo === '' ? `${colors.placeholder}` : `${colors.text}` }}
        >
          <Picker.Item label="Selecione um modelo" value="" />
          <Picker.Item label="Mottu Pop" value="Mottu Pop" />
          <Picker.Item label="Mottu Sport" value="Mottu Sport" />
          <Picker.Item label="Mottu-E" value="Mottu-E" />
        </Picker>
      </View>

      <Text style={styles.label}>Placa</Text>
      <TextInput
        value={placa}
        onChangeText={setPlaca}
        placeholder="Insira a placa (ex: ABC1234) ou 'sem placa'"
        style={styles.input}
        autoCapitalize="characters"
        maxLength={9}
      />

      <Text style={styles.label}>Zona</Text>
      <View style={styles.selectBorder}>
        <Picker
          selectedValue={zona}
          onValueChange={setZona}
          style={{ color: zona === '' ? `${colors.placeholder}` : `${colors.text}` }}
        >
          <Picker.Item label="Selecione uma zona" value="" />
          <Picker.Item label="Manutenção Rápida" value="Manutenção Rápida" />
          <Picker.Item label="Danos Estruturais" value="Danos Estruturais" />
          <Picker.Item label="Sem Placa" value="Sem Placa" />
          <Picker.Item label="BO" value="BO" />
          <Picker.Item label="Aluguel" value="Aluguel" />
          <Picker.Item label="Motor Defeituoso" value="Motor Defeituoso" />
        </Picker>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.clearButton} onPress={limparFormulario}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={salvarMoto}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
    height: '40%',
    justifyContent: 'space-evenly',
    backgroundColor: colors.background,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 15,
    padding: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
    borderRadius: 8,
    marginTop: 5,
    fontSize: 15,
  },
  selectBorder: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: colors.inative,
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: colors.secundary,
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
