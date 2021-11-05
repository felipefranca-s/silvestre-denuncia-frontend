import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import Navbar from '../Nav/Navbar';
import Rodape from '../Rodape';
import StoreContext from '../Store/Context';
import StyledButton from '../StyledButton'
import './UsuarioLogin.css'

function initialState() {
    return { user: '', password: '' };
}

function login({ user, password }) {
    if (user === 'admin' && password === 'admin') {
        return { token: '1234' };
    }
    return { error: "Usuário ou senha inválido" }
}

const UsuarioLogin = () => {

    const [values, setValues] = useState(initialState);

    const history = useHistory();

    const { setToken } = useContext(StoreContext);


    function onChange(event) {
        const { value, name } = event.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    function onSubmit(event) {
        event.preventDefault();

        const { token } = login(values);

        if (token) {
            setToken(token);
            alert('acertou');
            return history.push('/');
        }
        else {
            alert('errou');
            setValues(initialState);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="containerUsuarioLogin">
                    <div className="cardLogin">
                        <form onSubmit={onSubmit}>
                            <h1 className="titulo">Área restrita</h1><br />
                            <h3 className="subtitulo">Informe as suas credenciais</h3><br />
                            <div className="campo">
                                <label htmlFor="login">Login</label>
                                <input type="text" name="user" id="user" value={values.user} required onChange={onChange} />
                            </div>
                            <div className="campo">
                                <label htmlFor="senha">Senha</label>
                                <input type="password" name="password" id="password" value={values.password} required onChange={onChange} />
                            </div>
                            <div className="divBotao">
                                <StyledButton text="Acessar" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Rodape />
        </div >
    )
}

export default UsuarioLogin