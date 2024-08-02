import './style.css';
import { Link } from 'react-router-dom';

function LoginModal({ modalEstaAberto, abrirFecharModal }) {

    return (
        <div className='loginModal' style={{ display: modalEstaAberto ? 'flex' : 'none'}}>
            <div className='loginModal__fundo'>
                <div className='loginModal__modal'>
                    <div className='loginModal__login'>
                        <h2>E_COMMERCE</h2>
                        <form action=''>
                            <input type='text' id='loginEmail' placeholder='email' />
                            <input type='password' id='loginSenha' placeholder='senha' />
                            <h6 id='login__alertaDadosInvalidos'></h6>
                        </form>
                        <button onClick={abrirFecharModal}>ENTRAR</button>
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

export default LoginModal