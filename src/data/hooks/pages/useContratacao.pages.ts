import { useState, useMemo, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';
import { ServicoInterface } from "data/@types/ServicoInterface";
import { 
    CadastroDiaristaFormDataInterface, 
    LoginFormDataInterface, 
    NovaDiariaFormDataInterface, 
    PagamentoFormDataInterface 
} from "data/@types/FormInterface";
import useApi from "../useApi.hook";
import { DiariaInterface } from "data/@types/DiariaInterface";
import { ValidationService } from "data/services/ValidationService";
import { DateService } from "data/services/DateService";
import { houseParts } from "@partials/encontrar-diarista/_detalhes-servico";
import { string } from "yup/lib/locale";
import { ExternalServicesContext } from "data/contexts/ExternalServicesContext";
import { ApiService, linksResolver } from "data/services/ApiService";


export default function useContratacao() {

const [step, setStep] = useState(1),
    [hasLogin, setHasLogin] = useState(false),
    [loginError, setLoginError] = useState(''),
    breadcrumbItems = ['Detalhes da diária', 'Identificação', 'Pagamento'],
    serviceForm = useForm<NovaDiariaFormDataInterface>({
        resolver: yupResolver(
            FormSchemaService.address().concat(
                FormSchemaService.detalhesServico()
            )
        ),
    }),
    clientForm = useForm<CadastroDiaristaFormDataInterface>({
        resolver: yupResolver(
            FormSchemaService.userData().concat(FormSchemaService.newContact())
        ),
    }),
    paymentForm = useForm<PagamentoFormDataInterface>({
        resolver: yupResolver(FormSchemaService.payment()),
    }),
    loginForm = useForm<LoginFormDataInterface>({
        resolver: yupResolver(FormSchemaService.login()),
    }),

    { externalServicesState } = useContext(ExternalServicesContext),
    servicos = useApi<ServicoInterface[]>('/api/servicos').data,
    dadosFaxina = serviceForm.watch('faxina'),
    cepFaxina = serviceForm.watch('endereco.cep'),
    [podemosAtender, setPodemosAntender] = useState(true),

    tipoLimpeza = useMemo<ServicoInterface>(() => {
        if (servicos && dadosFaxina?.servico) {
            const selectedService = servicos.find(
                (servico) => servico.id === dadosFaxina?.servico
            );

            if (selectedService) {
                return selectedService;
            }
        }
        return {} as ServicoInterface;
    }, [servicos, dadosFaxina?.servico]),
    { tamanhoCasa, totalPrice, totalTime } = useMemo<{
        tamanhoCasa: string[];
        totalPrice: number;
        totalTime: number;
    }>(
        () => ({
            tamanhoCasa: listarComodos(dadosFaxina),
            totalPrice: calcularPreco(dadosFaxina, tipoLimpeza),
            totalTime: calcularTempoServico(dadosFaxina, tipoLimpeza),
        }),
        /* eslint-disable react-hooks/exhaustive-deps */
        [
            tipoLimpeza,
            dadosFaxina,
            dadosFaxina?.quantidade_banheiros,
            dadosFaxina?.quantidade_cozinhas,
            dadosFaxina?.quantidade_outros,
            dadosFaxina?.quantidade_quartos,
            dadosFaxina?.quantidade_quintais,
            dadosFaxina?.quantidade_salas,
        ]
    );

    useEffect(() => {
        if (
            dadosFaxina &&
            ValidationService.hora(dadosFaxina.hora_inicio) &&
            totalTime >= 0
        ) {
            serviceForm.setValue(
                'faxina.hora_termino',
                DateService.addHours(
                    dadosFaxina?.hora_inicio as string,
                    totalTime
                ),
                { shouldValidate: true }
            );
        } else {
            serviceForm.setValue('faxina.hora_termino', '');
        }
    }, [dadosFaxina?.hora_inicio, totalTime]);

    useEffect(() => {
        const cep = ((cepFaxina as string) || '').replace(/\D/g, '')
            if(ValidationService.cep(cep)) {
               
                const linKDisponibilidade = linksResolver(
                    externalServicesState.externalServices,
                    'verificar_disponibilidade_atendimento'
                );
                if(linKDisponibilidade){
                    ApiService.request<{ disponiblilidade: boolean }>({
                        url: linKDisponibilidade.uri + '?cep=' + cep,
                        method: linKDisponibilidade.type
                    }).then((response) => {
                        setPodemosAntender(response.data.disponiblilidade)
                    }).catch((_error) => setPodemosAntender(false))
                }
            }else{
                setPodemosAntender(true)
            }

    }, [cepFaxina])


    function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {
        console.log(data);
        
    }

    function onClientFormSubmit(data: CadastroDiaristaFormDataInterface) {
        console.log(data);
    }

    function onLoginFormSubmit(data: LoginFormDataInterface) {
        console.log(data);
        
    }
    function onPaymentFormSubmit(data: PagamentoFormDataInterface) {
        console.log(data);
    }

    function calcularTempoServico(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ){
        let total = 0
        if(dadosFaxina && tipoLimpeza){
            total += tipoLimpeza.horas_banheiro * dadosFaxina.quantidade_banheiros
            total += tipoLimpeza.horas_cozinha * dadosFaxina.quantidade_cozinhas
            total += tipoLimpeza.horas_outros * dadosFaxina.quantidade_outros
            total += tipoLimpeza.horas_quarto * dadosFaxina.quantidade_quartos
            total += tipoLimpeza.horas_quintal * dadosFaxina.quantidade_quintais
            total += tipoLimpeza.horas_sala * dadosFaxina.quantidade_salas
        }

        return total
    }

    function listarComodos(dadosFaxina: DiariaInterface): string[]{
        const comodos: string[] = []
        if(dadosFaxina){
            houseParts.forEach((housePart) => {
                const total = dadosFaxina[housePart.name as keyof DiariaInterface
            ] as Number
                if(total > 0){
                    const nome = total > 1 ? housePart.plural : housePart.singular
                    comodos.push(`${total} ${nome}`)

                }

            })
        }
        return comodos
    }

    function calcularPreco(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ){
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total += tipoLimpeza.valor_banheiro * dadosFaxina.quantidade_banheiros;
            total += tipoLimpeza.valor_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.valor_outros * dadosFaxina.quantidade_outros;
            total += tipoLimpeza.valor_quarto * dadosFaxina.quantidade_quartos;
            total += tipoLimpeza.valor_quintal * dadosFaxina.quantidade_quintais;
            total += tipoLimpeza.valor_sala * dadosFaxina.quantidade_salas;
    }
    return Math.max(total, tipoLimpeza.valor_minimo)
}

        return {
            step,
            setStep,
            breadcrumbItems,
            serviceForm,
            clientForm,
            paymentForm,
            loginForm,
            onServiceFormSubmit,
            onClientFormSubmit,
            onPaymentFormSubmit,
            onLoginFormSubmit,
            servicos,
            podemosAtender,
            hasLogin,
            tipoLimpeza,
            totalPrice,
            tamanhoCasa,
            setHasLogin,
            loginError,
            
        };
}