import './style.css'

function FinalModal({ modalEstaAberto0, abrirFecharModal0 }) {
    return (
        <div className='finalModal' style={{ display: modalEstaAberto0 ? 'flex' : 'none'}}>
            <div className='conclusao__planoDeFundo'>
                <div className='conclusao__popup'>
                    <div className='popup__mensagem'>
                        <p>Escaneio o QR Code para realizar o pagamento.</p>
                        <img src='/RGBYK_qrcode-pagamento.svg' alt='QR Code PIX' />
                        <p>Previsão de entrega:</p>
                        <p id='previsaoEntrega'></p>
                    </div>
                    <button className='popup__botao' onClick={abrirFecharModal0} >FINALIZAR COMPRA</button>
                </div>
            </div>
        </div>
    );
}

export default FinalModal