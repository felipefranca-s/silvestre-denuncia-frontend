import React from 'react'
import Navbar from '../componentes/Nav/Navbar';
import Rodape from '../componentes/Rodape';
import FormDenuncia from '../componentes/FormDenuncia/FormDenuncia';

const NovaDenuncia = () => {

    return (
        <>
            <Navbar />
                <FormDenuncia />
            <Rodape />
        </>
    )
}

export default NovaDenuncia;