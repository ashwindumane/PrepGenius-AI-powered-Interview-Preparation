import { Link } from 'react-router-dom'
import UserInfoCard from '../cards/UserInfoCard'

const Navbar = () => {
  return (
    <div className='h-16 bg-[#161414] backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30 '>
        <div className='container mx-auto flex items-center justify-between gap-5'>
            <Link to='/dashboard'>
             <p className='text-xl text-amber-100 tracking-wide font-bold'>
                            Interview Prep <span className='text-amber-400'>AI</span>
                        </p>
            </Link>


            <UserInfoCard/>
        </div>
    </div>
  )
}

export default Navbar