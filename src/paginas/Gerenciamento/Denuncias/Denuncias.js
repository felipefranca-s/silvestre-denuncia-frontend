import { React, useEffect, useState } from 'react'
import Navbar from '../../../componentes/Nav/Navbar'
import Rodape from '../../../componentes/Rodape'
import StyledButton from '../../../componentes/StyledButton'
import api from '../../../servicos/api'
import './Denuncias.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

require("es6-promise").polyfill()
require("isomorphic-fetch")

const ConsultarDenuncia = () => {

    const [denuncias, setDenuncias] = useState([])
    useEffect(() => {
        api.get('denuncias/retornaTodos').then(resposta => {
            setDenuncias(resposta.data)
        })
    }, [])

    const [q, setQ] = useState("")


    const MySwal = withReactContent(Swal)

    // const [codigo, setCodigo] = useState()

    // const [resultado, setResultado] = useState({
    //     nome: "Anônimo",
    //     email: "Anônimo",
    //     local: "",
    //     data: "",
    //     hora: "",
    //     descricao: "",
    //     status: "",
    //     codigo: "",
    //     atualizacoes: []
    // })

    // function submit(e) {
    //     e.preventDefault();

    //     api.get('denuncias/obterPorCodigo/' + codigo).then((response) => {

    //         if (response.data.id !== undefined) {

    //             console.log(response.data)
    //             setResultado({
    //                 nome: response.data.nome,
    //                 email: response.data.email,
    //                 local: response.data.local,
    //                 data: response.data.data,
    //                 hora: response.data.hora.substr(0, 5),
    //                 descricao: response.data.descricao,
    //                 status: response.data.status_denuncia.status,
    //                 codigo: response.data.codigo,
    //                 atualizacoes: response.data.atualizacoes
    //             })
    //         }
    //         else {
    //             MySwal.fire({
    //                 title: <p>Código não encontrado</p>,
    //                 footer: 'Ciências da Computação - UNIP 2021',
    //                 html: <p>Tente novamente.</p>
    //             })
    //         }
    //     })
    // }

    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="containerDenuncias">

                    <h1 className="titulo">Gerenciamento de denúncias</h1><br />
                    <>
                        <div className="divListaDenuncias">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <th>Descrição</th>
                                        <th>Data de abertura</th>
                                        <th>Status</th>
                                        <th>Visualizar</th>
                                    </tr>
                                    {
                                        denuncias.sort((a, b) => a.id < b.id ? 1 : -1).map(denuncia => {
                                            return (
                                                <tr key={denuncia.id}>
                                                    <td>{denuncia.id}</td>
                                                    <td>{denuncia.descricao}</td>
                                                    <td>
                                                        <Moment format="DD/MM/YYYY">
                                                            {denuncia.data}
                                                        </Moment>
                                                    </td>
                                                    <td>{denuncia.status_denuncia.status}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="divBotaoLeft">
                            <Link to='/Gerenciamento'>
                                <StyledButton text="Voltar" />
                            </Link>
                        </div>
                    </>
                </div>
            </div>
            <Rodape />
        </div>
    )
}

export default ConsultarDenuncia
