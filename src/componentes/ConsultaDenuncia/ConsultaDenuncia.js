import React from 'react'
import './ConsultaDenuncia.css'
import StyledButton from '../StyledButton'

const ConsultaDenuncia = () => {
    return (
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
    )
}

export default ConsultaDenuncia