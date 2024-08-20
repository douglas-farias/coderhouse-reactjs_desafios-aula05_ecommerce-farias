import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import db from '../../services/firebase';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import Input from '../../components/Input';

function UserSignUp() {

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const [erroSenhas, setErroSenhas] = useState('');
  const [senhasIguais, setSenhasIguais] = useState(false);
  const navigate = useNavigate();

  const senha1 = watch('senha1');
  const senha2 = watch('senha2');

  useEffect(() => {
    if (senha1 && senha2 && senha1 !== senha2) {
      setErroSenhas('As senhas digitadas não coincidem.');
      setSenhasIguais(false);
    } else {
      setErroSenhas('');
      setSenhasIguais(true);
    }
  }, [senha1, senha2]);

  const onSubmit = async (data) => {
    if (senha1 !== senha2) {
      setErroSenhas('As senhas digitadas não coincidem.');
    } else {
      setErroSenhas('');
      const novoUsuario = {
        nome: data.nome,
        sobrenome: data.sobrenome,
        email: data.email,
        senha: data.senha1,
        endereco: {
          cep: data.cep,
          logradouro: data.logradouro,
          numero: data.numero,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.cidade,
          uf: data.uf,
        },
        carrinho: [],
        login: false,
      };

      try {
        await addDoc(collection(db, 'RegisteredUsers'), novoUsuario);
        toast.success('Cadastrado com sucesso! Faça o login e boas compras!', {
          onClose: () => navigate(-1, { state: { abrirModalLogin: true } })
        });
      } catch (error) {
        console.error("Erro ao cadastrar usuário: ", error);
        toast.error('Erro ao cadastrar usuário.');
      }
    }
  };

  return (
    <section className='userSignUp'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <h1 className="conteudo__titulo">CADASTRO</h1>
      <div className="conteudo__formulario">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formulario__dadosPessoais">
            <Input
              inputId='nome'
              label='Nome*'
              register={register}
              required={true}
              errors={errors}
              placeholder='Nome'
            />
            <Input
              inputId='sobrenome'
              label='Sobrenome*'
              register={register}
              required={true}
              errors={errors}
              placeholder='Sobrenome'
            />
          </div>
          <div className="formulario__dadosAcesso">
            <Input
              inputId='email'
              label='Email*'
              register={register}
              required={true}
              errors={errors}
              type='email'
              placeholder='Endereço de email'
            />
            <h6 id="formulario__alertaEmailRepetido"></h6>
            <Input
              inputId='senha1'
              label='Senha*'
              register={register}
              required={true}
              errors={errors}
              type='password'
              placeholder='Senha'
            />
            <Input
              inputId='senha2'
              label='Repita a senha*'
              register={register}
              required={true}
              errors={errors}
              type='password'
              placeholder='Senha'
            />
            {erroSenhas && <h6 id="formulario__alertaSenhaRepetir">{erroSenhas}</h6>}
          </div>
          <div className="formulario__dadosLocalizacao">
            <Input
              inputId='cep'
              label='CEP*'
              register={register}
              required={true}
              errors={errors}
              placeholder='00000-000'
            />
            <Input
              inputId='logradouro'
              label='Logradouro*'
              register={register}
              required={true}
              errors={errors}
              placeholder='Rua Nome da Rua'
            />
            <Input
              inputId='numero'
              label='Número*'
              register={register}
              required={true}
              errors={errors}
              placeholder='000'
            />
            <Input
              inputId='complemento'
              label='Complemento'
              register={register}
              errors={errors}
              placeholder='Apto, bloco, etc.'
            />
            <Input
              inputId='bairro'
              label='Bairro*'
              register={register}
              required={true}
              errors={errors}
              placeholder='Bairro'
            />
            <div className='dadosLocalizacao__cidadeUf'>
              <Input
                inputId='cidade'
                label='Cidade*'
                register={register}
                required={true}
                errors={errors}
                placeholder='Nome da cidade'
              />
              <Input
                inputId='uf'
                label='Estado*'
                register={register}
                required={true}
                errors={errors}
                placeholder='Sigla do estado (UF)'
              />
            </div>
          </div>
          <button type="submit" id="formulario__botaoCadastrar" disabled={!isValid || !senhasIguais}>CONCLUIR CADASTRO</button>
        </form>
      </div>
    </section>
  );
}

export default UserSignUp;