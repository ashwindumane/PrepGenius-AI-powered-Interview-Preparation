import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/useUserContext'
import { toast } from 'react-toastify'

const UserInfoCard = () => {
  const { user, clearUser } = useUserContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate('/')
    toast.success('User logged out')
  }

  return user ? (
    <div className="flex items-center gap-3">
      <img
        src={user.profileImgUrl}
        alt="avatar"
        className="w-9 h-9 rounded-full border-2 border-orange-400 object-cover"
      />
      <div>
        <p className="text-sm font-bold text-gray-800">{user.name || 'User'}</p>
        <button
          onClick={handleLogout}
          className="text-xs text-orange-600 font-semibold hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  ) : null
}

export default UserInfoCard