import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useUserContext } from '../../context/useUserContext'
import {toast}  from 'react-toastify'


interface LoginProps {
    setCurrentPage: (page: string) => void
}

const Login: React.FC<LoginProps> = ({ setCurrentPage }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    

    const {updateUser} =useUserContext()

    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!validateEmail(email)){
            setError("please enter a valid email")
            return;
        }

        if(!password){
            setError("please enter password")
                return;
            
        }

        try {
            const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
                email, password
            })
            // console.log(response)
            const userData=response.data

            const {token}=response.data

            if(token){
                localStorage.setItem("token",token)
                updateUser(userData)
                navigate("/dashboard")
            }

            toast.success("login successful")
        } catch (error:any) {
            if(error.response && error.response.data.message){
                setError(error.response.data.message)
                toast.error(error)
            }
            else {
                setError("something went wrong")
                toast.error(error)
            }
        }
    }
    return (
        <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>

            <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
            <p className='text-sm text-slate-700 mt-[5px] mb-6'>Please enter your details to log in </p>
            <form onSubmit={handleLogin}>
                <Input
                value={email}
                onChange={({target}) => setEmail(target.value)}
                label="Email Address"
                placeholder="enter your email"
                type="text"
                />
                <Input
                value={password}
                onChange={({target}) => setPassword(target.value)}
                label="Password"
                placeholder="enter your password"
                type="password"
                />

                {error && <p className='text-red-500 text-xs pb-2.5 '>{error}</p>}

                <button type='submit' className='btn-primary'>Login</button>

                <p className='text-sm text-slate-800 mt-3 '>
                    Don't have an account? {" "}
                    <button className='font-medium text-primary underline cursor-pointer text-blue-400' onClick={()=>setCurrentPage("signup")}>Sign Up</button>
                </p> 
            </form>
        </div>
    )
}

export default Login