import React from 'react'
import Navbar from '../../componentes/Nav/Navbar'
import Rodape from '../../componentes/Rodape'
import StyledButton from '../../componentes/StyledButton'
import './ConsultarDenuncia.css'

const ConsultarDenuncia = () => {
    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="containerConsulta">
                    <div className="card">
                        <h1 className="titulo">Consultar denúncia</h1><br />
                        <h3 className="subtitulo">Código da denúncia</h3><br />
                        <div className="campo">
                            <input type="codigo" name="codigo" id="codigo" />
                        </div>
                        <div className="divBotaoLeft">
                            <StyledButton text="Enviar" />
                        </div>
                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    )
}

export default ConsultarDenuncia
