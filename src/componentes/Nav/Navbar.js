import React, { useContext } from "react";
import styled from "styled-components";
import Burger from "./Burger";
import StoreContext from '../../componentes/Store/Context';

const Nav = styled.nav`
    width: 100%;
    //height: 55px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;

    background-color: #222629;

    .logo{
        padding: 15px 0;
        color: #86C232;
    }
`;

const Navbar = () => {

    const { token } = useContext(StoreContext);

    return (
        <Nav>
            <div>
                {
                    token ?
                        <div className="logo">
                            IBAMA (Administrador)
                        </div>
                        :
                        <div className="logo">
                            IBAMA
                        </div>
                }
            </div>
            <Burger />
        </Nav>
    )
}

export default Navbar;