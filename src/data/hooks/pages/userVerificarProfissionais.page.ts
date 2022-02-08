import { UserShortInformationInterface } from 'data/@types/UserInterface';
import { ApiService } from 'data/services/ApiService';
import { ValidationService } from 'data/services/ValidationService';
import { useState, useMemo } from 'react';

export default function useVerificarProfissionais() {
  const [cep, setCep] = useState(''),
    cepValido = useMemo(() => {
      return ValidationService.cep(cep);
    }, [cep]),
    [erro, setErro] = useState(''),
    [buscaFeitas, setBuscaFeitas] = useState(false),
    [carregando, setCarregando] = useState(false),
    [diaristas, setDiaristas] = useState([] as UserShortInformationInterface[]),
    [diaristasRestantes, setDiaristasRestantes] = useState(0);

  async function buscarProfissionais(cep: string) {
    setBuscaFeitas(false);
    setCarregando(true);
    setErro('');

    try {
      const { data } = await ApiService.get<{
        diaristas: UserShortInformationInterface[];
        quantidade_diaristas: number;
      }>(`/api/diaristas/localidades?cep=${cep.replace(/\D/g, '')}`);

      setBuscaFeitas(true);
      setDiaristas(data.diaristas);
      setDiaristasRestantes(data.quantidade_diaristas);
      setCarregando(false);
    } catch (error) {
      setErro('CEP não encontrado');
      setCarregando(false);
    }
  }

  return {
    cep,
    setCep,
    cepValido,
    buscarProfissionais,
    erro,
    diaristas,
    buscaFeitas,
    carregando,
    diaristasRestantes,
  };
}
