import { StaticImageData } from 'next/image';
import React, {
    createContext,
    SetStateAction,
    useContext,
    useState,
} from 'react';

// import avatar1 from '/avatar-1.png';
// import avatar2 from '/avatar-2.png';
// import avatar3 from '/avatar-3.png';
// import avatar4 from '/avatar-4.png';
// import avatar5 from '/avatar-5.png';

interface IProfile {
    slug: string;
    name: string;
    image_id: string;
    preference: string;
}

interface IUsuarioContext {
    password?: string;
    setPassword?: (value: string) => void; // React.Dispatch<React.SetStateAction<string>>
    email?: string;
    setEmail?: (value: string) => void; // React.Dispatch<React.SetStateAction<string>>
    checked?: boolean;
    setChecked?: (value: boolean) => void; // React.Dispatch<React.SetStateAction<string>>
    profile?: IProfile;
    setProfile?: (value: IProfile) => void;
    profiles?: IProfile[];
    name?: string;
    setName?: (value: string) => void;
    confirmPassword?: string;
    setConfirmPassword?: (value: string) => void;
}

export const UsuarioContext = createContext<IUsuarioContext | null>(null);
UsuarioContext.displayName = 'Usuário';

interface UsuarioProviderProps {
    children?: JSX.Element;
}

export const UsuarioProvider: React.FC<UsuarioProviderProps> = ({
    children,
}) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [checked, setChecked] = useState(true);
    const [profile, setProfile] = useState<IProfile>(null);

    // const profiles = [
    //     {
    //         slug: 'quem-paga',
    //         name: 'Quem paga',
    //         image: avatar1,
    //         preference: '12',
    //     },
    //     {
    //         slug: 'parasita1',
    //         name: 'Parasita 1',
    //         image: avatar2,
    //         preference: '10752',
    //     },
    //     {
    //         slug: 'parasita2',
    //         name: 'Parasita 2',
    //         image: avatar3,
    //         preference: '35',
    //     },
    //     {
    //         slug: 'parasita3',
    //         name: 'Parasita 3',
    //         image: avatar4,
    //         preference: '99',
    //     },
    //     {
    //         slug: 'quem-nunca-usa',
    //         name: 'Quem nunca usa',
    //         image: avatar5,
    //         preference: '10752',
    //     },
    // ];

    return (
        <UsuarioContext.Provider
            value={{
                profile,
                setProfile,
                name,
                setName,
                password,
                setPassword,
                checked,
                setChecked,
                email,
                setEmail,
                // profiles,
                confirmPassword,
                setConfirmPassword,
            }}
        >
            {children}
        </UsuarioContext.Provider>
    );
};

export const useUsuario = () => {
    const {
        setProfile,
        profile,
        password,
        setPassword,
        checked,
        setChecked,
        email,
        setEmail,
        name,
        setName,
    } = useContext(UsuarioContext);

    const storeProfile = prof => {
        if (prof) {
            setProfile(prof);
        } else {
            const profileResults = JSON.parse(
                localStorage.getItem('usuario') || ''
            );
            setProfile(profileResults);
        }
        localStorage.setItem('usuario', JSON.stringify(prof));
    };

    // const filterToAnothersProfiles = profile => {
    //     const result = profiles.filter(prof => prof.slug !== profile.slug);
    //     return result;
    // };

    const getStorageProfile = () => {
        return JSON.parse(localStorage.getItem('usuario'));
    };

    const changeProfile = prof => {
        // const profile = profiles.find(prof => prof.slug === slug);
        localStorage.setItem('usuario', JSON.stringify(prof));
        setProfile(profile);
    };

    const toSlug = (str: string) => {
        const slugify = str =>
            str
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        return slugify;
    };

    return {
        // setProfileBySlug,
        // filterToAnothersProfiles,
        getStorageProfile,
        // profiles,
        changeProfile,
        setProfile,
        profile,
        password,
        setPassword,
        checked,
        setChecked,
        email,
        setEmail,
        name,
        setName,
        toSlug,
    };
};
