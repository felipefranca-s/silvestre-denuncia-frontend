import React from "react";
import Navbar from "../componentes/Nav/Navbar"
import Rodape from "../componentes/Rodape";
import ConteudoInicio from "../componentes/ConteudoInicio/ConteudoInicio"

const Inicio = () => {
    return (
        <>
            <Navbar />
                <ConteudoInicio />
            <Rodape />
        </>
    )
}

export default Inicio;