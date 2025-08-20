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

interface Props { setCurrentPage: (p: string) => void }

const Signup: React.FC<Props> = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePic, setProfilePic] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { updateUser } = useUserContext()
  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName) return setError('Name required')
    if (!validateEmail(email)) return setError('Invalid email')
    if (!password) return setError('Password required')

    setLoading(true)
    setError('')
    toast.loading('Creating account…', { toastId: 'signup' })

    try {
      let profileImgUrl = ''
      if (profilePic) {
        const { imageUrl } = await uploadImage(profilePic)
        profileImgUrl = imageUrl || ''
      }

      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImgUrl
      })

      const { token } = data
      if (token) {
        localStorage.setItem('token', token)
        updateUser(data)
        toast.dismiss('signup')
        toast.success('Account created!')
        navigate('/dashboard', { replace: true })
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Signup failed'
      setError(msg)
      toast.update('signup', { render: msg, type: 'error', isLoading: false, autoClose: 3000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignUp} className="w-[90vw] md:w-[33vw] p-7 space-y-4">
      <h2 className="text-xl font-bold">Create an Account</h2>
      <p className="text-sm text-slate-600">Join us today—enter your details below.</p>

      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

      <Input
        label="Full Name"
        placeholder="Ada Lovelace"
        value={fullName}
        onChange={({ target }) => setFullName(target.value)}
        required
      />
      <Input
        label="Email"
        type="email"
        placeholder="ada@example.com"
        autoComplete="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        required
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? 'Creating…' : 'Create Account'}
      </button>

      <p className="text-sm text-center">
        Already have an account?{' '}
        <button
          type="button"
          className="text-orange-500 font-semibold underline"
          onClick={() => setCurrentPage('login')}
        >
          Login
        </button>
      </p>
    </form>
  )
}

export default Signup