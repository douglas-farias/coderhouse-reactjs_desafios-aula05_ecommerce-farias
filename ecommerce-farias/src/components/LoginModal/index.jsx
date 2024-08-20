import './style.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function LoginModal({ modalEstaAberto, abrirFecharModal }) {

    const [inputEmail, setInputEmail] = useState('');
    const [inputSenha, setInputSenha] = useState('');

    const handleChangeEmail = (event) => {
        setInputEmail(event.target.value);
    }

    const handleChangeSenha = (event) => {
        setInputSenha(event.target.value);
    }

    const handleLogin = async () => {
        if (inputEmail && inputSenha) {
            try {
                const usuariosCollection = collection(db, 'RegisteredUsers');
                const q = query(usuariosCollection, where('email', '==', inputEmail));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const usuarioDoc = querySnapshot.docs[0];
                    const usuarioData = usuarioDoc.data();

                    if (usuarioData.senha === inputSenha) {
                        const usuarioAtualizado = {
                            ...usuarioData,
                            id: usuarioDoc.id,
                            login: true
                        };

                        // Armazena no localStorage
                        localStorage.setItem('loggedInUser', JSON.stringify(usuarioAtualizado));
                        window.location.reload();
                        console.log('Login bem-sucedido:', usuarioAtualizado);
                    } else {
                        console.error('Senha incorreta');
                        document.getElementById('login__alertaDadosInvalidos').textContent = 'Senha incorreta';
                    }
                } else {
                    console.error('Usuário não encontrado');
                    document.getElementById('login__alertaDadosInvalidos').textContent = 'Usuário não encontrado';
                }
            } catch (error) {
                console.error('Erro ao obter usuário:', error);
            }
        } else {
            console.error('Email e senha não podem estar vazios');
            document.getElementById('login__alertaDadosInvalidos').textContent = 'Email e senha não podem estar vazios';
        }
    }

    return (
        <div className='loginModal' style={{ display: modalEstaAberto ? 'flex' : 'none'}}>
            <div className='loginModal__fundo'>
                <div className='loginModal__modal'>
                    <div className='loginModal__login'>
                        <h2>E_COMMERCE</h2>
                        <form action=''>
                            <input
                                type='text'
                                id='loginEmail'
                                placeholder='email'
                                value={inputEmail}
                                onChange={handleChangeEmail}
                            />
                            <input
                                type='password'
                                id='loginSenha'
                                placeholder='senha'
                                value={inputSenha}
                                onChange={handleChangeSenha}
                            />
                            <h6 id='login__alertaDadosInvalidos'></h6>
                        </form>
                        <button type="button" onClick={handleLogin}>ENTRAR</button>
                    </div>
                    <div className='loginModal__cadastro'>
                        <figure>
                            <img src='/transparente_logo.png' alt='Logo' id='imagemLogo' />
                        </figure>
                        <Link to='/cadastrousuario' onClick={abrirFecharModal}>
                            <button>CADASTRAR-SE</button>
                        </Link>
                    </div>
                </div>
                <button className='loginModal__fechar' onClick={abrirFecharModal}>fechar</button>
            </div>
        </div>
    );
}

export default LoginModal;