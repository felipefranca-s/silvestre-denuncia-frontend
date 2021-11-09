import { React, useState } from 'react'
import Navbar from '../../componentes/Nav/Navbar';
import Rodape from '../../componentes/Rodape';
import InputHora from '../../componentes/InputHora';
import api from '../../servicos/api';
import './NovaDenuncia.css'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const NovaDenuncia = () => {

    const [anonimo, setAnonimo] = useState(false);

    function handleAnonimoClick() {
        setAnonimo(!anonimo);
    }

    const [dataInicio, setDataInicio] = useState(new Date());

    const[image, setImage] = useState()

    const converterBase64 = (arquivo) => {

        return new Promise((resolve, reject) => {

            const fileReader = new FileReader()
            fileReader.readAsDataURL(arquivo)

            fileReader.onload =() => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const uploadImage = async e => {
        
        e.preventDefault()

        console.log("Upload image")
        console.log(image)

        const base64 = await converterBase64(image)
        console.log(base64)

        const strImage = base64.replace(/^data:image\/[a-z]+;base64,/, "");

        console.log(strImage)

        api.post('/evidencias/novo', {
            denuncia: {id: 88},
            nome_arquivo: "testeee",
            arquivo: strImage
        })
    }

    const [json, setJson] = useState({
        nome: "",
        email: "",
        data: "",
        hora: "0000",
        local: "",
        descricao: "",
        status_denuncia: { id: 1 }
    })

    const [hora, setHora] = useState('');
    const handleInputHora = ({ target: { value } }) => setHora(value)

    function handle(e) {
        const novoJson = { ...json }
        novoJson[e.target.id] = e.target.value
        setJson(novoJson)
    }

    const MySwal = withReactContent(Swal)

    function submit(e) {
        e.preventDefault();

        json.data = dataInicio
        json.hora = hora + ':00'

        api.post('denuncias/novo', json).then((response) => {

            api.get('denuncias/' + response.data.id).then((response2) => {
                
                MySwal.fire({
                    title: <p>Denúncia efetuada!</p>,
                    footer: 'Ciências da Computação - UNIP 2021',
                    confirmButtonColor: '#86C232',
                    html: <><p>Guarde o código da denúncia para consultá-la posteriormente:</p>
                    <br /><b>{response2.data.codigo}</b></>,
                    icon: 'success'
                  })
            });
        });
    }

    return (
        <>
            <Navbar />
            <div className="main">
                <div className="containerForm">
                    <div className="formulario">
                        <form onSubmit={(e) => submit(e)}>
                            <h1 className="titulo">Nova denúncia</h1><br />
                            <h3 className="subtitulo">Informações para contato</h3><br />
                            <div className="campo">
                                <input type="checkbox" name="anonimo" id="anonimo"
                                    onClick={handleAnonimoClick} />
                                <b><label htmlFor="anonimo"> Anônimo</label></b>
                            </div>
                            <div className="campo">
                                <label htmlFor="nome">Nome completo</label>
                                <input type="text" name="nome" id="nome" disabled={anonimo}
                                    onChange={(e) => handle(e)} value={json.nome} />
                            </div>
                            <div className="campo">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" id="email" disabled={anonimo}
                                    onChange={(e) => handle(e)} value={json.email} />
                            </div>
                            <h3 className="subtitulo">Informações da ocorrência</h3><br />
                            <div className="campo">
                                <label htmlFor="selecionador-data">Data *</label>
                                <ReactDatePicker
                                    id="selecionador-data"
                                    selected={dataInicio}
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={new Date()}
                                    onChange={(data) => setDataInicio(data)}
                                />
                            </div>
                            <div className="campo">
                                <label htmlFor="hora">Hora *</label>
                                <InputHora name="hora" id="hora" value={hora} onChange={handleInputHora} /><br />
                            </div>
                            <div className="campo">
                                <label htmlFor="email">Local *</label>
                                <input type="text" name="local" id="local" required
                                    onChange={(e) => handle(e)} value={json.local} />
                            </div>
                            <div className="campo">
                                <label htmlFor="descricao">Descrição *</label><br />
                                <textarea type="text" name="descricao" id="descricao" required
                                    onChange={(e) => handle(e)} value={json.descricao} />
                            </div>
                            
                            <div className="divBotao">
                                <button className="botaoVerde">Enviar</button>
                            </div>
                        </form>
                        <form onSubmit={uploadImage}>
                        <div className="campo">
                                <label htmlFor="imagem">Evidência (imagem)</label><br /><br />
                                <input type="file" name="imagem" onChange={e => setImage(e.target.files[0]) }/>
                            </div>
                            <div className="divBotao">
                                <button className="botaoVerde">Enviar</button><br/>
                                <br/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Rodape />
        </>
    )
}

export default NovaDenuncia;