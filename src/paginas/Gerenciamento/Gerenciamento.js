import React from 'react'
import Navbar from '../../componentes/Nav/Navbar'
import Rodape from '../../componentes/Rodape'
import './Gerenciamento.css'
import StyledLink from '../../componentes/StyledLink'
const Gerenciamento = () => {
    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="containerGerenciamento">
                    <div className="divGerenciamento">
                        <h1 className="titulo">Gerenciamento</h1><br />
                        <div className="cardFuncaoGerenciamento">
                            <StyledLink to='/Gerenciamento/Denuncias'>
                                <h3 className="subtitulo">Denúncias</h3><br />
                            </StyledLink>
                        </div>

                    </div>
                </div>
            </div>
            <Rodape />
        </div >
    )
}

export default Gerenciamento