import { React, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SelecionadorData = () => {
    const [dataInicio, setDataInicio] = useState(new Date());

    return(
        <DatePicker 
        selected={dataInicio}
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
        onChange={(data) => setDataInicio(data)}
        />
    )
}

export default SelecionadorData;