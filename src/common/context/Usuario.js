import { createContext, useContext, useState } from "react";

import avatar1 from "../../assets/avatar-1.png";
import avatar2 from "../../assets/avatar-2.png";
import avatar3 from "../../assets/avatar-3.png";
import avatar4 from "../../assets/avatar-4.png";
import avatar5 from "../../assets/avatar-5.png";

export const UsuarioContext = createContext();
UsuarioContext.displayName = "Usuário";

export const UsuarioProvider = ({ children }) => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [checked, setChecked] = useState(true);
	const [profile, setProfile] = useState({});

	const profiles = [
		{
			slug: "quem-paga",
			name: "Quem paga",
			image: avatar1,
            preference: '12'
		},
		{
			slug: "parasita1",
			name: "Parasita 1",
			image: avatar2,
            preference: '10752'
		},
		{
			slug: "parasita2",
			name: "Parasita 2",
			image: avatar3,
            preference: '35'
		},
		{
			slug: "parasita3",
			name: "Parasita 3",
			image: avatar4,
            preference: '99'
		},
		{
			slug: "quem-nunca-usa",
			name: "Quem nunca usa",
			image: avatar5,
            preference: '10752'
		},
	];

	return (
		<UsuarioContext.Provider
			value={{
				profile,
				setProfile,
				password,
				setPassword,
				checked,
				setChecked,
				email,
				setEmail,
                profiles
			}}
		>
			{children}
		</UsuarioContext.Provider>
	);
};

export const useUsuario = () => {
	const {
		profiles,
		setProfile,
		profile,
		password,
		setPassword,
		checked,
		setChecked,
		email,
		setEmail,
	} = useContext(UsuarioContext);
    
	const setProfileBySlug = (slug) => {
		const profile = profiles.find((profile) => profile.slug === slug);
        if (profile) {
            setProfile(profile);
		} else {
            const profileResults = JSON.parse(localStorage.getItem('usuario'));
            setProfile(profileResults);
        }
        localStorage.setItem('usuario', JSON.stringify(profile), );
	};

	const filterToAnothersProfiles = (profile) => {
		const result = profiles.filter((prof) => prof.slug !== profile.slug);
		return result;
	};

    const getStorageProfile = () => {
        return JSON.parse(localStorage.getItem('usuario'));
    };

    const changeProfile = (slug) => {
        const profile = profiles.find(prof => prof.slug === slug);
        localStorage.setItem('usuario', JSON.stringify(profile));
        setProfile(profile);
    };

	return {
		setProfileBySlug,
		filterToAnothersProfiles,
        getStorageProfile,
		profiles,
        changeProfile,
		setProfile,
		profile,
		password,
		setPassword,
		checked,
		setChecked,
		email,
		setEmail,
	};
};
