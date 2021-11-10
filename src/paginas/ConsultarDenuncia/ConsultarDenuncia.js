import { React, useState } from 'react'
import Navbar from '../../componentes/Nav/Navbar'
import Rodape from '../../componentes/Rodape'
import api from '../../servicos/api'
import './ConsultarDenuncia.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Moment from 'react-moment'

const ConsultarDenuncia = () => {

    const MySwal = withReactContent(Swal)

    const [codigo, setCodigo] = useState()

    const [exibirDivConsulta, setExibirDivConsulta] = useState(true)

    const [exibirImagem, setExibirImagem] = useState(false)

    const [resultado, setResultado] = useState({
        nome: "Anônimo",
        email: "Anônimo",
        local: "",
        data: "",
        hora: "",
        descricao: "",
        status: "",
        codigo: "",
        atualizacoes: []
    })

    const [imagem, setImagem] = useState()

    function recarregarPagina() {
        window.location.reload(false);
    }

    function submit(e) {
        e.preventDefault();

        api.get('denuncias/obterPorCodigo/' + codigo).then((response) => {
            if (response.data.id !== undefined) {
                setExibirDivConsulta(false)

                setResultado({
                    nome: response.data.nome,
                    email: response.data.email,
                    local: response.data.local,
                    data: response.data.data,
                    hora: response.data.hora.substr(0, 5),
                    descricao: response.data.descricao,
                    status: response.data.status_denuncia.status,
                    codigo: response.data.codigo,
                    atualizacoes: response.data.atualizacoes,
                    evidencias: response.data.evidencias
                })

                api.get(`/imagens/obterPorDenunciaId/${response.data.id}`, { responseType: 'blob' })
                    .then((response1) => {
                        setImagem(response1.data)
                        setExibirImagem(true)
                    })

            }
            else {
                MySwal.fire({
                    title: <p>Código não encontrado</p>,
                    confirmButtonColor: '#86C232',
                    footer: 'Ciências da Computação - UNIP 2021',
                    html: <p>Tente novamente.</p>,
                    icon: 'error'
                })
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="containerConsulta">
                    {
                        exibirDivConsulta ?
                            <div className="divConsulta">
                                <h1 className="titulo">Consultar denúncia</h1><br />
                                <h3 className="subtitulo">Código da denúncia</h3><br />
                                <form onSubmit={(e) => submit(e)}>
                                    <div className="campo">
                                        <input type="codigo" name="codigo" id="codigo"
                                            onInput={(e) => setCodigo(e.target.value)} />
                                    </div>
                                    <div className="divBotaoLeft">
                                        <button className="botaoVerde">Enviar</button>
                                    </div>
                                </form>
                            </div>
                            :
                            <div className="containerConteudo">
                                <div className="divConteudo">
                                    <h1 className="titulo">Informações da denúncia</h1><br />
                                    <table className="divTable">
                                        <tbody>
                                            <tr>
                                                <th>Nome do autor</th>
                                                <td>{resultado.nome === "" ? <p>Anônimo</p> : resultado.nome}</td>
                                            </tr>
                                            <tr>
                                                <th>E-mail do autor</th>
                                                <td>{resultado.email === "" ? <p>Anônimo</p> : resultado.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Local</th>
                                                <td>{resultado.local}</td>
                                            </tr>
                                            <tr>
                                                <th>Data</th>
                                                <td>
                                                    <Moment format="DD/MM/YYYY">
                                                        {resultado.data}
                                                    </Moment>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Hora</th>
                                                <td>{resultado.hora}</td>
                                            </tr>
                                            <tr>
                                                <th>Descrição</th>
                                                <td>{resultado.descricao}</td>
                                            </tr>
                                            <tr>
                                                <th>Código</th>
                                                <td>{resultado.codigo}</td>
                                            </tr>
                                            <tr>
                                                <th>Status</th>
                                                <td>{resultado.status}</td>
                                            </tr>
                                        </tbody>
                                    </table>

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

                                    {
                                        <>
                                            {
                                                resultado.atualizacoes.length > 0 ?
                                                    <>
                                                        <h1 className="titulo">Atualizações da denúncia</h1><br />
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <th>Data</th>
                                                                    <th>Hora</th>
                                                                    <th>Detalhes</th>

                                                                </tr>
                                                            </tbody>
                                                            {
                                                                resultado.atualizacoes.map(atualizacao =>
                                                                    <>
                                                                        <tr>
                                                                            <td>
                                                                                <Moment format="DD/MM/YYYY">
                                                                                    {atualizacao.data}
                                                                                </Moment>
                                                                            </td>
                                                                            <td>{atualizacao.hora.substr(0, 5)}</td>
                                                                            <td>{atualizacao.atualizacao}</td>
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

                                        </>
                                    }
                                    <div className="divBotaoCenter">
                                        <button className="botaoVerde" onClick={recarregarPagina}>Voltar </button>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <Rodape />
        </div >
    )
}

export default ConsultarDenuncia
