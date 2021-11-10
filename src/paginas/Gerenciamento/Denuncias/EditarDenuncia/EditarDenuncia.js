import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../../../componentes/Nav/Navbar'
import Rodape from '../../../../componentes/Rodape'
import api from '../../../../servicos/api'
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ReactDatePicker from 'react-datepicker';
import parseISO from 'date-fns/parseISO'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import InputHora from '../../../../componentes/InputHora'

const EditarDenuncia = () => {

    const MySwal = withReactContent(Swal)

    const { denunciaId } = useParams()

    const [todosStatusDenuncias, setTodosStatusDenuncias] = useState([])

    const [imagem, setImagem] = useState()

    const [exibirImagem, setExibirImagem] = useState(false)

    const [json, setJson] = useState({
        id: "",
        nome: "Anônimo",
        email: "Anônimo",
        local: "",
        data: "",
        hora: "",
        descricao: "",
        status_denuncia: {
            id: 1
        },
        codigo: "",
        atualizacoes: []
    })

    function handle(e) {
        const novoJson = { ...json }
        novoJson[e.target.id] = e.target.value
        setJson(novoJson)
    }

    const [dataInicio, setDataInicio] = useState();

    const [hora, setHora] = useState();
    const handleInputHora = ({ target: { value } }) => setHora(value)

    const [statusDenuncia, setStatusDenuncia] = useState({
        id: 1,
        status: ""
    });

    const [novaAtualizacao, setNovaAtualizacao] = useState()

    function handleStatus(e) {
        // eslint-disable-next-line
        const novoStatus = todosStatusDenuncias.find(s => s.id == e.target.value)
        setStatusDenuncia(novoStatus)
    }

    useEffect(() => {
        api.get('denuncias/' + denunciaId).then(resposta => {
            setDataInicio(parseISO(resposta.data.data))
            setHora(resposta.data.hora)
            resposta.data.data = moment(resposta.data.data).format('dd/MM/yyyy');
            setStatusDenuncia(resposta.data.status_denuncia)
            setJson(resposta.data)

            api.get(`/imagens/obterPorDenunciaId/${resposta.data.id}`, { responseType: 'blob' })
                .then((resposta1) => {
                    setImagem(resposta1.data)
                    setExibirImagem(true)
                })
        })

    }, [denunciaId])

    useEffect(() => {
        api.get('statusDenuncias/retornaTodos').then(resposta => {
            setTodosStatusDenuncias(resposta.data)
        })
    }, [])

    function submit(e) {

        e.preventDefault();

        if (novaAtualizacao !== "")

            json.data = dataInicio
        json.status_denuncia.id = statusDenuncia.id

        if (hora.length === 5)
            json.hora = hora + ":00"

        MySwal.fire({
            title: <p>Atenção!</p>,
            showCancelButton: true,
            confirmButtonColor: '#86C232',
            cancelButtonColor: '#f70000',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            footer: 'Ciências da Computação - UNIP 2021',
            html: <p>Deseja mesmo atualizar essa denúncia?</p>,
            icon: 'warning'
        }).then((result) => {
            if (result.isConfirmed) {
                if (novaAtualizacao !== "" && novaAtualizacao !== undefined) {
                    api.post('atualizacoes/novo', {
                        atualizacao: novaAtualizacao,
                        data: moment(),
                        hora: moment().format('hh:mm:ss'),
                        denuncia: { id: json.id }
                    }).catch(() => {
                        MySwal.fire({
                            title: <p>Erro!</p>,
                            confirmButtonColor: '#86C232',
                            footer: 'Ciências da Computação - UNIP 2021',
                            html: <p>Houve um erro ao adicionar a atualização, favor entrar em contato com o
                                administrador do sistema.</p>,
                            icon: 'error'
                        })
                    })
                }

                api.put(`denuncias/${json.id}`, json).then((response) => {
                    MySwal.fire({
                        title: <p>Sucesso!</p>,
                        confirmButtonColor: '#86C232',
                        footer: 'Ciências da Computação - UNIP 2021',
                        html: <p>Denúncia atualizada com sucesso.</p>,
                        icon: 'success'
                    }).then(() => {
                        window.location.reload()
                    })
                }).catch(() => {
                    MySwal.fire({
                        title: <p>Erro!</p>,
                        confirmButtonColor: '#86C232',
                        footer: 'Ciências da Computação - UNIP 2021',
                        html: <p>Houve um erro ao atualizar a denúncia, favor entrar em contato com o
                            administrador do sistema.</p>,
                        icon: 'error'
                    })
                })
            }
            else {
                return
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="containerConteudo">
                    <div className="divConteudo">
                        <h1 className="titulo">Editar denúncia</h1><br />
                        <h3 className="subtitulo">Informações do autor</h3><br />
                        <form onSubmit={(e) => submit(e)}>
                            <div className="campo">
                                <label htmlFor="nome">Nome do autor</label>
                                <input type="text" name="nome" id="nome" value={json.nome} onChange={(e) => handle(e)}></input>
                            </div>
                            <div className="campo">
                                <label htmlFor="email">Email do autor</label>
                                <input type="text" name="email" id="email" value={json.email} onChange={(e) => handle(e)}></input>
                            </div>
                            <h3 className="subtitulo">Informações da ocorrência</h3><br />
                            <div className="campo">
                                <label htmlFor="selecionador-data">Data</label>
                                <ReactDatePicker
                                    id="selecionador-data"
                                    selected={dataInicio}
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={new Date()}
                                    onChange={(data) => setDataInicio(data)}
                                />
                            </div>
                            <div className="campo">
                                <label htmlFor="hora">Hora</label>
                                <InputHora name="hora" id="hora"
                                    value={hora}
                                    onChange={handleInputHora} /><br />
                            </div>
                            <div className="campo">
                                <label htmlFor="email">Local</label>
                                <input type="text" name="local" id="local" value={json.local} onChange={(e) => handle(e)} />
                            </div>
                            <div className="campo">
                                <label htmlFor="codigo">Código</label><br />
                                <input type="text" name="codigo" id="codigo" value={json.codigo} disabled />
                            </div>
                            <div className="campo">
                                <label htmlFor="descricao">Descrição</label><br />
                                <textarea type="text" name="descricao" id="descricao" value={json.descricao} onChange={(e) => handle(e)} />
                            </div>
                            <div className="campo">
                                <label htmlFor="selectStatus">Status</label><br />
                                <select name="selectStatus" id="selectStatus" value={statusDenuncia.id} onChange={handleStatus}>
                                    {
                                        todosStatusDenuncias.map(statusDenunciaMap => {
                                            return (
                                                <option key={statusDenunciaMap.id} value={statusDenunciaMap.id}>
                                                    {statusDenunciaMap.status}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {
                                exibirImagem ?
                                    <>
                                        <h1 className="titulo">Evidência</h1><br />
                                        <div className="divExibirEvidencia">
                                            <img src={URL.createObjectURL(imagem)} alt="imagemEvidencia" />
                                        </div><br />
                                    </>
                                    : null

                            }
                            <h1 className="titulo">Atualizações da denúncia</h1><br />
                            <div className="campo">
                                <label htmlFor="novaAtualizacao">Nova atualização</label><br />
                                <textarea placeholder="Deixe em branco para não adicionar uma nova atualização."
                                    type="text" name="novaAtualizacao" id="novaAtualizacao" value={novaAtualizacao} onChange={(e) => setNovaAtualizacao(e.target.value)} />
                            </div>
                            {
                                json.atualizacoes.length > 0 ?
                                    <>
                                        <table className="divTable">
                                            <tbody>
                                                <tr>
                                                    <th>Data</th>
                                                    <th>Hora</th>
                                                    <th>Detalhes</th>
                                                    <th>Excluir</th>
                                                </tr>
                                            </tbody>
                                            {
                                                json.atualizacoes.map(atualizacao =>
                                                    <>
                                                        <tr key={atualizacao.id}>
                                                            <td>
                                                                <Moment format="DD/MM/YYYY">
                                                                    {atualizacao.data}
                                                                </Moment>
                                                            </td>
                                                            <td>{atualizacao.hora.substr(0, 5)}</td>
                                                            <td>{atualizacao.atualizacao}</td>
                                                            <td>
                                                                <button className="botaoVermelho" onClick={(e) => {

                                                                    e.preventDefault(

                                                                    )
                                                                    MySwal.fire({
                                                                        title: <p>Atenção!</p>,
                                                                        showCancelButton: true,
                                                                        confirmButtonColor: '#86C232',
                                                                        cancelButtonColor: '#f70000',
                                                                        confirmButtonText: 'Sim',
                                                                        cancelButtonText: 'Cancelar',
                                                                        footer: 'Ciências da Computação - UNIP 2021',
                                                                        html: <p>Deseja mesmo excluir essa atualização?</p>,
                                                                        icon: 'warning'
                                                                    }).then((result) => {
                                                                        if (result.isConfirmed) {
                                                                            api.delete(`atualizacoes/deleta/${atualizacao.id}`).then((response) => {
                                                                                MySwal.fire({
                                                                                    title: <p>Sucesso!</p>,
                                                                                    confirmButtonColor: '#86C232',
                                                                                    footer: 'Ciências da Computação - UNIP 2021',
                                                                                    html: <p>Atualização excluída com sucesso.</p>,
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
                                                                                        html: <p>Houve um erro ao excluir a atualização, favor entrar em contato com o
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
                                                    </>
                                                )
                                            }
                                        </table>
                                    </>
                                    :
                                    <>
                                        <h3 className="subtitulo">Ainda não existem atualizações para essa denúncia.</h3><br />
                                    </>
                            }
                            <div className="divBotaoLeft">
                                <button className="botaoAzul">Salvar</button>
                            </div><br />
                            <div className="divBotaoLeft">
                                <Link to='/Gerenciamento/Denuncias'>
                                    <button className="botaoVerde">Voltar</button>
                                </Link>
                            </div><br />
                        </form>
                    </div>
                </div>
            </div >
            <Rodape />
        </div >
    )
}

export default EditarDenuncia
