import ReactInputMask from "react-input-mask";

const InputHora = (props) => {
    let mask = "12:34"
    let formatChars = {
        '1': '[0-2]',
        '2': '[0-9]',
        '3': '[0-5]',
        '4': '[0-9]'
    }

    let beforeMaskedValueChange = (newState, oldSatate, userInput) => {
        let { value } = newState;

        if(value.startsWith('2'))
            formatChars['2'] = '[0-3]';

        else
            formatChars['2'] = '[0-9]'

        return {value, selection: newState.selection}
    }

    return(
        <ReactInputMask
        mask={mask}
        value={props.value}
        onChange={props.onChange}
        formatChars={formatChars}
        beforeMaskedValueChange={beforeMaskedValueChange}>
        </ReactInputMask>
    )
}

export default InputHora