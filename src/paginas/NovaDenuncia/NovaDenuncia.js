import { React, useState } from 'react'
import Navbar from '../../componentes/Nav/Navbar';
import Rodape from '../../componentes/Rodape';
import SelecionadorData from '../../componentes/SelecionadorData'
import StyledButton from '../../componentes/StyledButton'
import InputHora from '../../componentes/InputHora';
import api from '../../servicos/api';
import './NovaDenuncia.css'
import ReactDatePicker from 'react-datepicker';

const NovaDenuncia = () => {

    const [anonimo, setAnonimo] = useState(false);

    function handleAnonimoClick() {
        setAnonimo(!anonimo);
    }

    const [dataInicio, setDataInicio] = useState(new Date());

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

    //const handleInputHora = ({ target: { value } }) => { {setHora(value)} {setJson(json.data = value)}}
    //const handleInputHora = ({ target: { value } }) => { {setHora(value)} {console.log(value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,''))}}
    //const handleInputHora = ({ target: { value } }) => { {setHora(value)} {setJson(json.data =- value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,''))}}

    function handle(e) {
        const novoJson = { ...json }
        novoJson[e.target.id] = e.target.value
        setJson(novoJson)

        json.data = dataInicio
        json.hora = hora + ':00'
        console.log(json)
    }

    function submit(e) {
        e.preventDefault();

        api.post('denuncias/novo', json)
            .then((response) => {
                alert('feito');
            });

    }

    return (
        <>
            <Navbar />
            <div className="main">
                <div className="containerForm">
                    <div className="formulario">
                        {/* <form onSubmit={(e) => submit(e)}> */}
                        <form>
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
                                <StyledButton text="Enviar"
                                    onClick={
                                        function () {
                                            json.hora = hora
                                            console.log(json)
                                        }
                                    } />
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