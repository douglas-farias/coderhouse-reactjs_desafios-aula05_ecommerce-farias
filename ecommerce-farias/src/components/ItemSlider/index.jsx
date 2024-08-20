import React, { useState, useEffect } from 'react';
import db from '../../services/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemCard from '../ItemCard';

function ItemSlider({ filtroSlider }) {

    const [itens, setItens] = useState([]);

    useEffect(() => {
        const obterProdutos = async () => {
            try {
                const produtosCollection = collection(db, 'ItemCollection');
                let produtosQuery;

                if (filtroSlider === 'novidades') {
                    produtosQuery = query(
                        produtosCollection,
                        where('novidade', '==', true)
                    );
                } else if (filtroSlider === 'ofertas') {
                    produtosQuery = query(
                        produtosCollection,
                        where('oferta', '==', true)
                    );
                }

                if (produtosQuery) {
                    const snapshot = await getDocs(produtosQuery);
                    const produtos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    setItens(produtos);
                }
            } catch (error) {
                console.error('Erro ao obter produtos: ', error);
            }
        };

        obterProdutos();
    }, [filtroSlider]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (
        <div className='ItemSlider'>
            <Slider className="mySlider" {...settings}>
                {itens.map(item => (
                <ItemCard
                    key={item.id}
                    item={item}
                />
                ))}
            </Slider>
        </div>
    );
}

export default ItemSlider;