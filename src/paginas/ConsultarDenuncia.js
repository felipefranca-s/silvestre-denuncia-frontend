import React from 'react'
import Navbar from '../componentes/Nav/Navbar'
import Rodape from '../componentes/Rodape'
import ConsultaDenuncia from '../componentes/ConsultaDenuncia/ConsultaDenuncia'

const ConsultarDenuncia = () => {
    return (
        <div>
            <Navbar />
                <ConsultaDenuncia />
            <Rodape />
        </div>
    )
}

export default ConsultarDenuncia
