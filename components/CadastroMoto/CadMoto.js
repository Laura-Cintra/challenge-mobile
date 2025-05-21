import { useState, useEffect } from 'react';
import MotoForm from './MotoForm';
import MotoHeader from './MotoHeader';
import MessageModal from '../MessageModal';
import { View } from 'react-native';
import { useMotos } from '../../providers/UseMotos';

export default function CadMoto() {

  const { motos, atualizarMotos } = useMotos();

  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [zona, setZona] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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

    if (modelo && (placaFiltrada === 'sem placa' || placa.match(/^[a-zA-Z]{3}[0-9]{4}$/)) && zona) {
      const novaMoto = { id: Date.now().toString(), modelo, placa: placa.toUpperCase().trim(), zona };
      const novasMotos = [...motos, novaMoto];
      atualizarMotos(novasMotos);
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
