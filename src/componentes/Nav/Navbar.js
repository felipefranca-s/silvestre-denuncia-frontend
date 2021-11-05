import React from "react";
import styled from "styled-components";
import Burger from "./Burger";

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
    return (
        <Nav>
            <div>
                <div className="logo">
                    IBAMA
                </div>
            </div>
            <Burger />
        </Nav>
    )
}

export default Navbar;