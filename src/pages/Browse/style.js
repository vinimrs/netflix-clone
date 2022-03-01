import styled from "styled-components";
import { Alert } from "@mui/material";

export const StyledAlert = styled(Alert)` 
    position: fixed;
    bottom: 40px;
    left: 32px;
    z-index: 99999;
    font-size: 18px;
    
    @media (max-width: 768px) {
        font-size: 14px;
    }

`;

export const MainWrapper = styled.main`
    overflow-x: hidden;
    margin-top: -150px;

    @media (max-width: 768px) {
        margin-top: -80px;
    }
`;