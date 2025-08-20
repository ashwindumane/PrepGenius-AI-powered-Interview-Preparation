import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

interface User {
    id: string,
    name: string,
    email: string,
    token: string,
    profileImgUrl: string
}

interface UserContextType {
    user: User | null,
    loading: boolean,
    updateUser: (userData: User) => void;
    clearUser: () => void;
}

interface UserProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
        const accessToken = localStorage.getItem("token")
        
        if (!accessToken) {
            setLoading(false)
            return
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get((API_PATHS.AUTH.GET_PROFILE))
                setUser(response.data);
            } catch (error) {
                console.log("user not authenticated", error)
                clearUser()
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    const updateUser = (userData: User) => {
        setUser(userData)
        localStorage.setItem("token", userData.token)
        setLoading(false)
    }
    const clearUser = () => {
        setUser(null)
        localStorage.removeItem("token")
    }
    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

