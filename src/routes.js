import React from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import Inicio from './paginas/Inicio/Inicio'
import ConsultarDenuncia from "./paginas/ConsultarDenuncia/ConsultarDenuncia";
import StoreProvider from "./componentes/Store/Provider";
import RoutesPrivate from "./componentes/Routes/Private/Private";
import NovaDenuncia from "./paginas/NovaDenuncia/NovaDenuncia";
import UsuarioLogin from "./paginas/UsuarioLogin/UsuarioLogin"
import AreaRestrita from "./paginas/UsuarioLogin/UsuarioLogin"

function Routes() {
    return (
        <BrowserRouter>
            <StoreProvider>
                <Route path="/" exact component={Inicio} />
                <Route path="/NovaDenuncia" exact component={NovaDenuncia} />
                <Route path="/ConsultarDenuncia" exact component={ConsultarDenuncia} />
                <Route path="/UsuarioLogin" exact component={UsuarioLogin} />
                <RoutesPrivate path="/AreaRestrita" exact component={AreaRestrita} />
            </StoreProvider>
        </BrowserRouter>
    )
}

export default Routes;