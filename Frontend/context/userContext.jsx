import { createContext, useState, useEffect, useContext } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../src/constants";
import { jwtDecode } from "jwt-decode";
import api from "../src/api";

const UserContext = createContext(null);

export function UserContextProvider({children}) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser();
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("api/token/refresh/", {
                refresh: refreshToken,
            });

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
            }
        } catch (error) {
            console.log(error);
            setUser(null);
        }
    }

    const getUser = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                return null;
            }

            const decode = jwtDecode(token);
            const tokenExpiration = decode.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                await refreshToken();
            }

            const res = await api.get("api/user/");
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);