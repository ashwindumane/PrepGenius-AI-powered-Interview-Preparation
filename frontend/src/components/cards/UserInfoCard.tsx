
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/useUserContext'
import { toast } from 'react-toastify'

const UserInfoCard = () => {
    const { user, clearUser } = useUserContext()
    const navigate = useNavigate()
    // console.log(user)
    const handleLogout = () => {
        localStorage.clear()
        clearUser()
        navigate('/')
        toast.success("user logged out")
    }
    return user && (
        <div className='flex items-center'>
            <img src={user?.profileImgUrl} alt="" className='w-11 h-11 bg-gray-300 rounded-full mr-3' />

            <div>
                <div className='text-[15px] text-white font-bold leading-3'>
                    {user?.name || "tester"}
                </div>

                <button className='text-amber-600 text-sm font-semibold cursor-pointer hover:underline' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default UserInfoCard