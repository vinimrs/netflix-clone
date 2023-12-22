import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledHeader = styled.header<{ $active?: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 17px 32px;
	transition: all ease 0.2s;
	background-color: ${props => (props.$active ? 'var(--black)' : '#00000000')};
	z-index: 1000;

	@media (max-width: 768px) {
		padding: 8px 16px;
	}
`;

export const LogoNetflix = styled.img`
	width: 145px;
	height: 82px;
	z-index: 100;

	@media (max-width: 768px) {
		width: 92px;
		height: 52px;
	}
`;

export const PerfilNetflix = styled.img`
	width: 65px;
	height: 64px;
	border-radius: 8px;
	z-index: 100;
	cursor: pointer;

	@media (max-width: 768px) {
		width: 53px;
		height: 53px;
	}
`;

export const WrappedMenu = styled(motion.div)`
	perspective: 2000;
	position: absolute;
	top: 92px;
	right: 32px;
	opacity: 0;

	@media (max-width: 768px) {
		top: 65px;
		right: 24px;
	}
`;

export const ContainerMenu = styled(motion.div)`
	background-color: #000000d1;
	border-radius: 4px;
	width: 250px;
	transition: 0.5s;
	color: var(--white);
	padding: 12px;
	perspective: 2000;

	ul {
		list-style: none;
		li {
			display: flex;
			align-items: center;
			margin: 10px 0;
			cursor: pointer;

			span {
				font-family: var(--font-open-sans);
				font-size: 14px;
				margin-left: 8px;
			}

			img {
				width: 35px;
				border-radius: 4px;
			}

			> div {
				border-bottom: 1px solid #f5f5f5b1;
				height: 1px;
				width: 100%;
				margin: 8px 0;
			}

			&:hover {
				span {
					text-decoration: underline;
				}
			}
		}
	}
`;

// export const Menu = styled.ul`
//   list-style: none;
// `;

// export const MenuItem = styled.li`
//   display: flex;
//   align-items: center;
//   margin: 10px 0;
//   cursor: pointer;

//   &:hover {
//     span {
//       text-decoration: underline;
//     }
//   }
// `;

// export const MenuImage = styled.img`
//   width: 35px;
//   border-radius: 4px;
// `;

// export const MenuText = styled.span`
//   font-family: Open sans;
//   font-size: 14px;
//   margin-left: 8px;
// `;
