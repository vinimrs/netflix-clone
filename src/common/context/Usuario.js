import { createContext, useState } from "react";

export const UsuarioContext = createContext();
UsuarioContext.displayName = "Usuário";

export const UsuarioProvider = ({ children }) => {
    const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [checked, setChecked] = useState(true);

    return(
        <UsuarioContext.Provider value={{
            password, setPassword, checked, setChecked, email, setEmail
        }}>
            {children}
        </UsuarioContext.Provider>
    );
}