import React, {useContext} from "react";
import { Route, Redirect } from "react-router";
import StoreContext from "../../Store/Context";

const RoutesPrivate = ({ component: Component, ...rest}) => {
    // const { token, setToken } = useContext(StoreContext);
    const { token } = useContext(StoreContext);
    
    // Se há token, renderiza o componente preparado,
    // se não, redireciona para a página de login
    return(
        <Route
            {...rest}
            render={() => token
                ? <Component {...rest} />
                : <Redirect to="/UsuarioLogin" />
            }
        />
    )
}

export default RoutesPrivate