import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
    
    text-decoration: none;

    color: #86C232;
    
    &:focus, &:hover, &:visited, &:link, &:active { 
        text-decoration: none;
    }
`;

export default StyledLink;