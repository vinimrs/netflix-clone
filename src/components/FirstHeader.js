import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/netflix-logo.svg";


export const Header = styled.header`
text-align: left;
position: absolute;
top: 0;
left: 0;
padding: 16px 0 0 32px;
`;

function FirstHeader() {
    return ( 
        <Header>
				<Logo />
			</Header>
     );
}

export default FirstHeader;