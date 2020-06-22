import { createContext, useContext } from 'react';

const initialContext = JSON.parse(localStorage.getItem("TJUser"));
// console.log(initialContext);

export const AuthContext = createContext(initialContext);

export function useAuth() {
    return useContext(AuthContext);
}
