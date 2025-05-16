import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function CadMoto() {
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [zona, setZona] = useState('');
  const [motos, setMotos] = useState([]);

  const motosMockadas = [
  { id: '1', modelo: 'Mottu Pop', placa: 'ABC1234', zona: 'Manutenção Rápida' },
  { id: '2', modelo: 'Mottu Sport', placa: 'DEF2345', zona: 'Manutenção Rápida' },
  { id: '3', modelo: 'Mottu-E', placa: 'HIJ3456', zona: 'Manutenção Rápida' },
  { id: '4', modelo: 'Mottu Pop', placa: 'LMN4567', zona: 'Manutenção Rápida' },
  { id: '5', modelo: 'Mottu-E', placa: 'PQR5678', zona: 'Danos Estruturais' },
  { id: '6', modelo: 'Mottu Pop', placa: 'TUV6789', zona: 'Danos Estruturais' },
  { id: '7', modelo: 'Mottu Sport', placa: 'XYZ7890', zona: 'Danos Estruturais' },
  { id: '8', modelo: 'Mottu-E', placa: 'AAA8901', zona: 'Danos Estruturais' },
  { id: '9', modelo: 'Mottu Pop', placa: 'BBB9012', zona: 'Sem Placa' },
  { id: '10', modelo: 'Mottu Sport', placa: 'CCC0123', zona: 'Sem Placa' },
  { id: '11', modelo: 'Mottu-E', placa: 'DDD1230', zona: 'Motor Defeituoso' },
  { id: '12', modelo: 'Mottu Sport', placa: 'EEE2341', zona: 'Motor Defeituoso' },
  { id: '13', modelo: 'Mottu Pop', placa: 'FFF3452', zona: 'BO' },
  { id: '14', modelo: 'Mottu Sport', placa: 'GGG4563', zona: 'BO' },
  { id: '15', modelo: 'Mottu-E', placa: 'HHH5674', zona: 'BO' },
  { id: '16', modelo: 'Mottu Pop', placa: 'III6785', zona: 'BO' },
  { id: '17', modelo: 'Mottu-E', placa: 'JJJ7896', zona: 'Aluguel' },
  { id: '18', modelo: 'Mottu Sport', placa: 'KKK8907', zona: 'Aluguel' },
  { id: '19', modelo: 'Mottu Pop', placa: 'LLL9018', zona: 'Aluguel' },
  { id: '20', modelo: 'Mottu-E', placa: 'MMM0129', zona: 'Aluguel' },
];

  // Nessa função, ele carrega do AsyncStorage ou insere os mockados caso não haja nenhum dado no app
  useEffect(() => {
  async function carregarMotos() {
    try {
      const dados = await AsyncStorage.getItem('lista_motos');
      if (!dados || JSON.parse(dados).length === 0) {
        await AsyncStorage.setItem('lista_motos', JSON.stringify(motosMockadas));
        setMotos(motosMockadas);
      } else {
        setMotos(JSON.parse(dados));
      }
    } catch (error) {
      console.error('Erro ao carregar motos:', error);
    }
  };
  carregarMotos();
}, []);

  useEffect(() => {
    AsyncStorage.setItem('lista_motos', JSON.stringify(motos));
  }, [motos]);

  function limparFormulario() {
    setModelo('');
    setPlaca('');
    setZona('');
  };

  function salvarMoto() {
    if (modelo && placa.match(/^[A-Z]{3}[0-9]{4}$/) && zona) {
      const novaMoto = {
        id: Date.now().toString(),
        modelo,
        placa,
        zona
      };
      setMotos([...motos, novaMoto]);
      limparFormulario();
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  };

  return (
      <View>
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
            <Text style={styles.cardText}> Quantidade de motos no pátio:  {motos.length} </Text>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Cadastrar Moto</Text>

          <Text style={styles.label}>Modelo</Text>
          <View style={styles.selectBorder}>
            <Picker selectedValue={modelo} onValueChange={setModelo} style={{color: modelo === '' ? '#838383' : '#000'}}>
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
            placeholder="Insira a placa (ex: ABC1234)"
            style={styles.input}
            autoCapitalize="characters"
            maxLength={7}
          />

          <Text style={styles.label}>Zona</Text>
          <View style={styles.selectBorder}>
          <Picker selectedValue={zona} onValueChange={setZona} style={{color: zona === '' ? '#838383' : '#000'}}>
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
          
          {/* Teste - excluindo dados do storage */}
          <TouchableOpacity
              style={[styles.clearButton, { backgroundColor: '#e74c3c', marginTop: 15 }]}
              onPress={async () => {
                await AsyncStorage.removeItem('lista_motos');
                setMotos([]);
                alert('AsyncStorage limpo!');
              }}
            >
              <Text style={styles.buttonText}>Limpar Motos do Storage</Text>
            </TouchableOpacity>
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
  form: {
    flex: 1,
    padding: 20,
    height: '40%',
    justifyContent: 'space-evenly',
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
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    marginTop: 5,
    fontSize: 15
  },
  selectBorder: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#95a5a6',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#1BA857',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
