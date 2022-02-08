import React from 'react'; 
import { Button, Container, Typography, CircularProgress } from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import TextFieldMask from 'ui/components/inputs/TextFieldMask/TextFieldMask';
import useVerificarProfissionais from 'data/hooks/pages/userVerificarProfissionais.page';

import {
  FormElementContainer,
  ProfissinaisPaper,
  ProfissinaisContainer,
} from './_verificar-profissionais.styled'; 

const VerificarProfissionais: React.FC = () => { 
   const {
     cep,
     setCep,
     cepValido,
     buscarProfissionais,
     erro,
     diaristas,
     buscaFeitas,
     carregando,
     diaristasRestantes,
   } = useVerificarProfissionais();
  
  return (
  <>
    <SafeEnvironment />
    <PageTitle
      title={'Conheça os profissionais'}
      subtitle={
        'Preencha seu endereço e veja todos os profissionais da sua localidade'
      }
    />

    <Container sx={{ mb: 10 }}>
      <FormElementContainer>
        <TextFieldMask 
          mask={'99.999-999'} 
          label={'Digite seu CEP'} 
          fullWidth
          value={cep}
          onChange={(event) => setCep(event.target.value)} 
        />
        {erro && (
          <Typography color={'error'}>{erro}</Typography>          
        )}

        <Button
          variant={'contained'}
          color={'secondary'}
          sx={{ width: '220px' }}
          disabled={!cepValido || carregando}
          onClick={() => buscarProfissionais(cep)}
        >
          {carregando ? <CircularProgress size={20} /> : 'Buscar'}
        </Button>
      </FormElementContainer>

      {buscaFeitas && 
        (diaristas.length > 0 ? (
          <ProfissinaisPaper>
          <ProfissinaisContainer>
            {diaristas.map((item, index) => (
              <UserInformation
                key={index}
                name={item.nome_completo}
                picture={item.foto_usuario || ''}
                rating={item.reputacao || 0}
                description={item.cidade}
              />
            ))}
          </ProfissinaisContainer>
          <Container sx={{ textAlign: 'center' }}>
            {diaristasRestantes > 0 && (
              <Typography 
                  variant={'body2'} 
                  color={'textSecondary'} 
                  sx={{ mt: 5 }}>
                    ...e mais {diaristasRestantes} {' '} {diaristasRestantes > 1 
                    ? 'profissionais atedem' : 'profissional atende'}{' '} 
                    ao seu endereço.
                </Typography>
              )}
              <Button 
                variant={'contained'} 
                color={'secondary'} 
                sx={{ mt: 5 }}>
                  Cotratar um(a) profissional
              </Button>
          </Container>
        </ProfissinaisPaper>
      ) : (
        <Typography align={'center'} color={'textPrimary'}>
          Ainda não temos nenhum(a) diarista disponivel em sua região
        </Typography>
  ))}
    </Container>
  </>
);
}; 
    export default VerificarProfissionais;