import React from "react";
import styled from "styled-components";
import StyledLink from "../StyledLink";

const Ul = styled.ul`

    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    font-size: 18px;

    li{
        padding: 18px 10px;
    }

    @media(max-width: 768px){
        flex-flow: column nowrap;
        background-color: #222629;
        position: fixed;
        transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
        top: 0;
        right: 0;
        height: 100vh;
        width: 300px;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;

    }
`;


const RightNav = ({ open }) => {
    return (
      <Ul open={open}>
        <StyledLink to="/">
            <li>Home</li>
        </StyledLink>
        <StyledLink to="/NovaDenuncia">
            <li>Nova denúncia</li>
        </StyledLink>
        <StyledLink to="/ConsultarDenuncia">
            <li>Consultar denúncia</li>
        </StyledLink>
        <StyledLink to="/UsuarioLogin">
            <li>Área restrita</li>
        </StyledLink>
      </Ul>
    )
}

export default RightNav;