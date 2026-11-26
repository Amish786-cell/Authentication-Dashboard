import React, {createContext, useContext, useEffect, useState} from "react";
import API from "../api";
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
        setLoading(false);
        return;
        }

        API.get("/auth/me").then((response) => {
            setUser(response.data);
        })
        .catch(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        })
        .finally(() => setLoading(false));
    }, []);

    const login = async (email, password) => {
        const response = await API.post("/auth/login", {
            email, password
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user);
        return response.data;
    };

    const logout = () => {
        localStorage.removeitem("token");
        localStorage.removeitem("user");

    };

    return (
        <AuthContext.Provider value = {{user, loading, login, logout, refreshProfile}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
