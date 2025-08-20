import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useUserContext } from '../../context/useUserContext'
import { toast } from 'react-toastify'

interface Props {
  setCurrentPage: (p: string) => void
}

const Login: React.FC<Props> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { updateUser } = useUserContext()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) return setError('Invalid email')
    if (!password) return setError('Password required')

    setError('')
    setIsLoading(true)
    const toastId = toast.loading('Logging in…')

    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password })
      localStorage.setItem('token', data.token)
      updateUser(data)

      toast.update(toastId, {
        render: 'Welcome back!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      })

      navigate('/dashboard', { replace: true })
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Login failed'
      toast.update(toastId, {
        render: msg,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="w-[90vw] md:w-[33vw] p-7 space-y-4">
      <h2 className="text-xl font-bold">Welcome Back</h2>
      <p className="text-sm text-slate-600">Enter your details to log in.</p>

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full flex items-center justify-center"
      >
        {isLoading ? 'Logging in…' : 'Login'}
      </button>

      <p className="text-sm text-center">
        Don’t have an account?{' '}
        <button
          type="button"
          className="text-orange-500 font-semibold underline"
          onClick={() => setCurrentPage('signup')}
        >
          Sign Up
        </button>
      </p>
    </form>
  )
}

export default Login
