import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useUserContext } from '../../context/useUserContext'
import uploadImage from '../../utils/uploadImage'
import { toast } from 'react-toastify'


interface SignupProps {
    setCurrentPage: (page: string) => void
}
const Signup: React.FC<SignupProps> = ({ setCurrentPage }) => {
    const { updateUser } = useUserContext()
    const [email, setEmail] = useState('')
    const [fullName, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [profilePic, setProfilePic] = useState<File | null>(null)

    const navigate = useNavigate()

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let profileImageUrl = ""

        if (!fullName) {
            setError("please enter full name")
            return;
        }
        if (!validateEmail(email)) {
            setError("please enter a valid email")
            return;
        }
        if (!password) {
            setError("please enter a password")
            return;
        }

        try {
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || ""

            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
                profileImgUrl: profileImageUrl
            })
            const { token } = response.data
            if (token) {
                localStorage.setItem("token", token)
                updateUser(response.data)
                navigate('/dashboard')
            }

            toast.success("account created")
        } catch (error: any) {
            if (error.response && error.response.data.message) {
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
            <h3 className='text-xl font-semibold text-black'>Create an Acount</h3>
            <p className='text-sm text-slate-700 mt-[5px] mb-6'>Join us today, enter your details below.</p>

            <form onSubmit={handleSignUp}>

                <ProfilePhotoSelector
                    image={profilePic}
                    setImage={setProfilePic}

                />
                <div className='flex flex-col'>
                    <Input
                        value={fullName}
                        onChange={({ target }) => setFullname(target.value)}
                        label='Full Name'
                        placeholder='enter your name'
                        type='text'
                    />
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label='Email'
                        placeholder='enter your email'
                        type='text'
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label='Password'
                        placeholder='enter your password'
                        type='password'
                    />

                </div>

                {error && <p className=''>{error}</p>}
                <button className='btn-primary' type='submit'>Create Account </button>

                <p className='text-sm text-slate-800 mt-3 '>Already an account? {" "}
                    <button className='font-medium text-primary underline cursor-pointer text-blue-400'
                        onClick={() => setCurrentPage("login")}
                    >Login</button>
                </p>
            </form>
        </div>
    )
}

export default Signup