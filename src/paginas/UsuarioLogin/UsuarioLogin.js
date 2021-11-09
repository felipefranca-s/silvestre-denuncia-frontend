import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import Navbar from '../../componentes/Nav/Navbar';
import Rodape from '../../componentes/Rodape';
import StoreContext from '../../componentes/Store/Context';
import './UsuarioLogin.css'
import api from '../../servicos/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function initialState() {
    return { user: '', password: '' };
}

async function login ({ user, password}) {
    return await api.get('usuarios/validarSenha',{
    params:{
        login: user,
        senha: password
    }}).then((response) => {
        return response.data
    }).catch(error => {
        return false
    })
    
}

const UsuarioLogin = () => {

    const [values, setValues] = useState(initialState);

    const history = useHistory();

    const { setToken } = useContext(StoreContext);

    const MySwal = withReactContent(Swal)

    function onChange(event) {
        const { value, name } = event.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const token = await login(values);

        if (token) {
            setToken(token);
            return history.push('/Gerenciamento');
        }
        else {
            MySwal.fire({
                title: <p>Atenção!</p>,
                footer: 'Ciências da Computação - UNIP 2021',
                confirmButtonColor: '#86C232',
                html: <p>Usuário ou senha icorretos</p>,
                icon: 'error'
              })
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
                                <button className="botaoVerde">Acessar</button>
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