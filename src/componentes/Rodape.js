import React from 'react'
import styled from 'styled-components';

const RodapeStyled = styled.footer`

    background-color: #222629;

    height: 50px;

    .conteudoRodape{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .texto{
        margin-top: 15px;
        font-size: 18px;
        color: #6B6E70;
    }
`;

const Rodape = () => {
    return (
        <RodapeStyled>
            <div className="conteudoRodape">
                <span className="texto">
                    Ciências da Computação - UNIP 2021
                </span>
            </div>
        </RodapeStyled>
    )
}

export default Rodape;
