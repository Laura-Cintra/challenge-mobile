import { useState, useEffect } from 'react';
import MotoForm from './MotoForm';
import MotoHeader from './MotoHeader';
import MessageModal from '../MessageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

export default function CadMoto() {
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [zona, setZona] = useState('');
  const [motos, setMotos] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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
    }
    carregarMotos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('lista_motos', JSON.stringify(motos));
  }, [motos]);

  function limparFormulario() {
    setModelo('');
    setPlaca('');
    setZona('');
  }

  function salvarMoto() {
    if (modelo && placa.match(/^[A-Z]{3}[0-9]{4}$/) && zona) {
      const novaMoto = { id: Date.now().toString(), modelo, placa, zona };
      setMotos([...motos, novaMoto]);
      limparFormulario();
      setModalMessage('Moto cadastrada com sucesso!');
      setIsSuccess(true);
      setModalVisible(true);
    } else {
      setModalMessage('Preencha todos os campos corretamente!');
      setIsSuccess(false);
      setModalVisible(true);
    }
  }

  async function limparStorage() {
    await AsyncStorage.removeItem('lista_motos');
    setMotos([]);
  }

  return (
    <View>
        <MotoHeader motos={motos} />
        <MotoForm
          modelo={modelo}
          setModelo={setModelo}
          placa={placa}
          setPlaca={setPlaca}
          zona={zona}
          setZona={setZona}
          salvarMoto={salvarMoto}
          limparFormulario={limparFormulario}
          limparStorage={limparStorage}
        />
        <MessageModal
          visible={modalVisible}
          message={modalMessage}
          isSuccess={isSuccess}
          onClose={() => setModalVisible(false)}
        />
    </View>
  );
}
