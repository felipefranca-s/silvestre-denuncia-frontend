import React, { useContext } from "react";
import styled from "styled-components";
import StyledLink from "../StyledLink";
import StoreContext from "../Store/Context";

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

    const { token, setToken } = useContext(StoreContext);

    function deslogar(e){
        e.preventDefault()
        
        const token = null

        setToken(token)
    }

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
            {
                token ?
                    <>
                        <StyledLink to="/Gerenciamento">
                            <li>Gerenciamento</li>
                        </StyledLink>
                        <StyledLink to="#" onClick={deslogar}>
                            <li>Sair</li>
                        </StyledLink>
                    </>
                    :
                    <StyledLink to="/UsuarioLogin">
                        <li>Área restrita</li>
                    </StyledLink>
            }
        </Ul>
    )
}

export default RightNav;