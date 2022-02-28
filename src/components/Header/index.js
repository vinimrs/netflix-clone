import React, { useEffect  } from "react";
import logo from "../../assets/netflix-logo.svg";
import { useUsuario } from "../../common/context/Usuario";
import * as S from "./style";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { gsap, Power3 } from "gsap/all";
import {useNavigate} from 'react-router-dom';

function Header({ scroll }) {
	const { profile, setProfile, changeProfile, getStorageProfile , filterToAnothersProfiles } = useUsuario();
	const list = filterToAnothersProfiles(profile);
    const navigate = useNavigate();

	const handleOpenDropdown = () => {
		gsap.to("._containerMenu", {
			duration: 0.1,
			ease: Power3.easeInOut,
			autoAlpha: 1,
		});
	};

	const handleCloseDropdown = () => {
		gsap.to("._containerMenu", {
			duration: 0.1,
			ease: Power3.easeInOut,
			autoAlpha: 0,
		});
	};

    useEffect(() => {
        if(!profile.slug) setProfile(getStorageProfile());
    })

    return (
		<S.StyledHeader $active={scroll}>
			<S.LogoNetflix onClick={() => navigate('/browse')} src={logo} alt="Logo da Netflix" />
			<S.PerfilNetflix
                onClick={() => navigate('/browse')}
				src={profile.image}
				onMouseEnter={handleOpenDropdown}
				alt="Perfil do usuário"
			/>

			<S.ContainerMenu className="_containerMenu">
				<S.Menu onMouseLeave={handleCloseDropdown}>
					{list.map((item) => {
						return (
							<S.MenuItem
								onClick={() => {
                                    console.log('click')
                                    handleCloseDropdown();
                                    changeProfile(item.slug);
                                }}
								key={item.slug}
							>
								<S.MenuImage
                                
									src={item.image}
									alt="Imagem de perfil"
								/>
								<S.MenuText>{item.name}</S.MenuText>
							</S.MenuItem>
						);
					})}
					<S.MenuItem onClick={() => {
                        handleCloseDropdown();
                        navigate('/select-profile');
                    }}>
						<EditOutlinedIcon />
						<S.MenuText>Gerenciar Perfis</S.MenuText>
					</S.MenuItem>
					<S.MenuItem onClick={handleCloseDropdown}>
						<div
							style={{
								borderBottom: "1px solid #f5f5f5b1",
								heigth: "1px",
								width: "100%",
								margin: "8px 0",
							}}
						></div>
					</S.MenuItem>
					<S.MenuItem onClick={handleCloseDropdown}>
						<S.MenuText>Infantis</S.MenuText>
					</S.MenuItem>
					<S.MenuItem onClick={handleCloseDropdown}>
						<div
							style={{
								borderBottom: "1px solid #f5f5f5b1",
								heigth: "1px",
								width: "100%",
								margin: "8px 0",
							}}
						></div>
					</S.MenuItem>
					<S.MenuItem onClick={handleCloseDropdown}>
						<PersonOutlineOutlinedIcon />
						<S.MenuText>Conta</S.MenuText>
					</S.MenuItem>
					<S.MenuItem onClick={handleCloseDropdown}>
						<HelpOutlineOutlinedIcon />
						<S.MenuText>Centro de Ajuda</S.MenuText>
					</S.MenuItem>
					<S.MenuItem>
						<div
							style={{
								borderBottom: "1px solid #f5f5f5b1",
								heigth: "1px",
								width: "100%",
								margin: "8px 0",
							}}
						></div>
					</S.MenuItem>
					<S.MenuItem onClick={handleCloseDropdown}>
						<S.MenuText>Sair da Netflix</S.MenuText>
					</S.MenuItem>
				</S.Menu>
			</S.ContainerMenu>
		</S.StyledHeader>
	);
}

export default Header;
