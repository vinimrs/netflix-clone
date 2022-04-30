import React, { createContext, useContext, useState } from 'react';
import { IProfile } from '../../services/auth/authService';

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
    storeProfile?: (prof: IProfile) => void;
    filterToAnothersProfiles?: (
        profiles: IProfile[],
        prof: IProfile
    ) => IProfile[];
    convertImage?: (bin: ArrayBuffer) => string;
    toSlug?: (str: string) => string;
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

    const storeProfile = (prof: IProfile) => {
        prof;
        if (prof) {
            setProfile(prof);
            profile;
        } else {
            const profileResults = JSON.parse(
                localStorage.getItem('usuario') || ''
            );
            setProfile(profileResults);
        }
        localStorage.setItem('usuario', JSON.stringify(prof));
    };

    const filterToAnothersProfiles = (profiles: IProfile[], prof: IProfile) => {
        if (prof) {
            const result = profiles.filter(p => p.slug !== prof.slug);
            return result;
        }
    };

    const getStorageProfile = () => {
        return JSON.parse(localStorage.getItem('usuario'));
    };

    const changeProfile = prof => {
        localStorage.setItem('usuario', JSON.stringify(prof));
        setProfile(profile);
    };

    const convertImage = (bin: ArrayBuffer) => {
        const buff = Buffer.from(bin);
        return buff.toString('base64');
    };

    const toSlug = (str: string) => {
        const slugify = str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return slugify;
    };

    return {
        filterToAnothersProfiles,
        getStorageProfile,
        changeProfile,
        storeProfile,
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
        convertImage,
    };
};
