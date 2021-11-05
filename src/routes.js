import React from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import Inicio from './paginas/Inicio'
import ConsultarDenuncia from "./paginas/ConsultarDenuncia";
import StoreProvider from "./componentes/Store/Provider";
import RoutesPrivate from "./componentes/Routes/Private/Private";
import NovaDenuncia from "./paginas/NovaDenuncia";
import UsuarioLogin from "./componentes/UsuarioLogin/UsuarioLogin"
import AreaRestrita from "./componentes/UsuarioLogin/UsuarioLogin"

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