import React, { useState } from 'react';
import axios from 'axios';

function CalculadoraFrete() {
    const [distancia, setDistancia] = useState(null);

    const calcularDistancia = async () => {
        const apiKey = 'AIzaSyCTfmS9NX4L8tw-XLGlwDibbtMqNiRQTPY';
        const origem = '37.7749,-122.4194';
        const destino = '34.0522,-118.2437';

        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origem}&destinations=${destino}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const resultado = response.data;
            const distanciaEmMetros = resultado.rows[0].elements[0].distance.value;
            setDistancia(distanciaEmMetros);
        } catch (error) {
            console.error('Erro ao buscar dados: ', error);
        }
    };
}

export default CalculadoraFrete;