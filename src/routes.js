import React from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import Inicio from './paginas/Inicio/Inicio'
import ConsultarDenuncia from "./paginas/ConsultarDenuncia/ConsultarDenuncia";
import StoreProvider from "./componentes/Store/Provider";
import RoutesPrivate from "./componentes/Routes/Private/Private";
import NovaDenuncia from "./paginas/NovaDenuncia/NovaDenuncia";
import UsuarioLogin from "./paginas/UsuarioLogin/UsuarioLogin"
import Gerenciamento from "./paginas/Gerenciamento/Gerenciamento"
import GerenciamentoDenuncias from "./paginas/Gerenciamento/Denuncias/Denuncias";
import GerenciamentoEditarDenuncia from "./paginas/Gerenciamento/Denuncias/EditarDenuncia/EditarDenuncia";

function Routes() {
    return (
        <BrowserRouter>
            <StoreProvider>
                <Route path="/" exact component={Inicio} />
                <Route path="/NovaDenuncia" exact component={NovaDenuncia} />
                <Route path="/ConsultarDenuncia" exact component={ConsultarDenuncia} />
                <Route path="/UsuarioLogin" exact component={UsuarioLogin} />
                <RoutesPrivate path="/Gerenciamento" exact component={Gerenciamento} />
                <RoutesPrivate path="/Gerenciamento/Denuncias" exact component={GerenciamentoDenuncias} />
                <RoutesPrivate path="/Gerenciamento/Denuncias/EditarDenuncia/:denunciaId" exact component={GerenciamentoEditarDenuncia} />
            </StoreProvider>
        </BrowserRouter>
    )
}

export default Routes;