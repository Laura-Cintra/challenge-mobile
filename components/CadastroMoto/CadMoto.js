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

  useEffect(() => {
    async function carregarMotos() {
      try {
        const dados = await AsyncStorage.getItem('lista_motos');
        if (dados) {
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

    const placaFiltrada = placa.toLowerCase().trim();

    if (placaFiltrada !== 'sem placa') {

      // Verifica se já existe uma moto com a mesma placa
      const placaExiste = motos.some(
        (moto) => moto.placa.toLowerCase().trim() === placaFiltrada
      );
      if (placaExiste) {
        setModalMessage('Já existe um registro com essa placa!');
        setIsSuccess(false);
        setModalVisible(true);
        return;
      }
    }

    if (modelo && (placaFiltrada === 'sem placa' || placa.match(/^[A-Z]{3}[0-9]{4}$/)) && zona) {
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
