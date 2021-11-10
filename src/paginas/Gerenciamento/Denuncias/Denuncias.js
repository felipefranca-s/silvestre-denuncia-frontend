import { React, useEffect, useState } from 'react'
import Navbar from '../../../componentes/Nav/Navbar'
import Rodape from '../../../componentes/Rodape'
import api from '../../../servicos/api'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Table from 'react-bootstrap/Table'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ConsultarDenuncia = () => {

    const [denuncias, setDenuncias] = useState([])

    useEffect(() => {
        api.get('denuncias/retornaTodos').then(resposta => {
            setDenuncias(resposta.data)
        })
    }, [])

    const MySwal = withReactContent(Swal)

    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="containerConteudo">
                    <div className="divConteudo">
                        <h1 className="titulo">Gerenciamento de denúncias</h1><br />
                        {
                            denuncias.length > 0 ?
                                <>
                                    <div className="divListaDenuncias">
                                        <div className="divTable">
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Descrição</th>
                                                        <th>Data de abertura</th>
                                                        <th>Status</th>
                                                        <th>Editar</th>
                                                        <th>Excluir</th>
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
                                                                    <td>
                                                                        <Link to={{
                                                                            pathname: `/Gerenciamento/Denuncias/EditarDenuncia/${denuncia.id}`
                                                                        }}>
                                                                            <button className="botaoAzul">Editar</button>
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        <button className="botaoVermelho" onClick={() => {

                                                                            MySwal.fire({
                                                                                title: <p>Atenção!</p>,
                                                                                showCancelButton: true,
                                                                                confirmButtonColor: '#86C232',
                                                                                cancelButtonColor: '#f70000',
                                                                                confirmButtonText: 'Sim',
                                                                                cancelButtonText: 'Cancelar',
                                                                                footer: 'Ciências da Computação - UNIP 2021',
                                                                                html: <p>Deseja mesmo excluir essa denúncia?</p>,
                                                                                icon: 'warning'
                                                                            }).then((result) => {
                                                                                if (result.isConfirmed) {
                                                                                    api.delete(`denuncias/deleta/${denuncia.id}`).then((response) => {
                                                                                        MySwal.fire({
                                                                                            title: <p>Sucesso!</p>,
                                                                                            confirmButtonColor: '#86C232',
                                                                                            footer: 'Ciências da Computação - UNIP 2021',
                                                                                            html: <p>Denúncia excluída com sucesso.</p>,
                                                                                            icon: 'success'
                                                                                        }).then(() => {
                                                                                            window.location.reload()
                                                                                        })
                                                                                    })
                                                                                        .catch(() => {
                                                                                            MySwal.fire({
                                                                                                title: <p>Erro!</p>,
                                                                                                confirmButtonColor: '#86C232',
                                                                                                footer: 'Ciências da Computação - UNIP 2021',
                                                                                                html: <p>Houve um erro ao excluir a denúncia, favor entrar em contato com o
                                                                                                    administrador do sistema.</p>,
                                                                                                icon: 'error'
                                                                                            })
                                                                                        })
                                                                                }
                                                                                else {
                                                                                    return
                                                                                }
                                                                            })
                                                                        }}
                                                                        >Excluir</button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="divBotaoLeft">
                                        <Link to='/Gerenciamento'>
                                            <button className="botaoVerde">Voltar</button>
                                        </Link>
                                    </div><br />
                                </>
                                :
                                <>
                                    <h3 className="subtitulo">Ainda não há nenhuma denúncia registrada.</h3>
                                </>
                        }

                    </div>
                </div>

            </div>
            <Rodape />
        </div>
    )
}

export default ConsultarDenuncia
