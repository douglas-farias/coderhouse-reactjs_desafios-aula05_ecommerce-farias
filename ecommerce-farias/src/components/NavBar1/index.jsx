import './NavBar1.css'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartProvider';
import CategoryCard from '../CategoryCard'
import ProfileModal from '../ProfileModal';
import CartWidget from '../CartWidget';

function NavBar1({}) {

    const [menuCat, setMenuCat] = useState(false);
    const [menuProf, setMenuProf] = useState(false);

    const dropDownMenuCat = () => {
        setMenuCat(prevState => !prevState)
    };
    const dropDownMenuProf = () => {
        setMenuProf(prevState => !prevState)
    };

    const { acumuladorCartWidget } = useCart();
    const usuarioLogado = false;
    // const usuarioLogado = JSON.parse(localStorage.getItem('loggedInUser'));
    const navigate = useNavigate();

    let navBar__conteudo;
    let navBar__usuario;

    if (useLocation().pathname === '/cadastrousuario') {
        navBar__conteudo = (<></>)
        navBar__usuario = (
            <div className='navBar__voltar'>
                <a onClick={() => navigate(-1)}>
                    <button><h5>voltar</h5></button>
                </a>
            </div>
        )
    } else {
        navBar__conteudo = (
            <div className='navBar__conteudo'>
                <div className='navBar__busca'>
                    <input type='text' placeholder='Busque os produtos' />
                    <button>
                        <img src='/assets/black-regular_busca.svg' />
                    </button>
                </div>
                <button>
                    <img className='navBar__menu' src='/assets/color-regular_menu.svg' onClick={dropDownMenuCat}/>
                </button>
            </div>
        )
        if (usuarioLogado) {
            navBar__usuario = (
                <div className='navBar__usuario'>
                    <button onClick={dropDownMenuProf}>
                        <span>PERFIL</span>
                    </button>
                    <CartWidget acumulador={acumuladorCartWidget()} />
                </div>
            )
        } else {
            navBar__usuario = (
            <div className='navBar__usuario'>
                <Link>Login/Cadastro</Link>
            </div>
            )
        }
    };

    return (
        <header className='navBarContainer'>
            <div className='navBar'>
                <div className='navBar__home'>
                    <Link to={'/'}>E_COMMERCE</Link>
                </div>
                {navBar__conteudo}
                {navBar__usuario}
            </div>
            <ProfileModal menu={menuProf} />
            <CategoryCard menu={menuCat} />
        </header>
    )
}

export default NavBar1