import { React, useState } from 'react'
import SelecionadorData from '../SelecionadorData'
import './FormDenuncia.css'
import StyledButton from '../StyledButton'

const FormDenuncia = () => {

    const [anonimo, setAnonimo] = useState(false);

    function handleAnonimoClick() {
        setAnonimo(!anonimo);
    }

    return (
        <>
            <div className="main">
                <div className="containerForm">
                    <div className="formulario">
                        <form>
                            <h1 className="titulo">Nova denúncia</h1><br />
                            <h3 className="subtitulo">Informações para contato</h3><br />
                            <div className="campo">
                                <input type="checkbox" name="anonimo" id="anonimo"
                                    onClick={handleAnonimoClick} />
                                <b><label for="anonimo"> Anônimo</label></b>
                            </div>
                            <div className="campo">
                                <label for="nome">Nome completo</label>
                                <input type="text" name="nome" id="nome" disabled={anonimo} />
                            </div>
                            <div className="campo">
                                <label for="email">E-mail</label>
                                <input type="email" name="email" id="email" disabled={anonimo} />
                            </div>
                            <h3 className="subtitulo">Informações da ocorrência</h3><br />
                            <div className="campo">
                                <label for="selecionador-data">Data *</label>
                                <SelecionadorData id="selecionador-data" />
                            </div>
                            <div className="campo">
                                <label for="horario">Hora *</label>
                                <input type="text" name="horario" id="selecionador-horario" required /><br />
                            </div>
                            <div className="campo">
                                <label for="email">Local *</label>
                                <input type="text" name="local" id="local" required />
                            </div>
                            <div className="campo">
                                <label for="descricao">Descrição *</label><br />
                                <textarea type="text" name="descricao" id="descricao" required></textarea>
                            </div>
                            <div className="divBotao">
                                <StyledButton text="Enviar" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormDenuncia;