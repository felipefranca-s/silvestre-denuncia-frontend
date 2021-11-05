import React from 'react'
import styled from 'styled-components';

const Botao = styled.button`
        
        font-size: 1.2em;
        background: #86C232;
        border: 0;
        color: #ffffff;
        padding: 0.5em 0.8em;
        box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
        text-shadow: 1px 1px 1px rgb(0,0,0,0.5);
        cursor: pointer;

    :hover{
        background: #61892F;
        box-shadow: inset 2px 2px 2px rgba(0,0,0,0.2);
        text-shadow: none;
    }
`;

const StyledButton = (props) => {
    return (
        <Botao>
            {props.text}
        </Botao>
    )
}

export default StyledButton
