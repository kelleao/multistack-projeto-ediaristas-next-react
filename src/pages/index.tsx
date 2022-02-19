import { GetStaticProps } from 'next';
import Presentation from '@partials/index/_presentation';
import Advantages from '@partials/index/_advantages';
import FrequentQuestions from '@partials/index/_frequent-questions';

// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';


// const Produto = yup.object().shape({
//     produto: yup.object().shape({
//         nome: yup.string().min(3, 'Digite um nome maior')
//     })
// }) 

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: '',
    },
  };
};

export default function Index() {
        return (
        <div>
            <Presentation />
            <Advantages />
            <FrequentQuestions />
        </div>
    );
}


    // const { register, handleSubmit, formState: {errors} } = useForm({
    //     resolver: yupResolver(Produto),
    // });

    // function enviarFormulario(data){
    //     console.log('Dados do formulário',  data);
    // }

    // return (
    //     <div>
    //         <form onSubmit={handleSubmit(enviarFormulario)}>
    //             <input {...register('produto.nome', { required: true })} />
    //             {errors?.produto?.nome?.message}

    //             <button>Enviar</button>
    //         </form>
    //     </div>
    // );
  

