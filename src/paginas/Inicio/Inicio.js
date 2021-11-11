import React from "react";
import Navbar from "../../componentes/Nav/Navbar"
import Rodape from "../../componentes/Rodape";
import './Inicio.css'

const Inicio = () => {
    return (
        <>
            <Navbar />
            <div className="conteudoInicio">
                <div className="divSlogan">
                    <h1 className="slogan">
                        Tráfico de animais silvestres é crime. Denuncie!
                    </h1>
                </div>
            </div>
            <Rodape />
        </>
    )
}

export default Inicio;